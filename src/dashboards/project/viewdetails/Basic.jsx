import { Formik } from "formik";
import i18next from 'i18next';
import FormikControl from "@/components/Forms/Formik/FormikControl";


const Basic = ({ reviewinfo }) => {
    console.log(reviewinfo)
    return (
        <div className="my-post-content pt-3">
            <div className="settings-form">

                <Formik
                >
                    {() => (
                        <form>
                            {reviewinfo?.map((groups, index) => (
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
                                                    component="input"
                                                    answer={controls.choose}
                                                    language={language}
                                                    disabled />
                                                {controls.control === 'input' &&
                                                    <FormikControl
                                                        control={controls.control}
                                                        type={controls.types}
                                                        label={controls.labels}
                                                        name={controls.name}
                                                        className="form-control"
                                                        rows={controls.rows}
                                                        disabled />}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


export default Basic;
;