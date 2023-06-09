import ReviewList from '@/dashboards/ReviewList';
import { useMe } from '@/data/user';
import { ReviewInfo, UserProfile } from '@/types';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

type Props = {
    reviewinfo: ReviewInfo[],
    isAuthorized: boolean,
}

const Review = ({ reviewinfo, isAuthorized }: Props) => {
    const { t } = useTranslation()

    const { me } = useMe()

    const [reviewID, setReviewID] = useState('');
    const [showReviewList, setShowReviewList] = useState(true);

    const checkView = (isBuy: boolean) => {
        if (!isBuy) {
            Swal.fire({
                title: `${t('questionviewdetail')}`,
                text: `${t('questionbuyviewdetail')}`,
                icon: "warning"
            })
        }
    }

    const exchangeScores = (userInfo: UserProfile | undefined, scores: number, isShowReviewList: boolean) => {
        let postdata = {
            username: userInfo?.username,
            score: scores
        }

        setShowReviewList(isShowReviewList)
    }

    const checkBuy = (users: UserProfile | undefined, scoreneed: number) => {

        if (users) {
            if (users!.scores >= scoreneed) {
                Swal.fire({
                    title: `${t('exchangescoreviewdetail')}`,
                    text: `${t('exchangescoreviewdetailquestion', { score: users!.scores, scoreneed: scoreneed })}`,
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
                    text: `${t('earnmorereview', { scoremore: scoreneed - users!.scores })}`,
                    icon: "warning",
                })
            }
        }
    }

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setIsShow(true)
    }, [])


    return (
        <>
            {isAuthorized && isShow &&
                <>
                    {
                        <ReviewList
                            isShow={isShow}
                            showReviewList={showReviewList}
                            reviewlist={reviewinfo}
                            checkView={() => checkView(false)}
                            handleSetReviewID={setReviewID}
                            checkBuy={() => checkBuy(me, 50)} />

                    }

                </>
            }
        </>
    )
}

export default Review