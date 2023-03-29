import client from '@/data/client'
import { ProjectReviewInput, ProjectReviewResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {
    reviewid: string,
    language: string
}

const ProjectReviewed = ({ reviewid, language }: Props) => {

    const ProjectReviews = (reviewinput: ProjectReviewInput) => {

        const { data, isLoading, error } = useQuery<ProjectReviewResponse, Error>(
            ['top-project'],
            () => client.project.getprojectreview(reviewinput, { language: language }),
        )
        return {
            projectreview: data?.result.data,
            isLoading,
            error,
        }
    }

    const { projectreview, isLoading } = ProjectReviews({ reviewid: reviewid })


    return (
        <>
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                                <div className="product-detail-content">
                                    <div className="new-arrival-content pr">
                                        <p className="fs-18 text-success"> Review code:<span className="item fs-18 mx-3">{reviewid}</span>{" "}</p>
                                        <p className="fs-18 text-success"> Review score:
                                            <span className="item fs-18 mx-3">

                                            </span>{" "}
                                        </p>
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

export default ProjectReviewed