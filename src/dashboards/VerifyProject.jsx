import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import FormikControl from "@/components/Forms/Formik/FormikControl";
import { useTranslation } from "next-i18next";
import { useEditProjectMutation } from "@/data/project";

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

const VerifyProject = ({ projectinfo, ecosystem, projecttype }) => {

    const { t } = useTranslation('common');

    const projectTypeList = projecttype

    const getListProjectTypes = (list) => {
        const listProjectTypes = [];
        var jobject = {}
        list.forEach((key) => {
            jobject = { "key": key.name, "value": key.typecd }
            listProjectTypes.push(jobject)
        })
        return listProjectTypes
    }
    const getListEcosystem = (list) => {
        const listECOSYSTEM = [];
        var jobject = {}
        list.forEach((key) => {
            jobject = { "key": key.econame, "value": key.shortname }
            listECOSYSTEM.push(jobject)
        })
        return listECOSYSTEM
    }
    const getListProjectStatus = (list) => {
        const listPROJECTSTS = [];
        list.forEach((key) => {
            const jobject = { "key": key.caption, "value": key.id }
            listPROJECTSTS.push(jobject)
        })
        return listPROJECTSTS
    }

    const dropdownOptionsProjectTypes = getListProjectTypes(projectTypeList)
    const dropdownOptionsEcosystem = getListEcosystem(ecosystem)
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
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": projectinfo.procd,
                    "disabled": true,
                },
                {
                    "name": "protype",
                    "label": `${t('projecttype')}`,
                    "control": "select",
                    "type": "",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": projectinfo.protypecd,
                    "options": dropdownOptionsProjectTypes,
                    "disabled": false
                },
                {
                    "name": "proname",
                    "label": `${t('proname')}`,
                    "control": "input",
                    "type": "text",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": projectinfo.proname,
                    "disabled": false,
                },
                {
                    "name": "prosts",
                    "label": `${t('prosts')}`,
                    "control": "select",
                    "type": "",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": projectinfo.prostscd,
                    "options": dropdownOptionsProjectStatus
                },
                {
                    "name": "proicon",
                    "label": `${t('prologo')}`,
                    "control": "file",
                    "type": "image",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": projectinfo.proicon,
                    "disabled": false,
                },
                {
                    "name": "ecosystem",
                    "label": `${t('ecosystem')}`,
                    "control": "select",
                    "type": "",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": projectinfo.Ecosystemcd,
                    "options": dropdownOptionsEcosystem,
                    "disabled": false,
                },
                {
                    "name": "teaminfo",
                    "label": `${t('coreteam')}`,
                    "control": "input",
                    "type": "text",
                    "styles": "",
                    "rows": 8,
                    "required": "Y",
                    "answer": projectinfo.teaminfo,
                    "disabled": false,
                },
                {
                    "name": "prodescr",
                    "label": `${t('prodesc')}`,
                    "control": "input",
                    "type": "texteditor",
                    "styles": "",
                    "rows": 1,
                    "required": "Y",
                    "answer": projectinfo.prodescr,
                    "disabled": false,
                }
            ]
        }
    ]

    const initialValues = (listField) => {
        let obj = {}
        listField.forEach((question) => {
            question.content.forEach((controls) => {
                obj[controls.name] = controls.answer
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

    const { mutate: EditProject} = useEditProjectMutation();


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
            title: "Are you sure you want to modify this project?",
            html: "Modify a project",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.value) {
                EditProject(postdata)
            }
        });
    }
    return (
        <div className="pt-3">

            {projectinfo &&
                <div className="settings-form">
                    <Formik
                        initialValues={initialValues(submitProject)}
                        validationSchema={validationSchema(submitProject)}
                        onSubmit={(values) => { onSubmit(values) }}
                    >
                        {({
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
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
                                                    options={controls.options}
                                                    source={controls.answer}
                                                    disabled={controls.disabled}
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
            }
        </div >
    )
}

export default VerifyProject;