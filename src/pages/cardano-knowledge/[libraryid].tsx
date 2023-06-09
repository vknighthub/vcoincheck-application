import client from '@/data/client';
import Layout from '@/layouts/_layout';
import { NextPageWithLayout } from '@/types';
import { useQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import invariant from 'tiny-invariant';
import PostComment from './../../dashboards/PostComment';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { useEffect } from 'react';


const CardanoKnowledgeDetail: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ cardanoknowledgedetailInit, libraryid, lang }) => {

    const { t } = useTranslation('common')


    const { data, refetch } = useQuery({
        queryKey: ['library-cardano-detail'],
        queryFn: () => client.library.cardanoknowledgedetail(
            {
                libraryid: libraryid,
            },
            {
                language: lang
            }
        ),
        initialData: cardanoknowledgedetailInit,
    })

    const library = data.result?.data

    const initdataSEO = cardanoknowledgedetailInit.result.data

    useEffect(() => {
        refetch()
    }, [lang])

    return (
        <>
            <Seo title={`vCoincheck - ${initdataSEO.library_infor.title}`}
                description={initdataSEO.library_infor.summary}
                url={routes.cardanoknowledge_detail(libraryid)}
                image_url={initdataSEO.library_infor.image} />

            {library &&
                <div>
                    <div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="post-details">

                                            <h1 className="mb-2 text-black text-center pb-2">
                                                {library.library_infor.title}
                                            </h1>

                                            <ul className="mb-4 post-meta d-flex flex-wrap justify-content-center">
                                                <li className="post-date mr-3">
                                                    <i className="fa fa-calendar mr-2" />
                                                    {t('published')}: {library.library_infor.createdt}
                                                </li>
                                            </ul>
                                            <ul className="mb-4 post-meta d-flex flex-wrap justify-content-center">
                                                <li className="post-date mr-3">
                                                    <i className="fa fa-user mr-2" />
                                                    {t('author')}:
                                                    <Link href={`/library/author/${library.library_infor.username}`} className="ml-3">
                                                        {library.library_infor.fullname}
                                                    </Link>
                                                </li>
                                            </ul>

                                            <ul className="mb-4 post-meta d-flex flex-wrap justify-content-center">
                                                <li className="post-date mr-3">
                                                    <i className="fa fa-eye mr-2" />
                                                    {t('Viewd')}: {library.library_infor.noofview}
                                                </li>
                                                <li className="post-date mr-3">
                                                    <i className="fa fa-thumbs-up mr-2" />
                                                    {t('Liked')}: {10}
                                                </li>
                                            </ul>


                                            <Image src={library.library_infor.image} alt="" className="img-fluid mb-3 w-100" width={1630} height={915} />
                                            <p className="text-blue fs-18 my-3">
                                                {library.library_infor.summary}
                                            </p>
                                            <div>
                                                {library.library_infor.content && parse(library.library_infor.content)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <PostComment libraryid={library.library_infor.id} comments={library.comment_infor} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

CardanoKnowledgeDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {

    const { libraryid } = params!; //* we know it's required because of getStaticPaths
    const lang = locale!

    const cardanoknowledgedetail = await client.library.cardanoknowledgedetail(
        {
            libraryid: libraryid
        },
        {
            language: locale
        }
    )
    try {
        return {
            props: {
                cardanoknowledgedetailInit: cardanoknowledgedetail,
                libraryid,
                lang,
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


export default CardanoKnowledgeDetail