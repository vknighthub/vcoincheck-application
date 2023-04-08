'use client'

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import loginbg from "@/images/bg-login.jpg";
import handleFaceError from '@/utils/handleFaceError';
import AsideLeftAuthen from './../components/AsideLeftAuthen';
import { useTranslation } from "next-i18next"
import Link from 'next/link';
import { useLoginByFaceMutation } from '@/data/user';
import { useRouter } from 'next/router';

const SignInFace = () => {

    const [dataio, setDataIO] = useState()
    const router = useRouter()
    const { t } = useTranslation('common');
    const [render, setRender] = useState(false);

    const { mutate: LoginByFaceAction } = useLoginByFaceMutation()

    const faceSignIn = async () => {
        const face = document.getElementById('face')
        face.style.display = 'none';
        try {
            const userData = await dataio.authenticate({
                locale: "auto",
            })
            if (userData.facialId) {
                console.log(`userData:` + userData)
                const postData = {
                    username: userData.payload.username,
                    faceid: userData.facialId
                }
                LoginByFaceAction(postData);
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            }

        } catch (errorCode) {
            const error = handleFaceError(errorCode)
            Swal.fire("Error!", error, "error")
                .then((response) => {
                    if (response) {
                        face.style.display = 'block';
                    }
                });
        }
    }

    useEffect(() => {
        const faceIoScript = document.createElement('script')
        faceIoScript.src = '//cdn.faceio.net/fio.js'
        faceIoScript.async = true
        faceIoScript.onload = () => faceIoScriptLoaded()
        document.body.appendChild(faceIoScript)
        setRender(true)
        return () => {
            document.body.removeChild(faceIoScript)
        }
    }, [render])

    const faceIoScriptLoaded = () => {
        let faceioInstance = null
        if (faceIO && !faceioInstance) {
            faceioInstance = new faceIO('fioa6bbb') //your-faceio-app-public-id
            setDataIO(faceioInstance)
        }
    }

    return (
        <>
            {render &&
                <div id="face" className="login-main-page" style={{ backgroundImage: "url(" + loginbg + ")" }}>
                    <div className="login-wrapper">
                        <AsideLeftAuthen />
                        <div className="login-aside-right gradient_one">
                            <div className="row m-0 justify-content-center h-100 align-items-center">
                                <div className="col-xl-8 col-xxl-8">
                                    <div className="authincation-content">
                                        <div className="row no-gutters">
                                            <div className="col-xl-12">
                                                <div className="form-row d-flex justify-content-between mt">
                                                    <Link href="#" className="btn btn-primary" onClick={() => faceSignIn()} >{t('scan')}</Link>
                                                    <Link href="/page-login" className="btn btn-primary ">{t('loginbyusername')}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    );
};

export default SignInFace;