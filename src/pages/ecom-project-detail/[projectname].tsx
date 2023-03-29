import routes from '@/config/routes';
import ProjectDescription from '@/dashboards/ProjectDescription';
import ReviewList from '@/dashboards/ReviewList';
import client from '@/data/client';
import { useMe } from '@/data/user';
import Layout from '@/layouts/_layout';
import Seo from '@/layouts/_seo';
import PageTitle from '@/layouts/_title';
import { NextPageWithLayout, UserProfile } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import Swal from 'sweetalert2';
import invariant from 'tiny-invariant';


const ProjectDetail: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ projectname, projectdetail, lang }) => {

    const { t } = useTranslation()

    const [reviewID, setReviewID] = useState('');
    const [showReviewList, setShowReviewList] = useState(true);

    const checkView = (isBuy: boolean) => {
        if (!isBuy) {
            Swal.fire({
                title: `${t('questionviewdetail')}`,
                text: `${t('questionbuyviewdetail')}`,
                icon: "warning"
            })
        }
    }

    const exchangeScores = (userInfo: UserProfile | undefined, scores: number, isShowReviewList: boolean) => {
        let postdata = {
            username: userInfo?.username,
            score: scores
        }

        setShowReviewList(isShowReviewList)
    }

    const checkBuy = (users: UserProfile | undefined, scoreneed: number) => {

        if (users!.scores >= scoreneed) {
            Swal.fire({
                title: `${t('exchangescoreviewdetail')}`,
                text: `${t('exchangescoreviewdetailquestion', { score: users!.scores, scoreneed: scoreneed })}`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: `${t('ok')}`,
                cancelButtonText: `${t('cancel')}`,
            }).then((willExchange) => {
                if (willExchange.isConfirmed) {
                    exchangeScores(users, scoreneed, false)
                } else {
                    Swal.fire(`${t('remindbuyreview')}`);
                }
            })
        } else {
            Swal.fire({
                title: `${t('noenoughtoreview')}`,
                text: `${t('earnmorereview', { scoremore: scoreneed - users!.scores })}`,
                icon: "warning",
            })
        }
    }

    const { data } = useQuery({
        queryKey: ['project-detail'],
        queryFn: () => client.project.getdetail(
            {
                proname: projectname,
            },
            {
                language: lang
            }
        ),
        initialData: projectdetail,
    })

    const { me } = useMe()

    const projectdata = data.result.data

    return (
        <>
            <Seo title="vCoincheck"
                description={projectdata.project_info.prodescr}
                url={routes.project_detail(projectname)}
                image_url={projectdata.project_info.proicon} />

            <PageTitle motherMenu={t('project')} activeMenu={t('projectdetail')} path="project" activeDisplay={projectname} pageHeading={''} />

            <div className="row">
                <ProjectDescription project={projectdata.project_info} />
                {showReviewList ?
                    <ReviewList reviewlist={projectdata.review_info} checkView={() => checkView(false)} handleSetReviewID={setReviewID} checkBuy={() => checkBuy(me, 50)} />
                    : <></>
                }
            </div>
        </>
    )
}
ProjectDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    try {
        const { projectname } = params!; //* we know it's required because of getStaticPaths
        const lang = locale!
        const projectdetail = await client.project.getdetail(
            {
                proname: projectname,
            },
            {
                language: locale
            }
        )

        return {
            props: {
                projectdetail,
                projectname,
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

export default ProjectDetail
