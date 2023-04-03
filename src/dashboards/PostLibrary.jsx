import FormikControl from '@/components/Forms/Formik/FormikControl'
import client from '@/data/client'
import language from '@/utils/MOCK_LANGUAGE.json'
import { useMutation } from '@tanstack/react-query'
import { Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import slug from "slug"
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { useRouter } from 'next/router'

const PostLibrary = () => {

    const { t } = useTranslation('common')

    const router = useRouter()

    const initialValues = (listField) => {
        let obj = {}
        listField.forEach((controls) => {
            obj[controls.name] = controls.answer
        })
        return obj
    }

    const validationSchema = (listField) => {
        const shape = {};
        listField.forEach((controls) => {
            if (controls.required === 'Y') {
                shape[controls.name] = Yup.string().required(`${t('employeeinforequired')}`)
            }
        })
        return Yup.object().shape(shape);
    }

    const getListCategory = (list) => {
        const listCategory = [];
        listCategory.push({ "key": `${t('selectcategory')}`, "value": '' })
        list.forEach((key) => {
            const jobject = { "key": key.description, "value": key.librarycd }
            listCategory.push(jobject)
        })
        return listCategory
    }

    const listCategory = [
        {
            "librarycd": 1,
            "description": "Cardano Knowledge"
        },
        {
            "librarycd": 2,
            "description": "Blockchain Knowledge"
        },
        {
            "librarycd": 3,
            "description": "Cardano Dictionary"
        },
        {
            "librarycd": 4,
            "description": "Catalyst Knowledge"
        }
    ]



    const GetLanguageofpost = () => {
        const listLanguage = [];
        listLanguage.push({ "key": `${t('languageofpost')}`, "value": '' })
        language.forEach((key) => {
            const jobject = { "key": key.description, "value": key.languagecd }
            listLanguage.push(jobject)
        })
        return listLanguage

    }

    const dropdownOptionsCategory = getListCategory(listCategory)
    const dropdownOptionsLanguageofpost = GetLanguageofpost()

    const library_field = [
        {
            "name": "languageofpost",
            "label": `${t('languageofpost')}`,
            "control": "select",
            "type": "",
            "styles": "",
            "rows": 1,
            "required": "Y",
            "answer": [],
            "disabled": false,
            "classname": "form-control",
            "options": dropdownOptionsLanguageofpost
        },
        {
            "name": "category",
            "label": `${t('category')}`,
            "control": "select",
            "type": "",
            "styles": "",
            "rows": 1,
            "required": "Y",
            "answer": [],
            "disabled": false,
            "classname": "form-control",
            "options": dropdownOptionsCategory
        },
        {
            "name": "title",
            "label": `${t('title')}`,
            "control": "input",
            "type": "text",
            "styles": "",
            "rows": 1,
            "required": "Y",
            "answer": "",
            "disabled": false,
            "classname": "form-control"
        },
        {
            "name": "briefintro",
            "label": `${t('briefintro')}`,
            "control": "input",
            "type": "textarea",
            "styles": "",
            "rows": 8,
            "required": "Y",
            "answer": "",
            "disabled": false,
            "classname": "form-control"
        },
        {
            "name": "illustration",
            "label": `${t('illustration')}`,
            "control": "file",
            "type": "",
            "styles": "",
            "rows": 1,
            "required": "Y",
            "answer": "",
            "disabled": false,
            "classname": "form-control"
        },
        {
            "name": "content",
            "label": `${t('content')}`,
            "control": "input",
            "type": "texteditor",
            "styles": "",
            "rows": 1,
            "required": "Y",
            "answer": "",
            "disabled": false,
            "classname": "form-control"
        }
    ]

    const { mutate: PostLibrary } = useMutation(client.library.postlibrary, {
        onSuccess: (data) => {
            if (!data) {
                toast.error(<b>{t('text-wrong-user-name-and-pass')}</b>, {
                    className: '-mt-10 xs:mt-0',
                });
                return;
            } else {
                Swal.fire({
                    title: "Submitted!",
                    html: "Thank you! Your post has been received and will be reviewed.",
                    icon: "success"
                }).then((result) => {
                    if (result) {
                        router.reload()
                    }
                })
            }

        },
        onError: (errorAsUnknown) => {
            const error = errorAsUnknown
            Swal.fire({
                position: 'center',
                icon: 'error',
                color: 'red',
                title: 'Oops...',
                text: `${error?.response?.status === 400 ? error?.response?.data.messagedetail : 'Error'}`,
            })

        }
    });


    const onSubmit = (values) => {

        const postData = {
            title: values.title,
            name: slug(values.title, '-'),
            image: values.illustration,
            summary: values.briefintro,
            content: values.content,
            category: values.category,
            lang: values.languageofpost,
        }
        Swal.fire({
            icon: "question",
            title: `${t('questionsubmit')}`,
            html: `${t('submitapostlibrary')}`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${t('submit')}`,
            cancelButtonText: `${t('cancel')}`,
        }).then((result) => {
            if (result.value) {
                PostLibrary(postData)
            }
        });
    }


    return (
        <div className="pt-3">
            <div className="settings-form">
                <Formik
                    initialValues={initialValues(library_field)}
                    validationSchema={validationSchema(library_field)}
                    onSubmit={(values,) => { onSubmit(values) }}
                >
                    {({
                        handleSubmit,
                        errors
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-primary pb-5 text-center">{t('addblockchaintitle')}</h2>
                            {library_field.map((controls, index) => (
                                <div key={index}>
                                    <FormikControl
                                        control={controls.control}
                                        type={controls.type}
                                        label={controls.label}
                                        name={controls.name}
                                        className={controls.classname}
                                        rows={controls.rows}
                                        options={controls.options}
                                        required={controls.required}
                                        styles={undefined} />
                                </div>
                            ))}
                            <button className="btn btn-primary" type="submit">{t('submit')}</button>
                            <br />
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default PostLibrary