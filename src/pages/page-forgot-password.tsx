
import Asideleft from "@/components/AsideLeft";
import LinkIcon from "@/components/Control/LinkIcon";
import useAuth from '@/components/auth/use-auth';
import client from "@/data/client";
import loginbg from "@/images/bg-login.jpg";
import PrivateLayout from "@/layouts/_private-route";
import Seo from "@/layouts/_seo";
import { AuthResponse, ForgotPasswordInput, LoginUserInput, NextPageWithLayout } from "@/types";
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

const ForgotPassword: NextPageWithLayout = () => {
    const { t } = useTranslation('common');

    const router = useRouter()


    const loginValidationSchema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordInput>({
        resolver: yupResolver(loginValidationSchema)
    });


    const { mutate: forgotpassword } = useMutation(client.users.forgotpassword, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                Swal.fire("Succeed!", "We have sent to your mail a OTP code to vefiy reset password. Please get OTP code and input into page", "success")
                    .then((response) => {
                        if (response) {
                            router.push("/page-otp-password");
                        }
                    });
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

    const onSubmit: SubmitHandler<ForgotPasswordInput> = (data) => {
        forgotpassword(data)
    };

    return (
        <>
            <Seo
                title="vCoincheck - Login"
                url={`page-forgot-password`}
                image_url={""}
                description="Welcome to vCoincheck. Please input some information to reset password"
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
                                                    <p className="text-white">{t('forgotpwd')}</p>
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
                                                            autoComplete="current-password"
                                                            {...register('email')}
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

ForgotPassword.getLayout = function getLayout(page) {
    return <PrivateLayout>{page}</PrivateLayout>
}

export default ForgotPassword

