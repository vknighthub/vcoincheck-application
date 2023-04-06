/* eslint-disable react-hooks/exhaustive-deps */
import { Tab } from 'react-bootstrap';
import FilteringTable from '@/components/table/FilteringTable/FilteringTable';
import { COLUMNSUSERREVIEWLIST } from './project/locale/en/Columns';
import ProjectReviewedManager from './ProjectReviewedManager';
import Avatar from '@/components/svg/User/Avatar';

const ReviewDetail = ({ username, reviewid, reviewuserlist, language }) => {

    return (
        <>
            <div className="row">
                <div className="col-lg-12">

                    <div className="card">
                        <div className="card-body">

                            <div className="row">

                                <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                                    <Tab.Container defaultActiveKey="first">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <Avatar src={reviewuserlist.user_info.avatar} width={250} height={250} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>

                                <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                                    <div className="product-detail-content">
                                        <div className="new-arrival-content pr">
                                            <h4>{reviewuserlist.user_info.firstname} {reviewuserlist.user_info.lastname}</h4>
                                            <p> Project: <span className="item fs-18 mx-3">{reviewuserlist.project_info.proname}</span></p>
                                            <p> Categories: <span className="item fs-18 mx-3">{reviewuserlist.project_info.protype}</span></p>
                                            <p> Ecosystem:&nbsp;&nbsp;
                                                <span className="badge badge-success light mr-1">{reviewuserlist.project_info.Ecosystem}</span>
                                            </p>
                                            <p className="text-content">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {reviewuserlist.list_review &&
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-body tab-content p-0">
                                    <FilteringTable colunmsfilter={COLUMNSUSERREVIEWLIST} datafilter={reviewuserlist.list_review} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {reviewid !== 'false' && <ProjectReviewedManager reviewid={reviewid} username={username} language = {language} />}

        </>
    )
}

export default ReviewDetail
