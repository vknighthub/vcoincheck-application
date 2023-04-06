import { Formik } from "formik";
import FormikControl from "@/components/Forms/Formik/FormikControl";

const Advanced = ({ reviewinfo }) => {

    return (
        <div className="my-post-content pt-3">
            <div className="settings-form">
                <Formik
                >{() => (
                    <form >
                        {reviewinfo?.map((groups, index) => (
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
                                                answer={controls.choose}
                                                component="input"
                                                language={language}
                                                disabled />
                                            {controls.control === 'input' &&
                                                <FormikControl
                                                    control={controls.control}
                                                    type={controls.type}
                                                    label={controls.labels}
                                                    name={controls.name}
                                                    className="form-control"
                                                    rows={controls.rows}
                                                    disabled
                                                />}
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

export default Advanced;