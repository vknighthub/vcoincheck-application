import AsideLeftAuthen from '@/components/AsideLeftAuthen';
import RegisterFace from '@/components/face/RegisterFace';
import loginbg from "@/images/bg-login.jpg";
import PrivateLayout from '@/layouts/_private-route';
import { NextPageWithLayout } from '@/types';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {}

const AuthenticationSubmitPage: NextPageWithLayout = (props: Props) => {
    

    return (
        <div id="face" className="login-main-page" style={{ backgroundImage: "url(" + loginbg + ")" }}>
            <div className="login-wrapper">
                <AsideLeftAuthen />
                <div className="login-aside-right gradient_one">
                    <div className="row m-0 justify-content-center h-100 align-items-center">
                        <div className="col-xl-7 col-xxl-7">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <RegisterFace />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
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

AuthenticationSubmitPage.getLayout = function getLayout(page) {
    return <PrivateLayout>{page}</PrivateLayout>
}
export default AuthenticationSubmitPage