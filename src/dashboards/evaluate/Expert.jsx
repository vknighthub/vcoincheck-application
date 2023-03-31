import { Formik } from 'formik';
import { useState } from 'react';
import Swal from 'sweetalert2';
import FormikControl from '@/components/Forms/Formik/FormikControl';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import client from '@/data/client';
import { useTranslation } from 'next-i18next';


const Expert = ({ expertquestion, projectid, actions }) => {

    const { t } = useTranslation('common');

    const [showSuccess, setShowSuccess] = useState(false)
    const [reviewResponses, setReviewResponses] = useState({})


    const { mutate: AddReviewAction } = useMutation(client.review.add, {
        onSuccess: (data) => {
            setShowSuccess(true);
            setReviewResponses(data.result.data)
            actions()
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

    const initialValues = (listQuestion) => {
        let obj = {}
        listQuestion.forEach((question) => {
            question.content.forEach((controls) => {
                obj[controls.name] = ''
            })
        })
        return obj
    }

    const removeByItem = (arr, id) => {
        const requiredIndex = arr.findIndex(el => {
            return el.qstcd === String(id);
        });
        if (requiredIndex === -1) {
            return false;
        };
        return !!arr.splice(requiredIndex, 1);
    };

    const onSubmit = (values) => {
        const listanswer = [];
        const jlistData = Object.entries(values);
        var jobject
        jlistData.forEach(([key, value]) => {
            jobject = { "qstcd": key, "answer": value }
            listanswer.push(jobject)
        })
        removeByItem(listanswer, 'totalscore')

        const postData = {
            projectid: projectid,
            reviewtype: "ER",
            reviewdata: {
                answerdata: listanswer
            },
            totalscore: values.totalscore
        }
        Swal.fire({
            title: `${t('questionsubmit')}`,
            html: `${t('submitadvancereview')}`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${t('completereview')}`,
            cancelButtonText: `${t('cancel')}`,
        }).then((result) => {
            if (result.value) {
                AddReviewAction(postData)
            }
        });

    }

    return (
        <div className="my-post-content pt-3">
            <div className="settings-form">
                <div className="form-group">
                    <div className="h-80">
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">{t('overviewtitle')}</h4>
                                    </div>
                                    <div className="card-body">
                                        {!showSuccess ?
                                            <div className="settings-form">
                                                <Formik
                                                    initialValues={initialValues(expertquestion)}
                                                    onSubmit={(values) => { onSubmit(values) }}
                                                >
                                                    {({
                                                        handleBlur,
                                                        handleChange,
                                                        handleSubmit
                                                    }) => (
                                                        <form onSubmit={handleSubmit}>
                                                            {expertquestion.map((groups, index) => (
                                                                <div key={index}>
                                                                    {groups.group && <h4 className="text-primary pb-3 pt-3" >{groups.group}</h4>}
                                                                    {groups.content.map((controls, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <FormikControl
                                                                                    control={controls.control}
                                                                                    type={controls.types}
                                                                                    label={controls.labels}
                                                                                    name={controls.name}
                                                                                    rows={controls.rows}
                                                                                    className="form-control"
                                                                                    onBlur={handleBlur} />
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            ))}
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label={t('totalscore')}
                                                                name="totalscore"
                                                                className="form-control"
                                                                defaultValue="0"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange} />
                                                            <button className="btn btn-primary" type="submit">{t('submitreview')}</button>
                                                            <br />
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
                                                    href="/project"
                                                >
                                                    {t('backtolistproject')}?
                                                </Link>
                                            </div>
                                        }
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


export default Expert;