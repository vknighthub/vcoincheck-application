import SignInFace from '@/dashboards/SignInFace'
import PrivateLayout from '@/layouts/_private-route'
import { NextPageWithLayout } from '@/types'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = {}

const SignInFacePage: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <SignInFace />
        </>
    )
}

SignInFacePage.getLayout = function getLayout(page) {
    return <PrivateLayout>{page}</PrivateLayout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
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
export default SignInFacePage