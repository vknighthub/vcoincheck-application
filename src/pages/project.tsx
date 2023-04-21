import routes from '@/config/routes'
import ProjectTable from '@/dashboards/ProjectTable'
import TopProject from '@/dashboards/TopProject'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const ProjectPage: NextPageWithLayout = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Seo title="vCoincheck - Project"
                description="vCoinCheck A place to synthesize typical projects, as well as projects with development potential. Community participants can log in to comment and rate their favorite projects. Users will get points when participating in project evaluation "
                url={routes.project}
                image_url={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/system/image/project.png`} />
                
            <PageTitle activeMenu={t('allproject')} motherMenu={t('project')} path="project" pageHeading={''} activeDisplay={''} />
            <TopProject />
            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                    <div className="card">
                        <ProjectTable />
                    </div>
                </div>
            </div>
        </>
    )
}
ProjectPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        return {
            props: {
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
export default ProjectPage