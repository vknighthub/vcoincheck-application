
import Asideleft from "@/components/AsideLeft";
import LinkIcon from "@/components/Control/LinkIcon";
import client from "@/data/client";
import loginbg from "@/images/bg-login.jpg";
import PrivateLayout from "@/layouts/_private-route";
import Seo from "@/layouts/_seo";
import { AuthResponse, NextPageWithLayout, OTPCodeInput } from "@/types";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from "axios";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import * as yup from 'yup';

const OTPPassword: NextPageWithLayout = () => {
    const { t } = useTranslation('common');

    const router = useRouter()


    const loginValidationSchema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().required(),
        code: yup.string().required()
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<OTPCodeInput>({
        resolver: yupResolver(loginValidationSchema)
    });


    const { mutate: confirmotpcode } = useMutation(client.users.confirmotpforgotpassword, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                Swal.fire("Succeed!", "Your password has been reset. Please login to email to get new password", "success")
                    .then((response) => {
                        if (response) {
                            setTimeout(() => {
                                router.push("/page-login");
                            }, 1000)

                        }
                    })
            } else {
                Swal.fire("Failed!", data.messagedetail, "error");
            }
        },
        onError: (errorAsUnknown) => {
            const error = errorAsUnknown as AxiosError<AuthResponse>;
            Swal.fire({
                position: 'center',
                icon: 'error',
                color: 'red',
                title: 'Oops...',
                text: `${error?.response?.status === 400 ? error?.response?.data.messagedetail : 'Error'}`,
            })

        }
    });

    const onSubmit: SubmitHandler<OTPCodeInput> = (data) => {
        confirmotpcode(data)
    };

    return (
        <>
            <Seo
                title="vCoincheck - Login"
                url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/page-login`}
                image_url={""}
                description="Welcome to vCoincheck. Please input some information to Login to vCoincheck"
            />
            <div className="login-main-page" style={{ backgroundImage: "url(" + loginbg.src + ")" }}>
                <div className="login-wrapper">
                    <Asideleft />
                    <div className="login-aside-right gradient_one">
                        <div className="row m-0 justify-content-center h-100 align-items-center">
                            <div className="col-xl-7 col-xxl-7">
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12">
                                            <div className="auth-form-1">
                                                <div className="mb-4">
                                                    <h3 className="text-white mb-1">{t('welcome')} vCoincheck</h3>
                                                    <p className="text-white">{t('Forgot Password')}</p>
                                                </div>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-group">
                                                        <label className="mb-2 ">
                                                            <strong className="text-white">{t('username')}</strong>
                                                        </label>
                                                        <input type="text" className="form-control"
                                                            autoComplete="username"
                                                            {...register('username')}

                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="mb-2 "><strong className="text-white">{t('email')}</strong></label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            autoComplete="current-email"
                                                            {...register('email')}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="mb-2 "><strong className="text-white">{t('OTP Code')}</strong></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            autoComplete="current-otpcode"
                                                            {...register('code')}
                                                        />
                                                    </div>

                                                    <div className="text-center">
                                                        <button
                                                            type="submit"
                                                            className="btn bg-dark text-light btn-block"
                                                        >
                                                            {t('resetpwd')}
                                                        </button>
                                                    </div>

                                                </form>

                                                <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="nav-item">
                                                        <LinkIcon className="ai-icon text-white" href="/" name={t('backtohome')} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
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

OTPPassword.getLayout = function getLayout(page) {
    return <PrivateLayout>{page}</PrivateLayout>
}

export default OTPPassword

