import routes from '@/config/routes'
import client from '@/data/client'
import Layout from '@/layouts/_layout'
import Seo from '@/layouts/_seo'
import PageTitle from '@/layouts/_title'
import { LIST_ALPHABET } from '@/lib/constants'
import { NextPageWithLayout } from '@/types'
import { useQuery } from '@tanstack/react-query'
import parse from 'html-react-parser'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useState } from 'react';


const DictionaryPage: NextPageWithLayout<
    InferGetStaticPropsType<typeof getStaticProps>
>
    = ({ dictionaryInit }) => {
        const { t } = useTranslation('common')

        const { data } = useQuery({
            queryKey: ['dictionary'],
            queryFn: () => client.library.dictionary(
                {
                    dictionarykey: "A",
                    dictionaryname: ""
                }
            ),
            initialData: dictionaryInit,
        })

        const [content, setContent] = useState(data.result.data)

        const handleDictionary = async (alphabet: string) => {
            let postData = {
                dictionarykey: alphabet.toUpperCase(),
                dictionaryname: ""
            }
            const dictionary = await client.library.dictionary(postData)
            setContent(dictionary.result.data)
        }

        const list_alphabet = LIST_ALPHABET



        return (
            <>
                <Seo title="vCoincheck - Dictionary"
                    description="vCoincheck | Find Glossary on Essential Cardano"
                    url={routes.dictionary}
                    image_url="https://vcoincheck.io/static/media/logo128.46a7870a.svg" />

                <PageTitle activeMenu={t('dictionary')} motherMenu={t('library')} path={"dictionary"} pageHeading={''} activeDisplay={''} />
                <div className="row">

                    <div className="col-xl-12 col-lg-12">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-body border-bottom">
                                <div className="media profile-bx">
                                    <div className="media-body align-items-center">
                                        <div className="social-icons justify-content-center">
                                            {list_alphabet.map((value, index) => (
                                                <Link key={index}
                                                    href="#"
                                                    className={`iconbx fa fa-${value}`}
                                                    onClick={() => handleDictionary(value)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {content &&
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-body border-bottom">
                                    {content.map((value: any, index: number) => (
                                        <div className="card-body pt-3" key={index}>
                                            <div className="profile-blog">
                                                <h4 className="card-title card-intro-title text-secondary">{value.dicname}</h4>
                                                <span className="mb-0">
                                                    {parse(value.content)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }

DictionaryPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const dictionaryInit = await client.library.dictionary(
        {
            dictionarykey: "A",
            dictionaryname: ""
        }
    )


    try {
        return {
            props: {
                dictionaryInit,
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

export default DictionaryPage