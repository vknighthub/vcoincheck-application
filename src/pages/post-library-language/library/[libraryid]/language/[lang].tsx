import client from '@/data/client'
import Layout from '@/layouts/_layout'
import { NextPageWithLayout } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'
import invariant from 'tiny-invariant'

type Props = {}

const PostLibraryLanguage: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ libararyInit }) => {
    const router = useRouter();
    const { lang, libraryid } = router.query;
    console.log(lang)
    console.log(libraryid)

    const { data } = useQuery({
        queryKey: ['librarybyid'],
        queryFn: () => client.library.getbyid(
            {
                libraryid: libraryid,
            },
            {
                language: lang
            }
        ),
        initialData: libararyInit,
    })

    const library = data.result?.data

    console.log(library)

    return (
        <div>PostLibraryLanguage</div>
    )
}

PostLibraryLanguage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {

    const { libraryid, lang } = params!; //* we know it's required because of getStaticPaths

    const librarybyid = await client.library.getbyid(
        {
            libraryid: libraryid
        },
        {
            language: lang
        }
    )

    const libararyInit = librarybyid

    try {
        return {
            props: {
                libararyInit,
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


export default PostLibraryLanguage