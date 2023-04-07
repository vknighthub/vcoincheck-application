import client from '@/data/client';
import { ProjectReviewInput, ProjectReviewResponse, SettingsQueryOptions } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { MouseEventHandler, useEffect, useState } from 'react';
import ButtonLiked from './../components/Control/ButtonLiked';
import { GetDataProjectReview } from '@/utils/GetDataProjectReview';
import Overviews from './project/viewdetails/Overviews';
import Basic from './project/viewdetails/Basic';
import Advanced from './project/viewdetails/Advanced';
import Expert from './project/viewdetails/Expert';

type Props = {
    reviewid: string,
    language: string,
    isShow: boolean,
    showReviewList: boolean
    setBackToProject: MouseEventHandler<HTMLAnchorElement> | undefined
}

const ProjectReviewed = ({ isShow, showReviewList, reviewid, language, setBackToProject }: Props) => {
    const { t } = useTranslation()

    const ProjectReviews = (reviewinput: ProjectReviewInput, languages: SettingsQueryOptions) => {
        const { data, isLoading, refetch } = useQuery<ProjectReviewResponse, Error>(
            ['project-review'],
            () => client.project.getprojectreview(reviewinput, languages),
        )
        return {
            projectreview: data?.result.data,
            isLoading,
            refetch
        }
    }

    const { projectreview, refetch } = ProjectReviews(
        { reviewid: reviewid },
        { language: language }
    )


    const overview = GetDataProjectReview(projectreview?.main_data, 'OR')
    const basicquestion = GetDataProjectReview(projectreview?.main_data, 'BR')
    const advancequestion = GetDataProjectReview(projectreview?.main_data, 'AR')
    const expertquestion = GetDataProjectReview(projectreview?.main_data, 'ER')

    const score = projectreview?.scores

    const totalscore = (score?.advancereview ?? 0) + (score?.basicreview ?? 0) + (score?.expertreview ?? 0) + (score?.overreview ?? 0)

    const [activeToggle, setActiveToggle] = useState("");

    useEffect(() => {
        refetch()
    }, [reviewid, language])

    return (
        <>
            {
                showReviewList && isShow &&
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
                                                        {totalscore}
                                                    </span>{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                                        <ButtonLiked islike={projectreview?.islike} numberoflike={projectreview?.likes} reviewid={reviewid} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="profile-tab">
                                    <div className="custom-tab-1">
                                        <ul className="nav nav-tabs">
                                            {overview &&
                                                <li className="nav-item" onClick={() => setActiveToggle("overviewed")} >
                                                    <Link href="#overviewed" data-toggle="tab" className={`nav-link ${activeToggle === "overviewed" ? "active show" : ""}`}>{t('overview')}</Link>
                                                </li>
                                            }
                                            {basicquestion &&
                                                <li className="nav-item" onClick={() => setActiveToggle("basic-reviewed")}>
                                                    <Link href="#basic-reviewed" data-toggle="tab" className={`nav-link ${activeToggle === "basic-reviewed" ? "active show" : ""}`}>Basic review</Link>
                                                </li>
                                            }
                                            {advancequestion &&
                                                <li className="nav-item" onClick={() => setActiveToggle("advance-reviewed")} >
                                                    <Link href="#advance-reviewed" data-toggle="tab" className={`nav-link ${activeToggle === "advance-reviewed" ? "active show" : ""}`}>Advance review</Link>
                                                </li>
                                            }
                                            {expertquestion &&
                                                <li className="nav-item">
                                                    <Link href="#expert-reviewed" data-toggle="tab" onClick={() => setActiveToggle("expert-reviewed")} className={`nav-link ${activeToggle === "expert-reviewed" ? "active show" : ""}`}>Expert review</Link>
                                                </li>
                                            }
                                        </ul>
                                        <div className="tab-content">
                                            {overview &&
                                                <div id="overviewed" className={`tab-pane fade ${activeToggle === "overviewed" ? "active show" : ""}`} >
                                                    <Overviews reviewinfo={overview} />
                                                </div>
                                            }
                                            {basicquestion &&
                                                <div id="basic-reviewed" className={`tab-pane fade ${activeToggle === "basic-reviewed" ? "active show" : ""}`} >
                                                    <Basic reviewinfo={basicquestion} />
                                                </div>
                                            }
                                            {advancequestion &&
                                                <div id="advance-reviewed" className={`tab-pane fade ${activeToggle === "advance-reviewed" ? "active show" : ""}`}>
                                                    <Advanced reviewinfo={advancequestion} />
                                                </div>
                                            }
                                            {expertquestion &&
                                                <div id="expert-reviewed" className={`tab-pane fade ${activeToggle === "expert-reviewed" ? "active show" : ""}`}>
                                                    <Expert reviewinfo={expertquestion} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <Link href="#" onClick={setBackToProject} className="btn btn-primary d-block rounded-0 mt-3 mt-md-0">Back to project</Link>
                    </div>
                </>
            }
        </>
    )
}

export default ProjectReviewed