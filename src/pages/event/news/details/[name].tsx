import client from '@/data/client'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import { NextPageWithLayout } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import invariant from 'tiny-invariant'
import parse from 'html-react-parser';

const NewsDetailPage: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ eventDetailInit, name }) => {

    const { data } = useQuery({
        queryKey: ['news-detail'],
        queryFn: () => client.news.geteventbyname({ name: name }),
        initialData: eventDetailInit,
    })

    const newsdetail = data?.result.data

    return (
        <>
            <Seo title="vCoincheck - News Detail"
                description={newsdetail.summary}
                url={newsdetail.url}
                image_url={newsdetail.image} />
            <div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="post-details">

                                    <h1 className="mb-2 text-black text-center pb-2">
                                        {newsdetail.title}
                                    </h1>

                                    <ul className="mb-4 post-meta d-flex flex-wrap justify-content-center">
                                        <li className="post-date mr-3">
                                            <i className="fa fa-calender" />
                                            Published date: {newsdetail.createdt}
                                        </li>
                                    </ul>

                                    <Image src={newsdetail.image} alt="" className="img-fluid mb-3 w-100" width={1629} height={826}/>
                                    <p className="text-blue fs-18 my-3">
                                        {newsdetail.summary}
                                    </p>
                                    <div>
                                        {parse(newsdetail.content)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
NewsDetailPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {

    const { name } = params!

    const eventDetailInit = await client.news.geteventbyname({ name: name })


    try {
        return {
            props: {
                name,
                eventDetailInit,
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

export const getStaticPaths: GetStaticPaths = async (
    {
        locales,
    }
) => {
    invariant(locales, 'locales is not defined');
    return { paths: [], fallback: 'blocking' };
};


export default NewsDetailPage