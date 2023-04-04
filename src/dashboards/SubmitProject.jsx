/* eslint-disable react-hooks/exhaustive-deps */
import FormikControl from "@/components/Forms/Formik/FormikControl";
import LinkIcon from '@/components/vKnightHub/Control/LinkIcon';
import client from "@/data/client";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useState } from 'react';
import Swal from "sweetalert2";
import * as Yup from "yup";

const listprojectstatus = [
    {
        "id": "A",
        "caption": "Approved"
    },
    {
        "id": "F",
        "caption": "Future"
    },
    {
        "id": "O",
        "caption": "Ongoing"
    },
    {
        "id": "P",
        "caption": "In Progress"
    }
]

const SubmitProject = ({ listecosystem, projecttype }) => {
    const { t } = useTranslation('common');

    const getListProjectTypes = (list) => {
        const listProjectTypes = [];
        listProjectTypes.push({ "key": `${t('selectprojecttype')}`, "value": '' })
        list.forEach((key) => {
            const jobject = { "key": key.name, "value": key.typecd }
            listProjectTypes.push(jobject)
        })
        return listProjectTypes
    }

    const getListEcosystem = (list) => {
        const listECOSYSTEM = [];
        listECOSYSTEM.push({ "key": `${t('selectecosystem')}`, "value": '' })
        list.forEach((key) => {
            const jobject = { "key": key.econame, "value": key.shortname }
            listECOSYSTEM.push(jobject)
        })
        return listECOSYSTEM
    }

    const getListProjectStatus = (list) => {
        const listECOSYSTEM = [];
        listECOSYSTEM.push({ "key": `${t('selecteprojectstatus')}`, "value": '' })
        list.forEach((key) => {
            const jobject = { "key": key.caption, "value": key.id }
            listECOSYSTEM.push(jobject)
        })
        return listECOSYSTEM
    }

    const dropdownOptionsProjectTypes = getListProjectTypes(projecttype)
    const dropdownOptionsEcosystem = getListEcosystem(listecosystem)
    const dropdownOptionsProjectStatus = getListProjectStatus(listprojectstatus)

    const submitProject = [
        {
            "group": `${t('general')}`,
            "content": [
                {
                    "name": "procd",
                    "label": `${t('projectcode')}`,
                    "control": "input",
                    "type": "text",
                    "styles": "vertical",
                    "rows": 1,
                    "required": "Y",
                    "answer": []
                },
                {
                    "name": "protype",
                    "label": `${t('projecttype')}`,
                    "control": "select",
                    "type": "",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": [],
                    "options": dropdownOptionsProjectTypes
                },
                {
                    "name": "proname",
                    "label": `${t('proname')}`,
                    "control": "input",
                    "type": "text",
                    "styles": "vertical",
                    "rows": 1,
                    "required": "Y",
                    "answer": []
                },
                {
                    "name": "prosts",
                    "label": `${t('prosts')}`,
                    "control": "select",
                    "type": "",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": [],
                    "options": dropdownOptionsProjectStatus
                },
                {
                    "name": "proicon",
                    "label": `${t('prologo')}`,
                    "control": "file",
                    "type": "image",
                    "styles": "vertical",
                    "rows": 1,
                    "required": "Y",
                    "answer": []
                },
                {
                    "name": "ecosystem",
                    "label": `${t('ecosystem')}`,
                    "control": "select",
                    "type": "",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": [],
                    "options": dropdownOptionsEcosystem
                },
                {
                    "name": "teaminfo",
                    "label": `${t('coreteam')}`,
                    "control": "input",
                    "type": "text",
                    "styles": "vertical",
                    "rows": 8,
                    "required": "Y",
                    "answer": []
                },
                {
                    "name": "prodescr",
                    "label": `${t('prodesc')}`,
                    "control": "input",
                    "type": "texteditor",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": []
                }
            ]
        }
    ]



    const [project, setProject] = useState('')

    const initialValues = (listField) => {
        let obj = {}
        listField.forEach((question) => {
            question.content.forEach((controls) => {
                obj[controls.name] = ''
            })
        })
        return obj
    }


    const validationSchema = (listField) => {
        const shape = {};
        listField.forEach((question) => {
            question.content.forEach((controls) => {
                if (controls.required === 'Y') {
                    shape[controls.name] = Yup.string().required(`${t('projectinforequired')}`)
                }
            })
        })
        return Yup.object().shape(shape);
    }

    const { mutate: SubmitProject } = useMutation(client.project.submitproject, {
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
        const listanswer = [];

        const data = {};

        for (let i = 0; i < submitProject[0].content.length; i++) {
            data[submitProject[0].content[i].label] = values[submitProject[0].content[i].name];
        }

        const jlistData = Object.entries(data);

        jlistData.forEach(([key, value]) => {
            const jobject = { "field": key, "answer": value }
            listanswer.push(jobject)
        })

        const postdata = {
            procd: values.procd,
            proname: values.proname,
            prosts: values.prosts,
            protype: values.protype,
            ecosystem: values.ecosystem,
            prodescr: values.prodescr,
            proicon: values.proicon,
            teaminfo: values.teaminfo
        }
        Swal.fire({
            title: "Are you sure you want to submit?",
            html: "Submit a project",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.value) {
                SubmitProject(postdata);
                setProject(listanswer)
            }
        });
    }

    return (
        <div className="pt-3">

            {!project ?
                <div className="settings-form">
                    <Formik
                        initialValues={initialValues(submitProject)}
                        validationSchema={validationSchema(submitProject)}
                        onSubmit={(values) => { onSubmit(values) }}
                    >
                        {({
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-primary pb-5">{t('submitprojecttitle')}</h3>
                                {submitProject.map((groups, index) => (
                                    <div key={index}>
                                        {groups.group && <h4 className="text-primary pb-3 pt-3" >{groups.group}</h4>}
                                        {groups.content.map((controls, index) => (
                                            <div key={index} >
                                                <FormikControl
                                                    control={controls.control}
                                                    type={controls.type}
                                                    label={controls.label}
                                                    name={controls.name}
                                                    className="form-control"
                                                    rows={controls.rows}
                                                    onBlur={handleBlur}
                                                    options={controls.options}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <button className="btn btn-primary mt-5" type="submit">{t('submit')}</button>
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
                                        {t('projectinfo')}
                                    </h3>
                                    {project.map((value, index) => (
                                        <div className="row mb-2" key={index}>
                                            <div className="col-3">
                                                <h5 className="f-w-500">{value.field}<span className="pull-right">:</span></h5>
                                            </div>
                                            <div className="col-9">
                                                {value.answer.includes('data:image') ? <Image src={value.answer} alt="" className="mr-3 rounded" width={75} height={75} />
                                                    : <span>{value.answer}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <LinkIcon className="ai-icon" href="#" name={t('submitnewproject')} onClick={() => setProject('')} />
                </div>
            }

        </div>
    )
}

export default SubmitProject;