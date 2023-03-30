import Project from '@/components/Slider/Project'
import client from '@/data/client'
import { ProjectResponse, TopInput } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

const BestProject = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const projectskeleton = useRef<HTMLDivElement>(null);

    const ProjectList = (top: TopInput) => {
        const { data, isLoading } = useQuery<ProjectResponse, Error>(
            ['top-project'],
            () => client.project.top(top),
        )
        return {
            topproject: data?.result.data,
            isLoading
        }
    }

    const { topproject, isLoading } = ProjectList({ top: 10 })




    useEffect(() => {
        if (projectskeleton.current) {
            const width = projectskeleton.current.offsetWidth;
            setWindowWidth(width);
        }

    }, []);

    if (windowWidth === null) {
        return null;
    }

    const skeletonCount = windowWidth <= 1024 ? 5 : windowWidth <= 1440 ? 8 : 10;

    return (
        <div className="col-xl-12 col-xxl-12" ref={projectskeleton}>
            <div className="card">
                <div className="card-body">
                    <div className="testimonial-one owl-right-nav owl-carousel owl-loaded owl-drag">
                        {(!isLoading) ?
                            <>
                                <Project topproject={topproject} />
                            </>
                            :
                            <>
                                <Skeleton
                                    count={skeletonCount}
                                    inline
                                    height={120}
                                    width={120}
                                    baseColor="#28253b"
                                    borderRadius="0.5rem"
                                    wrapper={InlineWrapperWithMargin}
                                />
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BestProject

function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
    return <span style={{ marginRight: '0.5rem' }}>{children}</span>
}