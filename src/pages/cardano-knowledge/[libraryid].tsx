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


const CardanoKnowledgeDetail: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ cardanoknowledgedetailInit, libraryid, lang }) => {

    const { t } = useTranslation('common')


    const { data } = useQuery({
        queryKey: ['library-detail'],
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

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="post-details">

                                    <h1 className="mb-2 text-black text-center pb-2">
                                        {data.title}
                                    </h1>

                                    <ul className="mb-4 post-meta d-flex flex-wrap justify-content-center">
                                        <li className="post-date mr-3">
                                            <i className="fa fa-calendar mr-2" />
                                            {t('published')}: {data.createdt}
                                        </li>
                                    </ul>
                                    <ul className="mb-4 post-meta d-flex flex-wrap justify-content-center">
                                        <li className="post-date mr-3">
                                            <i className="fa fa-user mr-2" />
                                            {t('author')}:
                                            <Link href={`/library/author/${data.username}`} className="ml-3">
                                                {data.fullname}
                                            </Link>
                                        </li>
                                    </ul>

                                    <ul className="mb-4 post-meta d-flex flex-wrap justify-content-center">
                                        <li className="post-date mr-3">
                                            <i className="fa fa-eye mr-2" />
                                            {t('Viewd')}: {data.noofview}
                                        </li>
                                        <li className="post-date mr-3">
                                            <i className="fa fa-thumbs-up mr-2" />
                                            {t('Liked')}: {10}
                                        </li>
                                    </ul>


                                    <Image src={data.image} alt="" className="img-fluid mb-3 w-100" />
                                    <p className="text-blue fs-18 my-3">
                                        {data.summary}
                                    </p>
                                    <div>
                                        {parse(data.content)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <PostComment libraryid={data.id} comments={data.comment_info} /> */}
                </div>
            </div>
        </div>
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
    const cardanoknowledgedetailInit = cardanoknowledgedetail.result.data
    try {
        return {
            props: {
                cardanoknowledgedetailInit,
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