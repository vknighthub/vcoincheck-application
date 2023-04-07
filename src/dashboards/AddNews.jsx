import FormikControl from "@/components/Forms/Formik/FormikControl";
import { useAddNewsMutation } from "@/data/news";
import { Formik } from "formik";
import { useTranslation } from "next-i18next";
import slug from 'slug';
import Swal from "sweetalert2";
import * as Yup from "yup";

const AddNews = () => {

    const { t } = useTranslation('common');

    const overviewSchema = Yup.object().shape({
        title: Yup.string()
            .required(`${t('entertitle')}`),
        introduction: Yup.string()
            .required(`${t('enterintroduction')}`),
        illustration: Yup.string()
            .required(`${t('ennerillustration')}`),
        content: Yup.string()
            .required(`${t('entercontent')}`),
    });

    const listTypeOfNews = [
        {
            id: 'URL',
            name: 'Url'
        },
        {
            id: 'CONTENT',
            name: 'Content'
        }
    ]

    const getListTypeOfNews = (list) => {
        const listTYPEOFNEWS = [];
        list.forEach((key) => {
            const jobject = { "key": key.name, "value": key.id }
            listTYPEOFNEWS.push(jobject)
        })
        return listTYPEOFNEWS
    }

    const dropdownOptionsTypeOfNews = getListTypeOfNews(listTypeOfNews)

    const { mutate: PostNewsAction } = useAddNewsMutation()

    const onSubmit = (values) => {
        const postData = {
            title: values.title,
            name: slug(values.title, '-'),
            type: values.type,
            image: values.illustration,
            summary: values.introduction,
            content: values.content,
            url: values.url,
        }
        Swal.fire({
            icon: "question",
            title: "Are you sure you want to submit?",
            html: "Submit a post knowledge",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.value) {
                PostNewsAction(postData)
            }
        });
    }

    return (
        <div className="pt-3">
            <div className="settings-form">
                <Formik
                    initialValues={{
                        title: "",
                        introduction: "",
                        illustration: "",
                        content: "",
                    }}
                    validationSchema={overviewSchema}
                    onSubmit={(values) => { onSubmit(values) }}
                >
                    {({
                        handleBlur,
                        handleSubmit,
                        values
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-primary pb-5 text-center">{t('addnewstitle')}</h2>

                            <FormikControl
                                control='select'
                                type=''
                                label={t('typeofnews')}
                                name='type'
                                className="form-control"
                                rows=''
                                onBlur={handleBlur}
                                options={dropdownOptionsTypeOfNews}
                            />
                            <FormikControl
                                control='input'
                                type='text'
                                label={t('title')}
                                name='title'
                                className="form-control"
                                rows=''
                                onBlur={handleBlur}
                            />
                            <FormikControl
                                control='input'
                                type='text'
                                label={t('briefintro')}
                                name='introduction'
                                className="form-control"
                                rows=''
                                onBlur={handleBlur}
                            />
                            <FormikControl
                                control='file'
                                type=''
                                label={t('illustration')}
                                name='illustration'
                                className="form-control"
                                rows=''
                                onBlur={handleBlur}
                            />
                            {values.type === 'CONTENT' ?
                                <>
                                    <FormikControl
                                        control='input'
                                        type='texteditor'
                                        label={t('content')}
                                        name='content'
                                        className="form-control"
                                        rows=''
                                        onBlur={handleBlur}
                                    />
                                </>
                                :
                                <>
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        label={t('url')}
                                        name='title'
                                        className="form-control"
                                        rows=''
                                        onBlur={handleBlur}
                                    />
                                </>

                            }

                            <button className="btn btn-primary" type="submit">{t('submit')}</button>
                            <br />
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


export default AddNews