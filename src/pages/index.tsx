import routes from '@/config/routes'
import BestProject from '@/dashboards/BestProject'
import ProjectList from '@/dashboards/ProjectList'
import banner from "@/images/banner/main-banner.png"
import slogan from "@/images/banner/slogan.png"
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="vCoincheck"
        description="VcoinCheck is a website built with content from the community. Those who want to know if a Blockchain project is good or not can evaluate Blockchain projects for themselves by answering the questions in Vcoincheck."
        url={routes.home}
        image_url='https://api.vcoincheck.io/system/image/Logo450x450.svg' />
        
      <div className="row">
        <BestProject />
        <div className="col-xl-6 col-xxl-12 col-lg-12">
          <div className="card">
            <Image src={banner} alt="" className="img-fluid w-100" />
          </div>
        </div>
        <div className="col-xl-6 col-xxl-12 col-lg-12">
          <div className="card">
            <Image src={slogan} alt="" className="img-fluid w-100" />
          </div>
        </div>

        <div className="col-xl-12 col-xxl-12 col-lg-12">
          <div className="card">
            <ProjectList />
          </div>
        </div>

      </div>
    </>
  )
}
Home.getLayout = function getLayout(page) {
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

export default Home;


