import routes from '@/config/routes'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { Library, NextPageWithLayout } from '@/types'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from "react-search-autocomplete"
import { useFetchListCardanoKnowledge } from '../data/cardanoknowledge';
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import profile from '@/images/profile/profile.png';
import CutText from './../utils/CutText';
import client from '@/data/client'


const CardanoKnowledge: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ cardanoknowledgeInit }) => {

    const { t } = useTranslation('common');
    const { locale } = useRouter()

    const { cardanoknowledge, refetch } = useFetchListCardanoKnowledge({ language: locale });

    const [searchTerm, setSearchTerm] = useState(cardanoknowledgeInit);

    const handleOnSearch = (string: any, results: any) => {
        console.log(results)
        if (string === '') {
            setSearchTerm(cardanoknowledgeInit)
        }else {
            setSearchTerm(results)
        }
    };

    useEffect(() => {
        refetch()
        setSearchTerm(cardanoknowledgeInit)
    }, [locale])


    return (
        <>
            <Seo title="vCoincheck"
                description={cardanoknowledgeInit[0].summary}
                url={routes.cardanoknowledge}
                image_url={cardanoknowledgeInit[0].image} />

            <PageTitle activeMenu={t('cardanoknowledge')} motherMenu={t('library')} path={"library"} pageHeading={''} activeDisplay={''} />
            <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
                <div className="input-group  d-inline-flex">
                    <div style={{ width: '600px', marginBottom: 20 }}>
                        <ReactSearchAutocomplete
                            items={cardanoknowledge!}
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
                        <Link href={`/cardano-knowledge/${knowledge.id}`} className='float-right'>
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

CardanoKnowledge.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const cardanoknowledge = await client.library.cardanoknowledge(
        {
            catname: "Cardano Knowledge"
        },
        {
            language: locale
        }
    )
    const cardanoknowledgeInit = cardanoknowledge.result.data
    try {
        return {
            props: {
                cardanoknowledgeInit,
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

export default CardanoKnowledge