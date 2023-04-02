import Layout from '@/layouts/_layout'
import { ListUserRole, NextPageWithLayout, RoleList } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { GetServerSideProps } from 'next'
import { getAuthCredentials } from '@/components/auth/use-auth'
import { allowedRoles, hasAccess, isAuthenticated } from '@/data/client/token.utils'
import routes from '@/config/routes'
import { Config } from '@/config'
import PageTitle from '@/layouts/_title'
import { useTranslation } from 'next-i18next'
import { useRoleQuery } from '@/data/user'
import Skeleton from 'react-loading-skeleton'

const UserRole: NextPageWithLayout = () => {
    const { t } = useTranslation('common')
    const { userrole, isLoading } = useRoleQuery()

    function showUserRoles(role: ListUserRole[] | undefined, loading: boolean) {
        let result = role?.map((data, index) => {
            return (
                <>
                    <tr key={index}>
                        <td className="font-w500">
                            {loading ? <Skeleton /> : data.roleid}
                        </td>
                        <td className="font-w500">
                            {loading ? <Skeleton /> : data.rolename}
                        </td>
                        <td className="font-w500">
                            {loading ? <Skeleton /> : data.roledescription}
                        </td>
                    </tr>
                </>
            )
        })

        return result;
    };


    return (
        <>
            <PageTitle activeMenu="User Role" motherMenu="User Management" pageHeading={''} path={''} activeDisplay={''} />
            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header d-block d-sm-flex border-0">
                            <div>
                                <h4 className="fs-20 text-black">{t('userrole')}</h4>
                            </div>
                        </div>
                        <div className="card-body tab-content p-0">
                            <div className="table-responsive">
                                <table className="table shadow-hover card-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <strong>{t('roleid')}</strong>
                                            </th>
                                            <th>
                                                <strong>{t('rolename')}</strong>
                                            </th>
                                            <th>
                                                <strong>{t('roledescription')}</strong>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            {showUserRoles(userrole, isLoading)}
                                        </>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
UserRole.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    try {

        const { locale } = ctx;
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

        return {
            props: {
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

export default UserRole