import { Formik } from "formik";
import FormikControl from "@/components/Forms/Formik/FormikControl";

const Overviews = ({reviewinfo}) => {

    return (
        <div className="pt-3">
            <div className="settings-form">
                <Formik>
                    {() => (
                        <form>
                            {reviewinfo?.map((groups, index) => (
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
                                                    key={controls.answers}
                                                    defaultValue={controls.answers}
                                                    language={language}
                                                    source={controls.answers}
                                                    disabled />
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
export default Overviews;