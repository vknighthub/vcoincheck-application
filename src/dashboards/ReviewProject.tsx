import { useTranslation } from 'next-i18next';
import Link from 'next/link'
import React, { useState } from 'react'
import Overviews from './evaluate/Overviews'
import { QuestionInfo } from '@/types';
import Basic from './evaluate/Basic';
import Advanced from './evaluate/Advanced';
import Expert from './evaluate/Expert';

type Props = {
    question: QuestionInfo
    projectid: number
}

const ReviewProject = ({ question, projectid }: Props) => {
    const { t } = useTranslation('common');

    const [activeToggle, setActiveToggle] = useState("overview");

    const actionStep = (curentStep: string) => {
        switch (curentStep) {
            case 'overview':
                setActiveToggle("basic-review");
                break;
            case 'basic':
                setActiveToggle("advance-review");
                break;
            case 'advanced':
                setActiveToggle("expert-review");
                break;
            case 'expert':
                break;
            default:
        }

    }

    return (
        <div className="col-xl-12">
            <div className="card">
                <div className="card-body">
                    <div className="profile-tab">
                        <div className="custom-tab-1">
                            <ul className="nav nav-tabs">
                                <li className="nav-item" onClick={() => setActiveToggle("overview")} >
                                    <Link href="#overview" data-toggle="tab" className={`nav-link ${activeToggle === "overview" ? "active show" : ""}`}>{t('overview')}</Link>
                                </li>
                                <li className="nav-item" onClick={() => setActiveToggle("basic-review")}>
                                    <Link href="#basic-review" data-toggle="tab" className={`nav-link ${activeToggle === "basic-review" ? "active show" : ""}`}>{t('basicreview')}</Link>
                                </li>
                                <li className="nav-item" onClick={() => setActiveToggle("advance-review")} >
                                    <Link href="#advance-review" data-toggle="tab" className={`nav-link ${activeToggle === "advance-review" ? "active show" : ""}`}>{t('advancereview')}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="#expert-review" data-toggle="tab" onClick={() => setActiveToggle("expert-review")} className={`nav-link ${activeToggle === "expert-review" ? "active show" : ""}`}>{t('expertreview')}</Link>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="overview" className={`tab-pane fade ${activeToggle === "overview" ? "active show" : ""}`} >
                                    <Overviews
                                        overquestion={question.overquestion}
                                        projectid={projectid}
                                        actions={() => actionStep("overview")}
                                    />
                                </div>
                                <div id="basic-review" className={`tab-pane fade ${activeToggle === "basic-review" ? "active show" : ""}`} >
                                    <Basic
                                        basicquestion={question.basicquestion}
                                        projectid={projectid}
                                        actions={() => actionStep("basic")} />
                                </div>
                                <div id="advance-review" className={`tab-pane fade ${activeToggle === "advance-review" ? "active show" : ""}`}>
                                    <Advanced
                                        advancequestion={question.advancequestion}
                                        projectid={projectid}
                                        actions={() => actionStep("advanced")} />
                                </div>
                                <div id="expert-review" className={`tab-pane fade ${activeToggle === "expert-review" ? "active show" : ""}`}>
                                    <Expert
                                        expertquestion ={question.expertquestion }
                                        projectid={projectid}
                                        actions={() => actionStep("advanced")} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewProject