import routes from '@/config/routes'
import FAQs from '@/dashboards/FAQs'
import { useFAQQuery } from '@/data/faq'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'


const FAQ: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ formattedparams }) => {

    const { faq, refetch } = useFAQQuery(formattedparams)

    useEffect(() => {
        refetch()
    }, [formattedparams])

    return (
        <>
            <Seo title="vCoincheck"
                description="VcoinCheck - Frequently Asked Questions (FAQs)"
                url={routes.faq}
                image_url='https://vcoincheck.io/static/media/logo128.46a7870a.svg' />
            {
                faq && <FAQs faq={faq} />
            }
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
                formattedparams,
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