import routes from '@/config/routes'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Carousel from '@/dashboards/Carousel'


const MarketInfo: NextPageWithLayout = () => {
    return (
        <>
            <Seo title="vCoincheck - Market info"
                description="Power your applications with CoinGecko’s independently sourced crypto data such as live prices, NFT floor prices, trading volume, exchange volumes, trading pairs, historical data, contract address data, crypto categories, crypto derivatives, images and more.
                Our Public API* has a rate limit of 10-30 calls/minute, and doesn't come with API key. Need something more powerful? Subscribe to our paid API Plans to access Pro API key! 🔑 For users with Pro API key, please use this root URL to make API request: https://pro-api.coingecko.com/api/v3/"
                url={routes.marketinfo}
                image_url="https://vcoincheck.io/static/media/logo128.46a7870a.svg" />

            <div className="row pb-5">
                <div className="col-xl-12 col-xxl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="testimonial-one owl-right-nav owl-carousel owl-loaded owl-drag">
                                <Carousel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
MarketInfo.getLayout = function getLayout(page) {
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
export default MarketInfo