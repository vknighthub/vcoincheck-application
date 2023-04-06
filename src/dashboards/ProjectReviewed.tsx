import client from '@/data/client';
import { ProjectReviewInput, ProjectReviewResponse, SettingsQueryOptions } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';
import ButtonLiked from './../components/Control/ButtonLiked';

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
        const { data, isLoading } = useQuery<ProjectReviewResponse, Error>(
            ['project-review'],
            () => client.project.getprojectreview(reviewinput, languages),
        )
        return {
            projectreview: data?.result.data,
            isLoading
        }
    }

    const { projectreview, isLoading } = ProjectReviews(
        { reviewid: reviewid },
        { language: language }
    )

    const score = projectreview?.scores

    const totalscore = (score?.advancereview ?? 0) + (score?.basicreview ?? 0) + (score?.expertreview ?? 0) + (score?.overreview ?? 0)

    const [activeToggle, setActiveToggle] = useState("");

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
                                            <li className="nav-item" onClick={() => setActiveToggle("overviewed")} >
                                                <Link href="#overviewed" data-toggle="tab" className={`nav-link ${activeToggle === "overviewed" ? "active show" : ""}`}>{t('overview')}</Link>
                                            </li>
                                            <li className="nav-item" onClick={() => setActiveToggle("basic-reviewed")}>
                                                <Link href="#basic-reviewed" data-toggle="tab" className={`nav-link ${activeToggle === "basic-reviewed" ? "active show" : ""}`}>Basic review</Link>
                                            </li>
                                            <li className="nav-item" onClick={() => setActiveToggle("advance-reviewed")} >
                                                <Link href="#advance-reviewed" data-toggle="tab" className={`nav-link ${activeToggle === "advance-reviewed" ? "active show" : ""}`}>Advance review</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="#expert-reviewed" data-toggle="tab" onClick={() => setActiveToggle("expert-reviewed")} className={`nav-link ${activeToggle === "expert-reviewed" ? "active show" : ""}`}>Expert review</Link>
                                            </li>
                                        </ul>
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