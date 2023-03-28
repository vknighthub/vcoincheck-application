import client from '@/data/client'
import { ProjectResponse, TopInput } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import parse from 'html-react-parser';

type Props = {}

const TopProject = (props: Props) => {
    const { t } = useTranslation('common');

    const FetchHotProject = (top: TopInput) => {

        const { data, isLoading, error } = useQuery<ProjectResponse, Error>(
            ['hot-project'],
            () => client.project.top(top),
        )
        return {
            projectlist: data?.result.data,
            isLoading,
            error,
        }
    }

    const { projectlist } = FetchHotProject({ top: 6 })

    return (
        <div className="row">
            {projectlist?.map((project, index) => (
                <div className="col-lg-12 col-xl-4" key={index}>
                    <div className="card">
                        <div className="card-body">
                            <Link href={`ecom-project-detail/${project.proname}`} className="text-black">
                                <div className="row m-b-30">
                                    <div className="col-md-5 col-xxl-12">
                                        <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                                            <div className="new-arrivals-img-contnent">
                                                <Image className="img-fluid" width={154} height={154} src={project.proicon} alt={project.proname} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-7 col-xxl-12">
                                        <div className="new-arrival-content position-relative">
                                            <h4>
                                                {project.proname}
                                            </h4>
                                            <div className="comment-review star-rating">
                                                <ul id="stars"
                                                    className="d-flex justify-content-center align-items-center">
                                                    {t('score')}
                                                </ul>
                                                <p className="price mt-3">{project.scores}</p>
                                            </div>
                                            <p>
                                                {t('availability')}:{" "}
                                                <span className="item">
                                                    {" "}
                                                    <i className="fa fa-check-circle text-success" />
                                                </span>
                                            </p>
                                            <p>
                                                {t('projectcode')}: <span className="item">{project.procd}</span>{" "}
                                            </p>
                                            <p>
                                                {t('ecosystem')}: <span className="item">{project.Ecosystem}</span>{" "}
                                            </p>
                                            <span className="text-content fs-14">
                                                {parse(project.prodescr.substring(0, 225))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TopProject