import SubmitProject from '@/dashboards/SubmitProject'
import client from '@/data/client'
import Layout from '@/layouts/_layout'
import { NextPageWithLayout } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const SubmitProjectPage: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
> = ({ ecosystemdata }) => {
    const { data: ecosys } = useQuery({
        queryKey: ['ecosystem-project'],
        queryFn: () => client.project.ecosystem(),
        initialData: ecosystemdata,
    })

    const { data: protype } = useQuery({
        queryKey: ['project-type-list'],
        queryFn: () => client.project.projectype(),
        initialData: ecosystemdata,
    })


    const ecosystemlist = ecosys?.result.data
    const projectype = protype?.result.data
    return (
        <>
            <SubmitProject listecosystem={ecosystemlist} projecttype={projectype} />
        </>
    )
}
SubmitProjectPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const ecosystemdata = await client.project.ecosystem()
    const projectypedata = await client.project.projectype()

    try {
        return {
            props: {
                ecosystemdata,
                projectypedata,
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

export default SubmitProjectPage