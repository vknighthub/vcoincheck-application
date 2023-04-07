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
    const { me } = useMe()
    const users = me
    const router = useRouter()
    const [render, setRender] = useState(false);

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

    const faceRegistration = async (user) => {
            // const face = document.getElementById('face')
            // face.style.display = 'none';
           
            try {
                console.log(user)
                const userInfo = await faceioInstance?.enroll({
                    locale: "auto",
                    payload: {
                        email: `${user.email}`,
                        userId: `${user.phone}`,
                        username: `${user.username}`,
                        website: "https://vcoincheck.io"
                    },
                })
                

                if (userInfo.facialId) {
                    console.log(userInfo)
                    // const postData = {
                    //     username: users.username,
                    //     faceid: userInfo.facialId
                    // }
                    // registerFaceAction(postData);
                }

            } catch (errorCode) {
                console.log(errorCode)
                // const error = handleFaceError(errorCode)
                // Swal.fire("Error!", error, "error")
                //     .then((response) => {
                //         if (response) {
                //             face.style.display = 'block';
                //             setRender(true)
                //         }
                //     });
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
        if (faceIO && !faceioInstance) {
            faceioInstance = new faceIO('fioa6bbb') //your-faceio-app-public-id
            console.log(faceioInstance)
        }
    }

    return (
        <>
            {render && 
                <div className="form-row d-flex justify-content-between mt">
                    <Link href="#" className="btn btn-primary" onClick={()=>faceRegistration(users)} >{t('registrationface')}</Link>
                    <Link href="/" className="btn btn-primary ">{t('gotohome')}</Link>
                </div>
            }
        </>
    );
};

export default RegisterFace;