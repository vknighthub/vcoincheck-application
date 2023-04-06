import { useEffect, useState } from "react";
import Advanced from './project/viewdetails/Advanced';
import Basic from './project/viewdetails/Basic';
import Expert from './project/viewdetails/Expert';
import Overviews from './project/viewdetails/Overviews';
import ApproveProject from "./project/ApproveProject";
import BackTo from '@/components/vKnightHub/Control/BackTo';
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import client from "@/data/client";

const ProjectReviewedManager = ({ reviewid, language }) => {

    const ProjectReviews = (reviewinput, languages) => {
        const { data, isLoading, refetch } = useQuery(
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

    const [activeToggle, setActiveToggle] = useState(projectreview?.activereviewed);

    const GetDataProjectReview = (data, type) => {
        const filteredData = data?.filter((review) => review.reviewtype === type);
        let items = [];
        if (filteredData?.length > 0) {
            items = filteredData[0].main_data;
        } else {
            items = null
        }
        return items
    }

    const overview = GetDataProjectReview(projectreview?.main_data, 'OR')
    const basicquestion = GetDataProjectReview(projectreview?.main_data, 'BR')
    const advancequestion = GetDataProjectReview(projectreview?.main_data, 'AR')
    const expertquestion = GetDataProjectReview(projectreview?.main_data, 'ER')

    const isapproved = projectreview?.status === 'A' ? true : false
    const scorereviews = projectreview?.scores

    useEffect(() => {
        refetch()
    }, [reviewid, language])


    return (
        <>

            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="profile-tab">
                            <div className="custom-tab-1">

                                <ul className="nav nav-tabs">
                                    {overview &&
                                        <li className="nav-item" onClick={() => setActiveToggle("overviewed")} >
                                            <Link href="#overviewed" data-toggle="tab" className={`nav-link ${activeToggle === "overviewed" ? "active show" : ""}`}>Overview</Link>
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

                                    <div id="advance-reviewed" className={`tab-pane fade ${activeToggle === "advance-reviewed" ? "active show" : ""}`}>
                                        {advancequestion &&
                                            <Advanced reviewinfo={advancequestion} />}
                                    </div>

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
            {!isapproved && <ApproveProject reviewid={reviewid} scorereview={scorereviews} />}
            <div className="col-xl-12"><BackTo className="btn btn-primary" href="/project-review-list" name="Back To List" /></div>
        </>
    );
};
export default ProjectReviewedManager;