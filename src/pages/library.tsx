import routes from '@/config/routes'
import client from '@/data/client'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { NextPageWithLayout } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Library from '@/dashboards/Library'
import { useEffect, useState } from 'react'

const LibraryPage: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ libraryInit, libraryNewTopicInit, lang }) => {

    const { t } = useTranslation('common')

    const [render, setRender] = useState(false)

    const { data: toplibrary, refetch: refetchTopLibrary } = useQuery({
        queryKey: ['top-library'],
        queryFn: () => client.library.gettop(
            {
                top: 10,
            },
            {
                language: lang
            }
        ),
        initialData: libraryInit,
    })

    const { data: topiclibrary, refetch: refetchNewTopicLibrary } = useQuery({
        queryKey: ['topic-library'],
        queryFn: () => client.library.getnewtopic(
            {
                top: 10,
            },
            {
                language: lang
            }
        ),
        initialData: libraryNewTopicInit,
    })

    const library_top = toplibrary.result.data
    const newtopiclibrary = topiclibrary.result.data

    useEffect(() => {
        refetchTopLibrary()
        refetchNewTopicLibrary()
        setRender(true)
    }, [lang,render])

    return (
        <>
            <Seo title="vCoincheck - Library"
                description={library_top[0].summary}
                url={routes.library}
                image_url={library_top[0].image} />

            <PageTitle activeMenu={t('library')} motherMenu={t('library')} path={"library"} pageHeading={''} activeDisplay={''} />
            {library_top && newtopiclibrary && render &&
                < Library toplibrary={library_top} newtopiclibrary={newtopiclibrary} />
            }
        </>
    )
}
LibraryPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const lang = locale!

        const formattedparams = {
            language: locale,
        };

        const libraryInit = await client.library.gettop(
            {
                top: 10
            },
            formattedparams
        )

        const libraryNewTopicInit = await client.library.getnewtopic(
            {
                top: 10
            },
            formattedparams
        )

        

        return {
            props: {
                libraryInit,
                libraryNewTopicInit,
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
export default LibraryPage