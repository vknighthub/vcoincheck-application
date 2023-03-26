import React from 'react'
import Project from '@/components/Slider/Project'
import client from '@/data/client'
import { useQuery } from '@tanstack/react-query'
import { ProjectResponse, TopInput } from '@/types'

type Props = {}

const BestProject = (props: Props) => {

    const ProjectList = (top: TopInput) => {

        const { data, isLoading, error } = useQuery<ProjectResponse, Error>(
            ['top-project'],
            () => client.project.top(top),
        )
        return {
            topproject: data?.result.data,
            isLoading,
            error,
        }
    }

    const { topproject } = ProjectList({ top: 10 })

    return (
        <div className="col-xl-12 col-xxl-12">
            <div className="card">
                <div className="card-body">
                    <div className="testimonial-one owl-right-nav owl-carousel owl-loaded owl-drag">
                        <Project topproject={topproject} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BestProject