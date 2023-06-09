import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { default as profile05, default as profile06, default as profile07 } from "@/images/profile/profile.png";
import ProfileSetting from './ProfileSetting';
import UserReviewed from "./UserReviewed";
import Link from "next/link";
import Image from "next/image";


export const UserProfile = ({ users }) => {
    const { t } = useTranslation('common');

    const [activeToggle, setActiveToggle] = useState("review");
    const [replayModal, setReplayModal] = useState(false);

    return (
        <div className="row">
            <div className="col-xl-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="profile-statistics">
                                    <div className="text-center">
                                        <div className="row">
                                            <div className="col">
                                                <h3 className="m-b-0">{users.project_list.length}</h3><span>{t('project')}</span>
                                            </div>
                                            <div className="col">
                                                <h3 className="m-b-0">{users.list_review.length}</h3> <span>{t('review')}</span>
                                            </div>
                                            <div className="col">
                                                <h3 className="m-b-0">{users.scores}</h3> <span>{t('points')}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header border-0 pb-0">
                                <h5 className="text-black">My Latest Library</h5>
                            </div>
                            <div className="card-body pt-3">
                                <div className="profile-news">
                                    <div className="media pt-3 pb-3">
                                        <Image src={profile05} alt="" className="mr-3 rounded" width={75} />
                                        <div className="media-body">
                                            <h5 className="m-b-5">
                                                <Link href="/post-details" className="text-black">
                                                    Collection of textile samples
                                                </Link>
                                            </h5>
                                            <p className="mb-0">I shared this on my fb wall a few months back, and I thought. </p>
                                        </div>
                                    </div>
                                    <div className="media pt-3 pb-3">
                                        <Image src={profile06} alt="" className="mr-3 rounded" width={75} />
                                        <div className="media-body">
                                            <h5 className="m-b-5">
                                                <Link href="/post-details" className="text-black">
                                                    Collection of textile samples
                                                </Link>
                                            </h5>
                                            <p className="mb-0">
                                                I shared this on my fb wall a few months back, and I
                                                thought.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="media pt-3 ">
                                        <Image src={profile07} alt="" className="mr-3 rounded" width={75} />
                                        <div className="media-body">
                                            <h5 className="m-b-5">
                                                <Link href="/post-details" className="text-black">
                                                    Collection of textile samples
                                                </Link>
                                            </h5>
                                            <p className="mb-0">
                                                I shared this on my fb wall a few months back, and I thought.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-8">
                <div className="card">
                    <div className="card-body">
                        <div className="profile-tab">
                            <div className="custom-tab-1">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item" onClick={() => setActiveToggle("review")}>
                                        <Link href="#my-review" data-toggle="tab" className={`nav-link ${activeToggle === "review" ? "active show" : ""}`}>{t('myreview')}</Link>
                                    </li>
                                    <li className="nav-item" onClick={() => setActiveToggle("aboutMe")}>
                                        <Link href="#about-me" data-toggle="tab" className={`nav-link ${activeToggle === "aboutMe" ? "active show" : ""}`}>{t('aboutme')}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${activeToggle === "setting" ? "active show" : ""}`}>{t('setting')}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#kyc" data-toggle="tab" onClick={() => setActiveToggle("kyc")} className={`nav-link ${activeToggle === "kyc" ? "active show" : ""}`}>{t('KYC')}</Link>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="my-review" className={`tab-pane fade ${activeToggle === "review" ? "active show" : ""}`} >
                                        <div className="my-post-content pt-3">
                                            <div className="profile-uoloaded-post border-bottom-1 pb-5">
                                                <UserReviewed project={users.list_review} user={users} />
                                            </div>

                                            {/* Modal */}
                                            <Modal show={replayModal} onHide={() => setReplayModal(false)} className="modal fade" id="replyModal">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Post Reply</h5>
                                                        <button type="button" className="close" onClick={() => setReplayModal(false)}><span>&times;</span></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <textarea className="form-control" rows="4">Message</textarea>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-danger light" onClick={() => setReplayModal(false)}>Close</button>
                                                        <button type="button" className="btn btn-primary">Reply</button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                    <div id="about-me" className={`tab-pane fade ${activeToggle === "aboutMe" ? "active show" : ""}`}>
                                        <div className="profile-about-me">
                                            <div className="pt-4 border-bottom-1 pb-3">
                                                <h4 className="text-primary">{t('aboutme')}</h4>
                                                <p className="mb-2">
                                                    A wonderful serenity has taken possession of my
                                                    entire soul, like these sweet mornings of spring
                                                    which I enjoy with my whole heart. I am alone, and
                                                    feel the charm of existence was created for the
                                                    bliss of souls like mine.I am so happy, my dear
                                                    friend, so absorbed in the exquisite sense of mere
                                                    tranquil existence, that I neglect my talents.
                                                </p>
                                                <p>
                                                    A collection of textile samples lay spread out on
                                                    the table - Samsa was a travelling salesman - and
                                                    above it there hung a picture that he had recently
                                                    cut out of an illustrated magazine and housed in a
                                                    nice, gilded frame.
                                                </p>
                                            </div>
                                        </div>


                                        <div className="profile-personal-info">
                                            <h4 className="text-primary mb-4">
                                                {t('personalinfo')}
                                            </h4>
                                            <div className="row mb-2">
                                                <div className="col-3">
                                                    <h5 className="f-w-500">{t('name')}<span className="pull-right">:</span></h5>
                                                </div>
                                                <div className="col-9">
                                                    <span>{`${users.firstname}  ${users.lastname}`}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-3">
                                                    <h5 className="f-w-500">{t('email')}<span className="pull-right">:</span></h5>
                                                </div>
                                                <div className="col-9">
                                                    <span>{users.email}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-3">
                                                    <h5 className="f-w-500">{t('birthday')}<span className="pull-right">:</span></h5>
                                                </div>
                                                <div className="col-9">
                                                    <span>{users.birthday}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-3">
                                                    <h5 className="f-w-500">{t('address')}<span className="pull-right">:</span></h5>
                                                </div>
                                                <div className="col-9">
                                                    <span>{users.address}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-3">
                                                    <h5 className="f-w-500">{t('phone')}<span className="pull-right">:</span></h5>
                                                </div>
                                                <div className="col-9">
                                                    <span>{users.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="profile-settings" className={`tab-pane fade ${activeToggle === "setting" ? "active show" : ""}`}>
                                        {users && <ProfileSetting users={users} />}
                                    </div>
                                    <div id="kyc" className={`tab-pane fade ${activeToggle === "kyc" ? "active show" : ""}`}>
                                        <div className="profile-about-me">
                                            <div className="pt-4 border-bottom-1 pb-3">
                                                <h4 className="text-primary">{t('KYC')}</h4>
                                                <p className="mb-2">
                                                    The table below keeps track of the last enrolled users on this FACEIO application. You can programmatically monitor events like this including new user enrollment, facial authentication sucess, Facial ID deletion, and many other events by simply setting up Webhooks via the application manager to keep your application private backend synchronized.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="profile-personal-info">
                                            <h4 className="text-primary mb-4">
                                                {t('kycinfo')}
                                            </h4>
                                            <div className="row mb-2">
                                                <div className="col-3">
                                                    <h5 className="f-w-500">{t('faceid')}<span className="pull-right">:</span></h5>
                                                </div>
                                                <div className="col-9">
                                                    <span>{`${users.faceid ? users.faceid : `${t('unregistered')}`}`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile