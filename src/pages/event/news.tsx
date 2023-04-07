import useAuth from '@/components/auth/use-auth'
import client from '@/data/client'
import profile from '@/images/profile/profile.png'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { News, NextPageWithLayout } from '@/types'
import CutText from '@/utils/CutText'
import { useQuery } from '@tanstack/react-query'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const NewsPage: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ newsInit }) => {

    const { t } = useTranslation('common')

    const { isAuthorized } = useAuth()

    const { data } = useQuery({
        queryKey: ['news'],
        queryFn: () => client.news.event(),
        initialData: newsInit,
    })
    const news = data?.result.data

    const [searchTerm, setSearchTerm] = useState(newsInit.result.data);

    const handleOnSearch = (string: any, results: any) => {
        if (string === '') {
            setSearchTerm(newsInit.result.data)
        } else {
            setSearchTerm(results)
        }
    };

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setIsShow(true)
        setSearchTerm(newsInit.result.data)
    }, [isShow])


    return (
        <>
            <Seo title="vCoincheck - News"
                description={news[0]?.summary}
                url={news[0]?.url}
                image_url={news[0]?.image} />

            <PageTitle activeMenu={t('news')} motherMenu={t('event')} path={"event/news"} pageHeading={''} activeDisplay={''} />

            <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
                <div className="input-group search-area d-inline-flex">
                    <div style={{ width: '600px', marginBottom: 20 }}>
                        <ReactSearchAutocomplete
                            items={news!}
                            onSearch={handleOnSearch}
                            styling={{ zIndex: 15 }} // To display it on top of the search box below
                            autoFocus
                            fuseOptions={{ keys: ["title"] }}
                            resultStringKeyName="title"
                        />
                    </div>
                </div>
                {isAuthorized && isShow &&
                    <Link href="/event/news/addnews" className="btn btn-primary ml-auto">
                        {t('postnews')}
                    </Link>
                }
            </div>

            <Row>
                {searchTerm.map((news: News) => (
                    <Col xl='4' key={news.id}>
                        <Link href={`/event/news/details/${news.name}`} className='float-right'>
                            <Card className='mb-3' style={{ maxWidth: "543px" }}>
                                <Image className="card-img-top img-block" src={news.image} alt={news.name} width={543} height={250} />
                                <Card.Header>
                                    <Card.Title className="fs-14 text-black" style={{ minHeight: "120px" }}>
                                        <h4>{news.title}</h4>
                                        <div className="media mt-4">
                                            <Image src={profile} alt="" className="mr-3 rounded" width={25} height={25} />
                                            <div className="media-body">
                                                <h5> {news.username} </h5>
                                                <span className="mb-0 text-blue font-italic">{news.createdt}</span>
                                            </div>
                                        </div>
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body style={{ minHeight: "150px" }}>
                                    <Card.Text className="text-content subtitle">
                                        {news.summary && <CutText content={news.summary} start={0} end={150} />}
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
NewsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const newsInit = await client.news.event()
        return {
            props: {
                newsInit,
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
export default NewsPage