import HotProject from '@/components/Project/HotProject'
import client from '@/data/client'
import { ProjectResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ProjectList = () => {
    const { t } = useTranslation()
    const { locale } = useRouter()

    const Project = (language: string | undefined) => {

        const { data, error, refetch } = useQuery<ProjectResponse, Error>(
            ['all-project'],
            () => client.project.all({ language: language }),
        )
        return {
            projects: data?.result.data,
            error,
            refetch
        }
    }

    const { projects, refetch } = Project(locale);

    useEffect(() => {
        refetch()
    }, [locale])


    return (
        <>
            <div className="card-header d-block d-sm-flex border-0">
                <div>
                    <h4 className="fs-20 text-black">{t('hotproject')}</h4>
                </div>
            </div>
            <div className="card-body tab-content p-0">
                <div className="table-responsive">
                    <table className="table shadow-hover card-table">
                        <thead>
                            <tr>
                                <th className="width100">
                                    <strong>{t('no')}</strong>
                                </th>
                                <th>
                                    <strong>{t('projectname')}</strong>
                                </th>
                                <th>
                                    <strong>{t('ecosystem')}</strong>
                                </th>
                                <th>
                                    <strong>{t('categories')}</strong>
                                </th>
                                <th>
                                    <strong>{t('projectquality')}</strong>
                                </th>
                                <th>
                                    <strong>{t('noofviewed')}</strong>
                                </th>
                                <th>
                                    <strong>{t('lastcontributed')}</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                projects?.map((project) => (
                                    <HotProject key={project.proid} project={project} index={project.proid} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProjectList