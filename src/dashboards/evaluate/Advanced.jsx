/* eslint-disable react-hooks/exhaustive-deps */
import FormikControl from "@/components/Forms/Formik/FormikControl";
import { Formik } from "formik";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from 'react';
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import client from "@/data/client";

const Advanced = ({ advancequestion, projectid, actions }) => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [reviewResponses, setReviewResponses] = useState({})
    const { t } = useTranslation('common');

    const initialValues = (listQuestion) => {
        let obj = {}
        listQuestion.forEach((question) => {
            question.content.forEach((controls) => {
                obj[controls.name] = ''
            })
        })
        return obj
    }

    const { mutate: AddReviewAction } = useMutation(client.review.add, {
        onSuccess: (data) => {
            setShowSuccess(true)
            setReviewResponses(data.result.data)
        },
        onError: (errorAsUnknown) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                color: 'red',
                title: 'Oops...',
                text: `${errorAsUnknown}`,
            })

        }
    });

    const onSubmit = (listdata) => {

        const listanswer = [];
        const jlistData = Object.entries(listdata);

        jlistData.forEach(([key, value]) => {
            if (value === "") {
                value = "a";
            }
            const jobject = { "qstcd": key, "answer": value }
            listanswer.push(jobject)
        })

        const postdata = {
            projectid: projectid,
            reviewtype: "AR",
            reviewdata: {
                answerdata: listanswer,
            }
        }
        Swal.fire({
            title: `${t('questionsubmit')}`,
            html: `${t('submitadvancereview')}`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${t('submitreview')}`,
            cancelButtonText: `${t('cancel')}`,
        }).then((result) => {
            if (result.value) {
                AddReviewAction(postdata);
            }
        });

    }

    const handleNextStep = () => {
        actions()
    }

    return (
        <div className="my-post-content pt-3">
            {!showSuccess ?
                <div className="settings-form">
                    <Formik
                        initialValues={initialValues(advancequestion)}
                        onSubmit={(values,) => { onSubmit(values) }}
                    >{({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-primary pb-5">{t('overviewtitle')}</h3>
                            {advancequestion.map((groups, index) => (
                                <div key={index}>
                                    {groups.group && <h4 className="text-primary pb-3">{groups.group}</h4>}
                                    {groups.content.map((controls, index) => {
                                        return (
                                            <div key={index}>
                                                <FormikControl
                                                    control={controls.control}
                                                    styles={controls.styles}
                                                    label={controls.labels}
                                                    name={controls.name}
                                                    options={controls.answers}
                                                    component="input" />
                                                {controls.controls === 'input' && <FormikControl control={controls.controls} type={controls.type} label={controls.labels} name={controls.name} className="form-control" rows={controls.rows} />}
                                            </div>)
                                    })}
                                </div>
                            ))}
                            <button className="btn btn-primary" type="submit">{t('submitreview')}</button>
                        </form>
                    )}
                    </Formik>
                </div>
                :
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="post-details">
                                <p className="mb-2 fs-24 text-success text-center">
                                    {t('submitprojectsuccesstitle')}
                                </p>
                                <div className="profile-personal-info mt-5">
                                    <h3 className="text-primary mb-4 text-center">
                                        {t('reviewinfo')}
                                    </h3>
                                    <div className="row mb-2" >
                                        <div className="col-3">
                                            <h5 className="f-w-500">{t('estimatereviewscore')} <span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9">
                                            {reviewResponses.review_score}
                                        </div>
                                    </div>
                                    <div className="row mb-2" >
                                        <div className="col-3">
                                            <h5 className="f-w-500">{t('estimateprojectscore')} <span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9">
                                            {reviewResponses.project_score}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link
                        className="btn btn-success ml-3"
                        href="#"
                        onClick={() => handleNextStep()}
                    >
                        {t('Next to Expert')}?
                    </Link>
                </div>
            }
        </div >

    )
}

export default Advanced;