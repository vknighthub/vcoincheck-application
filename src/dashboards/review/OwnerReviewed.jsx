
import { useState,useEffect } from "react";
import Link from "next/link";
import Overviews from "../project/viewdetails/Overviews";
import Basic from "../project/viewdetails/Basic";
import Advanced from "../project/viewdetails/Advanced";
import Expert from "../project/viewdetails/Expert";



const OwnerReviewed = ({ overview, basicquestion, advancequestion, expertquestion, reviewid, scorereviews, activereviewed }) => {

    const [activeToggle, setActiveToggle] = useState(activereviewed)

    useEffect(() => {
        setActiveToggle(activereviewed)
    }, [reviewid,activereviewed])


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
                                                {scorereviews.overreview + scorereviews.basicreview + scorereviews.advancereview + scorereviews.expertreview}
                                            </span>{" "}
                                        </p>
                                    </div>
                                </div>
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
                <Link href="/app-profile" className="btn btn-primary d-block rounded-0 mt-3 mt-md-0">Back to profile</Link>
            </div>
        </>
    );
};


export default OwnerReviewed;