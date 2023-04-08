import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import ProjectDescription from "./ProjectDescription";
import ProjectReviewed from './ProjectReviewed';
import ReviewList from './ReviewList';
import ReviewProject from './ReviewProject';
import { useTranslation } from 'next-i18next';
import { useMe, useMinusScoreUserAction } from '@/data/user';

const ProjectDetail = ({ project, isAuthorized, lang }) => {

	const { t } = useTranslation('common');

	const { me } = useMe()

	const [showReviewList, setShowReviewList] = useState(true);
	const [reviewID, setReviewID] = useState('');

	const checkView = (isBuy) => {
		if (!isBuy) {
			Swal.fire({
				title: `${t('questionviewdetail')}`,
				text: `${t('questionbuyviewdetail')}`,
				icon: "warning",
				dangerMode: true,
			})
		}
	}

	const { mutate: MinusScoreUserAction } = useMinusScoreUserAction()

	const exchangeScores = (userInfo, scores, isShowReviewList) => {
		let postdata = {
			username: userInfo.username,
			score: scores
		}
		MinusScoreUserAction(postdata);
		setShowReviewList(isShowReviewList)
	}

	const checkBuy = (users, scoreneed) => {
		if (users.scores >= scoreneed) {
			Swal.fire({
				title: `${t('exchangescoreviewdetail')}`,
				text: `${t('exchangescoreviewdetailquestion', { score: users.scores, scoreneed: scoreneed })}`,
				icon: "question",
				showCancelButton: true,
				confirmButtonText: `${t('ok')}`,
				cancelButtonText: `${t('cancel')}`,
			}).then((willExchange) => {
				if (willExchange.isConfirmed) {
					exchangeScores(users, scoreneed, false)
				} else {
					Swal.fire(`${t('remindbuyreview')}`);
				}
			})
		} else {
			Swal.fire({
				title: `${t('noenoughtoreview')}`,
				text: `${t('earnmorereview', { scoremore: scoreneed - users.scores })}`,
				icon: "warning",
				dangerMode: true,
			})
		}
	}


	const [isShow, setIsShow] = useState(false)

	useEffect(() => {
		setIsShow(true)
	}, [])

	return (
		<>
			{project.project_info && <ProjectDescription project={project.project_info} />}

			{isAuthorized &&
				<>
					{showReviewList ?
						(
							<>
								{project.review_info &&
									<ReviewList
										isShow={isShow}
										showReviewList={showReviewList}
										reviewlist={project.review_info}
										checkView={() => checkView(false)}
										handleSetReviewID={setReviewID}
										checkBuy={() => checkBuy(me, 50)} />
								}
								{project && <ReviewProject project={project.project_info} question={project.question_info} isAuthorized={isAuthorized} />}
							</>
						) : (
							<ProjectReviewed
								isShow={isShow}
								showReviewList={!showReviewList}
								reviewid={reviewID}
								language={lang}
								setBackToProject={() => setShowReviewList(true)}
							/>

						)
					}
				</>
			}
		</>
	);
};


export default ProjectDetail;
