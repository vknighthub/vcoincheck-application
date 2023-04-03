import routes from '@/config/routes'
import { useFetchListCatalystKnowledge } from '@/data/catalystknowledge'
import client from '@/data/client'
import profile from '@/images/profile/profile.png'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { Library, NextPageWithLayout } from '@/types'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { ReactSearchAutocomplete } from "react-search-autocomplete"
import CutText from '../utils/CutText'


const CatalystKnowledge: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ catalystknowledgeInit }) => {

    const { t } = useTranslation('common');
    const { locale } = useRouter()

    const { catalystknowledge, refetch } = useFetchListCatalystKnowledge({ language: locale });

    const [searchTerm, setSearchTerm] = useState(catalystknowledgeInit);

    const handleOnSearch = (string: any, results: any) => {

        if (string === '') {
            setSearchTerm(catalystknowledgeInit)
        }else {
            setSearchTerm(results)
        }
    };

    useEffect(() => {
        refetch()
        setSearchTerm(catalystknowledgeInit)
    }, [locale])


    return (
        <>
            <Seo title="vCoincheck"
                description={catalystknowledgeInit[0].summary}
                url={routes.catalystknowledge}
                image_url={catalystknowledgeInit[0].image} />

            <PageTitle activeMenu={t('catalystknowledge')} motherMenu={t('library')} path={"library"} pageHeading={''} activeDisplay={''} />
            <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
                <div className="input-group  d-inline-flex">
                    <div style={{ width: '600px', marginBottom: 20 }}>
                        <ReactSearchAutocomplete
                            items={catalystknowledge!}
                            onSearch={handleOnSearch}
                            styling={{ zIndex: 15 }} // To display it on top of the search box below
                            autoFocus
                            fuseOptions={{ keys: ["title"] }}
                            resultStringKeyName="title"
                        />
                    </div>
                </div>
            </div>

            <Row>
                {searchTerm?.map((knowledge: Library) => (
                    <Col xl='4' key={knowledge.id}>
                        <Link href={`/catalyst-knowledge/${knowledge.id}`} className='float-right'>
                            <Card className='mb-3'>
                                <Image className="card-img-top img-block" src={(knowledge.image)} alt="Cardano Knowledge" width={472.66} height={250} />
                                <Card.Header>
                                    <Card.Title className="fs-14 text-black" style={{ minHeight: "120px" }}>
                                        <h4>{knowledge.title}</h4>
                                        <div className="media mt-4">
                                            <Image src={profile} alt="" className="mr-3 rounded" width={25} height={25} />
                                            <div className="media-body">
                                                <h5> {knowledge.username} </h5>
                                                <span className="mb-0 text-blue font-italic">{knowledge.createdt}</span>
                                            </div>
                                        </div>
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body style={{ minHeight: "100px" }}>
                                    <Card.Text className="text-content subtitle">
                                        <CutText content={knowledge.summary} start={0} end={100} />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                ))}
            </Row>
        </>
    )
}

CatalystKnowledge.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const catalystknowledge = await client.library.catalystknowledge(
        {
            catname: "Catalyst Knowledge"
        },
        {
            language: locale
        }
    )
    const catalystknowledgeInit = catalystknowledge.result.data
    try {
        return {
            props: {
                catalystknowledgeInit,
                ...(await serverSideTranslations(locale!, ['common'])),
            },
            revalidate: 60, // In seconds
        };
    } catch (error) {
        console.log(error)
        //* if we get here, the product doesn't exist or something else went wrong
        return {
            notFound: true,
        };
    }
};

export default CatalystKnowledge