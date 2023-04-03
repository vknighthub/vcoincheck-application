import loginbg from "@/images/bg-login.jpg"
import PrivateLayout from '@/layouts/_private-route'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AsideLeftAuthen from './../components/AsideLeftAuthen'

import LinkIcon from "@/components/Control/LinkIcon"
import useAuth from "@/components/auth/use-auth"
import client from "@/data/client"
import Seo from "@/layouts/_seo"
import { AuthResponse, LoginUserInput } from "@/types"
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Swal from "sweetalert2"
import * as yup from 'yup'

type Props = {}

const FaceAuthicatePage: NextPageWithLayout = (props: Props) => {
    const { t } = useTranslation('common');
    const router = useRouter()
    const { authorize } = useAuth();

    const loginValidationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginUserInput>({
        resolver: yupResolver(loginValidationSchema)
    });


    const { mutate: login, isSuccess } = useMutation(client.users.login, {
        onSuccess: (data) => {
            if (!data.result) {
                toast.error(<b>{t('text-wrong-user-name-and-pass')}</b>, {
                    className: '-mt-10 xs:mt-0',
                });
                return;
            } else {
                authorize(data.result.token, data.result.permission);
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

    if (isSuccess) {
        router.push('/page-authentication-submit')
    }

    const onSubmit: SubmitHandler<LoginUserInput> = (data) => {
        login(data)
    };
    return (
        <>
            <Seo
                title="vCoincheck - Login authentication"
                url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/page-face-auticate`}
                image_url={""}
                description="Please sign in or sign up user before continuing face authentication"
            />
            <div className="login-main-page" style={{ backgroundImage: "url(" + loginbg.src + ")" }}>
                <div className="login-wrapper">
                    <AsideLeftAuthen />
                    <div className="login-aside-right gradient_one">
                        <div className="row m-0 justify-content-center h-100 align-items-center">
                            <div className="col-xl-7 col-xxl-7">
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12">
                                            <div className="auth-form-1">
                                                <div className="mb-4">
                                                    <h3 className="text-white mb-1">{t('welcome')} vCoincheck</h3>
                                                    <p className="text-white">{t('askauthentication')}</p>
                                                </div>

                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-group">
                                                        <label className="mb-2 ">
                                                            <strong className="text-white">{t('username')}</strong>
                                                        </label>
                                                        <input type="text" className="form-control"
                                                            {...register('username')}
                                                        />
                                                        {errors.username && <div className="text-danger fs-12">{errors.username.message}</div>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="mb-2 "><strong className="text-white">{t('password')}</strong></label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            autoComplete="current-password"
                                                            {...register('password')}
                                                        />
                                                        {errors.password && <div className="text-danger fs-12">{errors.password.message}</div>}
                                                    </div>

                                                    <div className="text-center">
                                                        <button
                                                            type="submit"
                                                            className="btn bg-dark text-light btn-block"
                                                        >
                                                            {t('signin')}
                                                        </button>
                                                    </div>
                                                </form>

                                                <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="nav-item">
                                                        <LinkIcon className="ai-icon" href="/page-register" name={t('register')} />
                                                    </div>
                                                </div>

                                                <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="nav-item">
                                                        <LinkIcon className="ai-icon" href="/page-forgot-password" name={t('forgotpwd')} />
                                                    </div>
                                                </div>


                                                <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="nav-item">
                                                        <LinkIcon className="ai-icon" href="/" name={t('backtohome')} />
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
FaceAuthicatePage.getLayout = function getLayout(page) {
    return <PrivateLayout>{page}</PrivateLayout>
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
export default FaceAuthicatePage