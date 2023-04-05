import { getAuthCredentials } from '@/components/auth/use-auth'
import { Config } from '@/config'
import routes from '@/config/routes'
import { allowedRoles, hasAccess, isAuthenticated } from '@/data/client/token.utils'
import Layout from '@/layouts/_layout'
import { NextPageWithLayout } from '@/types'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { default as folder } from '@/images/folder.png';

const FileManagement: NextPageWithLayout = () => {

    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6 col-sm-6" >
                    <div className="card project-boxed">
                        <Link href={`file-management/project`} className="text-black user-name">
                            <div className="img-bx">
                                <Image src={folder} alt="" className=" mr-3 card-list-img w-100" width={300} height={300}/>
                                <span className="fs-16 text-primary input-group-text">Project</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6 col-sm-6" >
                    <div className="card project-boxed">
                        <Link href={`${'/community-details'}/`} className="text-black user-name">
                            <div className="img-bx">
                                <Image src={folder} alt="" className=" mr-3 card-list-img w-100" width={300} height={300}/>
                                <span className="fs-16 text-primary input-group-text">Event</span>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}
FileManagement.getLayout = function getLayout(page) {
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

export default FileManagement