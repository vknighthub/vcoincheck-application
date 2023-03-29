import { ReviewInfo } from '@/types'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import { Card, Col, Table } from 'react-bootstrap'
import { UserProfile } from '../types/index';

type Props = {
    reviewlist: ReviewInfo[]
    checkView: () => void
    handleSetReviewID: React.Dispatch<React.SetStateAction<string>>
    checkBuy: () => void
}

const ReviewList = ({ reviewlist, checkView, handleSetReviewID, checkBuy }: Props) => {
    const { t } = useTranslation()

    const handleReviewClick = (rowid: string) => {
        handleSetReviewID(rowid)
    }

    return (
        <>
            <Col lg={12}>
                <Card>
                    <Card.Header>
                        <Card.Title className="fs-26 text-primary" >{t('reviewlist')}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>

                                <tr>
                                    <th className="width80">
                                        <strong>#</strong>
                                    </th>
                                    <th>
                                        <strong>{t('reviewid')}</strong>
                                    </th>
                                    <th>
                                        <strong>{t('reviewguy')}</strong>
                                    </th>
                                    <th>
                                        <strong>{t('reviewdate')}</strong>
                                    </th>
                                    <th>
                                        <strong>{t('projectscore')}</strong>
                                    </th>
                                    <th>
                                        <strong><i className={`fa fa-thumbs-up fs-18 mr-3 text-success`}> Like</i></strong>
                                    </th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {reviewlist.map((review, index) => (
                                    <tr key={index}>
                                        <td>
                                            <strong>{index + 1}</strong>
                                        </td>
                                        <td>{review.reviewid}</td>
                                        <td>{review.username}</td>
                                        <td>{review.reviewdate}</td>
                                        <td>{review.scores}</td>
                                        <td>{review.likes}</td>
                                        <td>
                                            <Link onClick={() => checkView()}
                                                href="#"
                                                className="btn btn-success shadow btn-xs sharp mr-2"
                                            >
                                                <i className="fa fa-book"></i>
                                            </Link>
                                            <Link onClick={() => { checkBuy(); handleReviewClick(review.reviewid) }}
                                                href="#"
                                                className="btn btn-primary shadow btn-xs sharp"
                                            >
                                                <i className="fa fa-exchange-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default ReviewList