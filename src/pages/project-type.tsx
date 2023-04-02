import routes from '@/config/routes'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { NextPageWithLayout, ProjectTypeListResponse } from '@/types'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProjectTypeList from '@/dashboards/ProjecTypetList'
import { useQuery } from '@tanstack/react-query'
import client from '@/data/client'


const ProjectType: NextPageWithLayout = () => {
    const { t } = useTranslation('common')

    const FetchProjectType = () => {
        const { data, isLoading } = useQuery<ProjectTypeListResponse, Error>(
            ['project-type-list'],
            () => client.project.projectype(),
        )
        return {
            projecttype: data?.result.data,
            isLoading
        }
    }

    const { projecttype } = FetchProjectType()

    return (
        <>
            <Seo title="vCoincheck"
                description="Cardano is a public blockchain platform. It is open-source and decentralized, with consensus achieved using proof of stake. It can facilitate peer-to-peer transactions with its internal cryptocurrency, ADA."
                url={routes.projectype}
                image_url={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/system/image/best_cardano_projects.jpeg`} />

            <PageTitle activeMenu={t('projecttype')} motherMenu={t('project')} path={"project"} pageHeading={''} activeDisplay={''} />

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                    <div className="card">
                        <ProjectTypeList projecttype={projecttype} />
                    </div>
                </div>
            </div>
        </>
    )
}

ProjectType.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const formattedparams = {
            language: locale,
        };
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

export default ProjectType