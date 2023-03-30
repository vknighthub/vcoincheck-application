import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import FormikControl from '@/components/Forms/Formik/FormikControl';
import { useTranslation } from "next-i18next";
import client from "@/data/client";
import { useMutation } from "@tanstack/react-query";


const Overviews = ({ overquestion, projectid, actions }) => {
    const { t } = useTranslation()
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


    const validationSchema = (listQuestion) => {
        const shape = {};
        listQuestion.forEach((question) => {
            question.content.forEach((controls) => {
                if (controls.required === 'Y') {
                    shape[controls.name] = Yup.string().required("Please enter a answer for this question")
                }
            })
        })
        return Yup.object().shape(shape);
    }

    const handleSubmit = (values,) => {

        const listanswer = [];
        const jlistData = Object.entries(values);

        jlistData.forEach(([key, value]) => {
            const jobject = { "qstcd": key, "answer": value }
            listanswer.push(jobject)
        })

        const postData = {
            projectid: projectid,
            reviewid: "",
            reviewtype: "OR",
            reviewdata: {
                answerdata: listanswer
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
                console.log(postData);
                // AddReviewAction(postData);
            }
        });
    }

    return (
        <div className="pt-3">
            <div className="settings-form">
                <Formik
                    initialValues={initialValues(overquestion)}
                    validationSchema={validationSchema(overquestion)}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleBlur
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-primary pb-5">{t('overviewtitle')}</h3>
                            {overquestion.map((groups, index) => (
                                <div key={index}>
                                    {groups.group && <h4 className="text-primary pb-3 pt-3" >{groups.group}</h4>}
                                    {groups.content.map((controls, index) => {
                                        return (
                                            <div key={index} >
                                                <FormikControl
                                                    control={controls.control}
                                                    type={controls.types}
                                                    label={controls.labels}
                                                    name={controls.name}
                                                    className="form-control"
                                                    onBlur={handleBlur} />
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                            <button className="btn btn-primary mt-5" type="submit" >{t('submitreview')} </button>
                            <br />
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Overviews