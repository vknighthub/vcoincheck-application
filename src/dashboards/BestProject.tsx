import React, { PropsWithChildren } from 'react'
import Project from '@/components/Slider/Project'
import client from '@/data/client'
import { useQuery } from '@tanstack/react-query'
import { ProjectResponse, TopInput } from '@/types'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import SliderSlice from './../components/Slider/index';

const BestProject = () => {

    const ProjectList = (top: TopInput) => {

        const { data, isLoading, error, isError } = useQuery<ProjectResponse, Error>(
            ['top-project'],
            () => client.project.top(top),
        )
        return {
            topproject: data?.result.data,
            isLoading,
            error,
            isError
        }
    }

    const { topproject, isLoading, isError } = ProjectList({ top: 10 })

    return (
        <div className="col-xl-12 col-xxl-12">
            <div className="card">
                <div className="card-body">
                    <div className="testimonial-one owl-right-nav owl-carousel owl-loaded owl-drag">
                        {(!isLoading) ?
                            <>
                                <Project topproject={topproject} />
                            </>
                            :
                            <>
                                <SkeletonTheme
                                    baseColor="#28253b"
                                    borderRadius="0.5rem">
                                    <SliderSlice >
                                        <Skeleton count={10} inline height={120} width={120} />
                                    </SliderSlice>
                                </SkeletonTheme>
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BestProject