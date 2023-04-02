import routes from '@/config/routes'
import EcosystemList from '@/dashboards/EcosystemList'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'


const ECOSystem: NextPageWithLayout = () => {
    const { t } = useTranslation('common')
    return (
        <>
            <Seo title="vCoincheck"
                description="#Ecosystem
                Aug 2021 VS May 2021
                In just 3 months, Cardano has integrated 100 more projects spanning from DeFi to NFT.
                Next target for $ADA should be $10🚀🚀🚀
                🔄Retweet if u believe Cardano ecosystem will bomb like Big Bang explosion!
                #Cardano #ADA $ADA"
                url={routes.ecosystem}
                image_url={`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/system/image/ecosystem.jpg`} />
            <PageTitle activeMenu={t('ecosystem')} motherMenu={t('project')} path={"project"} pageHeading={''} activeDisplay={''} />
            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                    <div className="card">
                        <EcosystemList />
                    </div>
                </div>
            </div>
        </>
    )
}
ECOSystem.getLayout = function getLayout(page) {
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
export default ECOSystem