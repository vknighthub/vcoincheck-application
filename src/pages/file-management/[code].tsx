import Layout from '@/layouts/_layout'
import { NextPageWithLayout } from '@/types'
import React from 'react'

type Props = {}

const FileDetails: NextPageWithLayout = (props: Props) => {
    return (
        <div>FileDetail</div>
    )
}
FileDetails.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default FileDetails