import Layout from '@/layouts/_layout'
import { NextPageWithLayout } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import PageTitle from '@/layouts/_title'
import { useTranslation } from 'next-i18next'
import Seo from '@/layouts/_seo'
import routes from '@/config/routes'
import FilteringTable from '@/components/table/FilteringTable/FilteringTable'
import { useRouter } from 'next/router';
import { COLUMNSFILTER as COLUMNS_EN } from '@/dashboards/library/locale/en/Columns';
import { COLUMNSFILTER as COLUMNS_JP } from '@/dashboards/library/locale/jp/Columns';
import { COLUMNSFILTER as COLUMNS_VN } from '@/dashboards/library/locale/vn/Columns';
import client from '@/data/client'
import { useQuery } from '@tanstack/react-query'

const LibraryManagement: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ librarymanagement }) => {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    const columns = () => {
        switch (locale) {
            case 'en': return COLUMNS_EN
            case 'vn': return COLUMNS_VN
            case 'jp': return COLUMNS_JP
            default: return COLUMNS_EN
        }
    }

    const { data, refetch } = useQuery({
        queryKey: ['library-management'],
        queryFn: () => client.library.librarymanagement(locale),
        initialData: librarymanagement,
    })

    const library = data?.result.data

    useEffect(() => {
        refetch()
    }, [locale])


    return (
        <>
            <Seo title="vCoincheck"
                description={"catalystknowledgeInit[0].summary"}
                url={routes.librarymanagement}
                image_url={"catalystknowledgeInit[0].image"} />
            <PageTitle motherMenu={t('library')} activeMenu={t('librarylistmng')} pageHeading={''} path={''} activeDisplay={''} />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-body tab-content p-0">
                                {library && <FilteringTable colunmsfilter={columns()} datafilter={library} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
LibraryManagement.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const lang = locale!

    const librarymanagement = await client.library.librarymanagement(lang)

    try {
        return {
            props: {
                librarymanagement,
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
export default LibraryManagement