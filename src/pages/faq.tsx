import routes from '@/config/routes'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import FAQs from '@/dashboards/FAQs'

type Props = {}

const FAQ: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <Seo title="vCoincheck"
                description="VcoinCheck - Frequently Asked Questions (FAQs)"
                url={routes.faq}
                image_url='https://vcoincheck.io/static/media/logo128.46a7870a.svg' />
            <FAQs />
        </>
    )
}
FAQ.getLayout = function getLayout(page) {
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
export default FAQ