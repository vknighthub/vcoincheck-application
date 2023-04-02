import Avatar from '@/components/User/Avatar'
import { getAuthCredentials } from '@/components/auth/use-auth'
import Loader from '@/components/ui/loader/loader'
import { Config } from '@/config'
import routes from '@/config/routes'
import UserRolePermit from '@/dashboards/UserRolePermit'
import { allowedRoles, hasAccess, isAuthenticated } from '@/data/client/token.utils'
import { useApproveUserMutation, useUserDetailQuery } from '@/data/user'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { NextPageWithLayout } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const getStatusType = (status: string | undefined) => {
    switch (status) {
        case 'N':
            return (<i className={`fa fa-check-circle text-success  fs-20`} />)
        case 'P':
            return (<i className={`fa fa-question-circle text-warning  fs-20`} />)
        case 'C':
            return (<i className={`fa fa-minus-circle text-danger  fs-20`} />)
        default:
            return ''
    }
}



const UserProfile: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username, language }) => {

    const { t } = useTranslation('common')
    const router = useRouter();

    const [apply, setApply] = useState(false)
    const [hideApprove, setHideApprove] = useState(false)
    const [hideBlocked, setHideBlocked] = useState(false)
    const [hideUnBlocked, setUnHideBlocked] = useState(false)
    const [userStatus, setUserStatus] = useState('')


    const { mutate: SetUseRole } = useApproveUserMutation();


    const blockUser = (userName: string | undefined, status: string | undefined) => {
        const postData = {
            username: userName,
            status: status
        }
        Swal.fire({
            title: "Are you sure want to block this user?",
            icon: "question",
        }).then((result) => {
            if (result.value) {
                try {
                    SetUseRole(postData)
                    setUserStatus('C')
                    setUnHideBlocked(false)
                    setHideBlocked(true)
                    Swal.fire("Blocked!", "This user has been blocked.", "success")
                        .then((result) => {
                            if (result.value) {
                                router.reload()
                            }
                        })
                } catch (error) {
                    Swal.fire("Failed!", "This user has been failed for block.", "error")
                }
            }
        });
    }

    const unBlockUser = (userName: string | undefined, status: string | undefined) => {
        const postData = {
            username: userName,
            status: status
        }
        Swal.fire({
            title: "Are you sure want to unblock this user?",
            icon: "question",

        }).then((result) => {
            if (result.value) {
                try {
                    SetUseRole(postData)
                    setUserStatus('N')
                    setUnHideBlocked(true)
                    setHideBlocked(false)
                    Swal.fire("Unclocked!", "This user has been unclocked.", "success")
                        .then((result) => {
                            if (result.value) {
                                router.reload()
                            }
                        })
                } catch (error) {
                    Swal.fire("Failed!", "This user has been failed for unblock.", "error")
                }
            }
        });
    }

    const approveUser = (userName: string | undefined, status: string | undefined) => {
        const postData = {
            username: userName,
            status: status
        }
        Swal.fire({
            title: "Are you sure want to approve this user?",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                SetUseRole(postData)
                setHideApprove(true)
                setUserStatus('N')
                Swal.fire("Approved!", "This user has been approved.", "success")
                    .then((result) => {
                        if (result.value) {
                            router.reload()
                        }
                    })
            }
        });
    }

    const showButton = (userName: string | undefined, userStatus: string | undefined) => {
        switch (userStatus) {
            case 'N':
                return <button onClick={() => blockUser(userName, 'C')} className="btn btn-danger" type="submit">Block</button>
            case 'P':
                return (
                    <>
                        <button onClick={() => approveUser(userName, 'N')} className="btn btn-success mr-2" type="submit" hidden={hideApprove}>Approve</button>
                        <button onClick={() => blockUser(userName, 'C')} className="btn btn-danger" type="submit" hidden={hideBlocked}>Block</button>
                    </>

                )
            case 'C':
                return (<button onClick={() => unBlockUser(userName, 'N')} className="btn btn-danger" type="submit" hidden={hideUnBlocked}>Unclock</button>)
            default:
                return ''
        }
    }

    const { userdetail, isLoading, refetch } = useUserDetailQuery(
        {
            username: username,
        },
        {
            language: language
        }
    )

    useEffect(() => {
        refetch()
    }, [username, apply, language, userStatus])

    if (isLoading) return <Loader text={t('common:text-loading')} />


    return (
        <>
            <Seo title="vCoincheck"
                description={username}
                url={routes.user_detail(username)}
                image_url="" />

            <PageTitle
                activeMenu="User active"
                motherMenu="User Management"
                path="user-list"
                pageHeading={''}
                activeDisplay={username} />

            <div className="row">
                <div className="col-xl-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="profile-statistics">
                                        <div className="text-center">
                                            <div className="profile-photo pb-2">
                                                {userdetail?.avatar
                                                    ?
                                                    <Image
                                                        src={userdetail.avatar}
                                                        className="img-fluid rounded-circle"
                                                        alt="profile"
                                                        width={300}
                                                        height={300}
                                                    /> : <Avatar width={300} height={300} src={undefined} />
                                                }
                                            </div>
                                            <div className="profile-photo pb-5">
                                                <span className="item" >
                                                    {getStatusType(userdetail?.status)}
                                                </span>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <h3 className="m-b-0">{userdetail?.project_list.length}</h3><span>{t('project')}</span>
                                                </div>
                                                <div className="col">
                                                    <h3 className="m-b-0">{userdetail?.list_review.length}</h3> <span>{t('review')}</span>
                                                </div>
                                                <div className="col">
                                                    <h3 className="m-b-0">{userdetail?.scores}</h3> <span>{t('points')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-tab">
                                <div className="pt-3">
                                    <div className="settings-form">
                                        <h4 className="text-primary mb-5">Account Information</h4>
                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>First Name</label>
                                                    <input type="text" value={userdetail?.firstname} className="form-control" disabled />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Last Name</label>
                                                    <input type="text" value={userdetail?.lastname} className="form-control" disabled />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" value={userdetail?.address} className="form-control" disabled />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>Phone</label>
                                                    <input type="text" value={userdetail?.phone} className="form-control" disabled />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Birthday</label>
                                                    <input type="text" value={userdetail?.birthday} className="form-control" disabled />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>User created</label>
                                                    <input type="text" value={userdetail?.usercreated} className="form-control" disabled />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Create date</label>
                                                    <input type="text" value={userdetail?.datecreated} className="form-control" disabled />
                                                </div>
                                            </div>
                                            <div className='form-group mt-5'>
                                                <UserRolePermit rolelist={userdetail?.role_list} username={userdetail?.username} setApply={setApply} />
                                            </div>
                                            <div className='form-group mt-5'>
                                                {showButton(userdetail?.username, userStatus ? userStatus : userdetail?.status)}
                                            </div>

                                        </form>
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

UserProfile.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    try {

        const { locale, params } = ctx;
        const generateRedirectUrl =
            locale !== Config.defaultLanguage
                ? `/${locale}${routes.login}`
                : routes.login;


        const { token, permission } = getAuthCredentials(ctx);

        if (
            !isAuthenticated({ token, permission }) ||
            !hasAccess(allowedRoles, permission)
        ) {
            return {
                redirect: {
                    destination: generateRedirectUrl,
                    permanent: false,
                },
            };
        }

        const { username } = params!; //* we know i t's required because of getStaticPaths
        const lang = locale!

        return {
            props: {
                token: token,
                permissions: permission,
                username: username,
                language: lang,
                ...(await serverSideTranslations(locale!, ['common'])),
            }
        };
    } catch (error) {
        console.log(error)
        //* if we get here, the product doesn't exist or something else went wrong
        return {
            notFound: true,
        };
    }
};


export default UserProfile