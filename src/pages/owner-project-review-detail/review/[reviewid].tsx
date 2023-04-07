import Layout from '@/layouts/_layout'
import { NextPageWithLayout, ProjectReviewInput, ProjectReviewResponse, SettingsQueryOptions } from '@/types'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import invariant from 'tiny-invariant'
import OwnerReviewed from '@/dashboards/review/OwnerReviewed'
import { GetDataProjectReview } from '@/utils/GetDataProjectReview';
import { useQuery } from '@tanstack/react-query';
import client from '@/data/client'
import { useEffect } from 'react'


const OwnerReviewedPage: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ reviewid, language }) => {

    const ProjectReviews = (reviewinput: ProjectReviewInput, languages: SettingsQueryOptions) => {
        const { data, isLoading, refetch } = useQuery<ProjectReviewResponse, Error>(
            ['project-review'],
            () => client.project.getprojectreview(reviewinput, languages),
        )
        return {
            projectreview: data?.result.data,
            isLoading,
            refetch
        }
    }

    const { projectreview, refetch } = ProjectReviews(
        { reviewid: reviewid },
        { language: language }
    )

    const overview = GetDataProjectReview(projectreview?.main_data, 'OR')
    const basicquestion = GetDataProjectReview(projectreview?.main_data, 'BR')
    const advancequestion = GetDataProjectReview(projectreview?.main_data, 'AR')
    const expertquestion = GetDataProjectReview(projectreview?.main_data, 'ER')

    const score = projectreview?.scores

    return (
        <>
            {projectreview &&
                <OwnerReviewed
                    overview={overview}
                    basicquestion={basicquestion}
                    advancequestion={advancequestion}
                    expertquestion={expertquestion}
                    scorereviews={score}
                    reviewid={reviewid}
                    activereviewed = {projectreview.activereviewed}
                />
            }
        </>
    )
}
OwnerReviewedPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    try {
        const { reviewid } = params!
        return {
            props: {
                reviewid,
                language: locale,
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

export default OwnerReviewedPage