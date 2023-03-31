/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik";
import Swal from "sweetalert2";
import FormikControl from "@/components/Forms/Formik/FormikControl";
import { useTranslation } from "next-i18next";
import { useMutation } from "@tanstack/react-query";
import client from "@/data/client";

const Basic = ({ basicquestion, projectid, actions }) => {

    const { t } = useTranslation('common');

    const { mutate: AddReviewAction } = useMutation(client.review.add, {
        onSuccess: () => {
            actions(true);
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

    const onSubmit = (listdata) => {

        const listanswer = [];
        const jlistData = Object.entries(listdata);

        jlistData.forEach(([key, value]) => {
            if (value === "") {
                value = "0";
            }
            const jobject = { "qstcd": key, "answer": value }
            listanswer.push(jobject)
        })

        const postData = {
            projectid: projectid,
            reviewtype: "BR",
            reviewdata: {
                answerdata: listanswer,
            }
        }
        Swal.fire({
            title: `${t('questionsubmit')}`,
            html: `${t('questionsubmitdetail')}`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${t('submitreview')}`,
            cancelButtonText: `${t('cancel')}`,
        }).then((result) => {
            if (result.value) {
                AddReviewAction(postData);
            }
        });

    }

    return (
        <div className="my-post-content pt-3">
            <div className="settings-form">

                <Formik
                    initialValues={initialValues(basicquestion)}
                    onSubmit={(values) => { onSubmit(values) }}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-primary pb-5">{t('overviewtitle')}</h3>
                            {basicquestion.map((groups, index) => (
                                <div key={index}>
                                    <h4 className="text-primary pb-3">{groups.group}</h4>
                                    {groups.content.map((controls) => {
                                        return (
                                            <div key={index}>
                                                <FormikControl
                                                    control={controls.control}
                                                    styles={controls.styles}
                                                    label={controls.labels}
                                                    name={controls.name}
                                                    options={controls.answers}
                                                    component="input" />
                                                {controls.control === 'input' &&
                                                    <FormikControl
                                                        control={controls.control}
                                                        type={controls.types}
                                                        label={controls.labels}
                                                        name={controls.name}
                                                        className="form-control"
                                                        rows={controls.rows} />}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                            <button className="btn btn-primary" type="submit">{t('submitreview')}</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Basic;
