
import client from "@/data/client";
import logo from '@/images/Logo450x450.svg';
import loginbg from "@/images/bg-login.jpg";
import login from "@/images/bg-login2.png";
import PrivateLayout from '@/layouts/_private-route';
import Seo from "@/layouts/_seo";
import { NextPageWithLayout, RegisterReponse, RegisterUserInput } from "@/types";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from "axios";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import * as yup from 'yup';

const RegisterPage: NextPageWithLayout = () => {
    const { t } = useTranslation('common');
    const router = useRouter()


    const loginValidationSchema = yup.object().shape({
        username: yup.string().required(),
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        gender: yup.string().required(),
        address: yup.string().required(),
        email: yup.string().required(),
        birthday: yup.date().required(),
        phone: yup.string().required()
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterUserInput>({
        resolver: yupResolver(loginValidationSchema)
    });


    const { mutate: registerForm } = useMutation(client.users.register, {
        onSuccess: (data) => {
            if (!data.result.usrid) {
                toast.error(<b>{t('text-wrong-user-name-and-pass')}</b>, {
                    className: '-mt-10 xs:mt-0',
                });
                return;
            } else {
                Swal.fire({
                    title: "Registered!",
                    html: "Your user information has been sent to your email. It is possible that the information will go to spam due to the policy of the mail server",
                    icon: "success"
                }).then((login) => {
                    if (login) {
                        router.push('/page-login')
                    }
                })
            }

        },
        onError: (errorAsUnknown) => {
            const error = errorAsUnknown as AxiosError<RegisterReponse>;
            Swal.fire({
                position: 'center',
                icon: 'error',
                color: 'red',
                title: 'Oops...',
                text: `${error?.response?.status === 400 ? error?.response?.data.messagedetail : 'Error'}`,
            })

        }
    });

    const onSubmit: SubmitHandler<RegisterUserInput> = (data) => {
        registerForm(data)
    };
    return (
        <>
            <Seo 
                title="vCoincheck - Register"
                url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/page-register`} 
                image_url={""} 
                description="Welcome to vCoincheck. Please input some information to register new member of vCoincheck" 
            />

            <div className="register-main-page" style={{ backgroundImage: "url(" + loginbg.src + ")" }}>
                <div className="register-wrapper">
                    <div className="register-aside-left" style={{ backgroundImage: "url(" + login.src + ")" }}>
                        <div className="register-logo">
                            <Image src={logo} alt="" className="mr-2 img-fluid" />
                        </div>
                        <div className="register-description">
                            <div className="mt-5">
                                <Link href={"#"} className="text-black mr-4">{t('privacy')}</Link>
                                <Link href={"#"} className="text-black mr-4">{t('contact')}</Link>
                                <Link href={"https://www.vknight.io/"} className="text-black">© 2021 vKnightHub</Link>
                            </div>
                        </div>
                    </div>
                    <div className="register-aside-right gradient_one">
                        <div className="row m-0 justify-content-center h-100 align-items-center">
                            <div className="col-xl-10 col-xxl-10">
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12">
                                            <div className="auth-form-1">
                                                <div className="mb-4">
                                                    <h3 className="text-white mb-1">{t('welcome')} vCoincheck</h3>
                                                    <p className="text-white">{t('registerby')}</p>
                                                </div>

                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="row">
                                                        <div className="form-group col-xl-6 col-xl-6">
                                                            <label className="mb-2 ">
                                                                <strong className="text-white">{t('firstname')}</strong>
                                                            </label>
                                                            <input type="text" className="form-control"
                                                                {...register('firstname')}
                                                            />
                                                            {errors.firstname && <div className="text-danger fs-12">{errors.firstname.message}</div>}
                                                        </div>
                                                        <div className="form-group col-xl-6 col-xl-6">
                                                            <label className="mb-2 ">
                                                                <strong className="text-white">{t('lastname')}</strong>
                                                            </label>
                                                            <input type="text" className="form-control"
                                                                {...register('lastname')}
                                                            />
                                                            {errors.lastname && <div className="text-danger fs-12">{errors.lastname.message}</div>}
                                                        </div>
                                                        <div className="form-group col-xl-6 col-xl-6">
                                                            <label className="mb-2 ">
                                                                <strong className="text-white">{t('username')}</strong>
                                                            </label>
                                                            <input type="text" className="form-control"
                                                                {...register('username')}
                                                            />
                                                            {errors.username && <div className="text-danger fs-12">{errors.username.message}</div>}
                                                        </div>
                                                        <div className="form-group col-xl-6 col-xl-6">
                                                            <label className="mb-2 ">
                                                                <strong className="text-white">{t('dayofbirth')}</strong>
                                                            </label>
                                                            <input type="date" className="form-control"
                                                                {...register('birthday')}
                                                            />
                                                            {errors.birthday && <div className="text-danger fs-12">{errors.birthday.message}</div>}
                                                        </div>
                                                        <div className="form-group col-xl-6 col-xl-6">
                                                            <label className="mb-2 ">
                                                                <strong className="text-white">{t('gender')}</strong>
                                                            </label>
                                                            <div className="row mt-3 ml-5">
                                                                <div className="col-xl-6 col-xl-6">
                                                                    <input
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        value="1"
                                                                        {...register('gender')}
                                                                    />
                                                                    <label className="mb-2 ">
                                                                        <strong className="text-white">{t('male')}</strong>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-6 col-xl-6">
                                                                    <input
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        value="0"
                                                                        {...register('gender')}
                                                                    />
                                                                    <label className="mb-2 ">
                                                                        <strong className="text-white">{t('female')}</strong>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-xl-6 col-xl-6">
                                                            <label className="mb-2 ">
                                                                <strong className="text-white">{t('phone')}</strong>
                                                            </label>
                                                            <input type="text" className="form-control"
                                                                {...register('phone')}
                                                            />
                                                            {errors.phone && <div className="text-danger fs-12">{errors.phone.message}</div>}
                                                        </div>
                                                        <div className="form-group col-xl-6 col-xl-6">
                                                            <label className="mb-2 ">
                                                                <strong className="text-white">{t('email')}</strong>
                                                            </label>
                                                            <input type="text" className="form-control"
                                                                {...register('email')}
                                                            />
                                                            {errors.email && <div className="text-danger fs-12">{errors.email.message}</div>}
                                                        </div>
                                                        <div className="form-group col-xl-6 col-xl-6">
                                                            <label className="mb-2 ">
                                                                <strong className="text-white">{t('address')}</strong>
                                                            </label>
                                                            <input type="text" className="form-control"
                                                                {...register('address')}
                                                            />
                                                            {errors.address && <div className="text-danger fs-12">{errors.address.message}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row d-flex justify-content-between mt-2 mb-2">
                                                        <div className="form-group">
                                                            <div className="custom-control custom-checkbox">
                                                                <label
                                                                    className="form-check-label text-white"
                                                                >
                                                                    {t('emailsendtoyou')}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center mt-4">
                                                        <button
                                                            type="submit"
                                                            className="btn bg-dark text-light btn-block"
                                                        >
                                                            {t('register')}
                                                        </button>
                                                    </div>
                                                </form>
                                                <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="nav-item">
                                                        <Link className="ai-icon" href="/page-login">
                                                            <svg
                                                                id="icon-login"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="text-success mr-2"
                                                                width={18}
                                                                height={18}
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                                <polyline points="16 17 21 12 16 7" />
                                                                <line x1={21} y1={12} x2={9} y2={12} />
                                                            </svg>
                                                            Login
                                                        </Link>
                                                    </div>
                                                    <div className="nav-item">
                                                        <Link className="ai-icon mr-2" href="/">
                                                            <svg
                                                                id="icon-login"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="text-success mr-2"
                                                                width={18}
                                                                height={18}
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                                <polyline points="16 17 21 12 16 7" />
                                                                <line x1={21} y1={12} x2={9} y2={12} />
                                                            </svg>
                                                            {t('backtohome')}
                                                        </Link>
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

RegisterPage.getLayout = function getLayout(page) {
    return <PrivateLayout>{page}</PrivateLayout>
}
export default RegisterPage

