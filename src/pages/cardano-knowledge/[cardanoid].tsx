import Layout from '@/layouts/_layout'
import { NextPageWithLayout } from '@/types'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

type Props = {}

const CardanoKnowledgeDetail: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = (props: Props) => {
    return (
        <div>CardanoKnowledgeDetail</div>
    )
}

CardanoKnowledgeDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const cardanoknowledge = await client.library.cardanoknowledge(
        {
            catname: "Cardano Knowledge"
        },
        {
            language: locale
        }
    )
    const cardanoknowledgeInit = cardanoknowledge.result.data
    try {
        return {
            props: {
                cardanoknowledgeInit,
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

export default CardanoKnowledgeDetail