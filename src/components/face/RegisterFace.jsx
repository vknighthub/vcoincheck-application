/* eslint-disable no-undef */


import client from '@/data/client';
import { useMe } from '@/data/user';
import handleFaceError from '@/utils/handleFaceError';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next'
import Swal from 'sweetalert2';

const RegisterFace = () => {
    let faceioInstance = null
    const { t } = useTranslation();
    const [render, setRender] = useState(false);
    const { me } = useMe()
    const users = me
    const router = useRouter()



    const { mutate: registerFaceAction } = useMutation(client.users.registerface, {
        onSuccess: (data) => {
            if (!data) {
                toast.error(<b>{t('text-wrong-user-name-and-pass')}</b>, {
                    className: '-mt-10 xs:mt-0',
                });
                return;
            } else {
                Swal.fire({
                    title: "Registered!",
                    html: "Your user information has been registered faceio already.",
                    icon: "success"
                }).then((login) => {
                    if (login) {
                        router.push('/')
                    }
                })
            }

        },
        onError: (errorAsUnknown) => {
            const error = errorAsUnknown
            Swal.fire({
                position: 'center',
                icon: 'error',
                color: 'red',
                title: 'Oops...',
                text: `${error?.response?.status === 400 ? error?.response?.data.messagedetail : 'Error'}`,
            })

        }
    });

    const faceRegistration = async () => {
        const face = document.getElementById('face')
        face.style.display = 'none';
        try {
            const userInfo = await faceioInstance.enroll({
                locale: "auto",
                payload: {
                    email: `${users.email}`,
                    userId: `${users.phone}`,
                    username: `${users.username}`,
                    website: "https://vcoincheck.io"
                },
            })
            if (userInfo.facialId) {
                const postData = {
                    username: users.username,
                    faceid: userInfo.facialId
                }
                registerFaceAction(postData);
            }

        } catch (errorCode) {
            const error = handleFaceError(errorCode)
            Swal.fire("Error!", error, "error")
                .then((response) => {
                    if (response) {
                        face.style.display = 'block';
                        setRender(true)
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [render])

    const faceIoScriptLoaded = () => {
        console.log(faceIO)
        if (faceIO && !faceioInstance) {
            faceioInstance = new faceIO('fioa6bbb') //your-faceio-app-public-id
        }
    }

    return (
        <>
            {
                render &&
                <div className="form-row d-flex justify-content-between mt">
                    <Link href="#" className="btn btn-primary" onClick={faceRegistration} >{t('registrationface')}</Link>
                    <Link href="/" className="btn btn-primary ">{t('gotohome')}</Link>
                </div>
            }
        </>
    );
};

export default RegisterFace;