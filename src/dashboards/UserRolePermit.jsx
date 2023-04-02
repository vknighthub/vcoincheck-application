/* eslint-disable react-hooks/exhaustive-deps */
import { useRoleQuery, useSetUserMutation } from "@/data/user";
import { Field, Formik } from "formik";



const UserRolePermit = ({ rolelist, username, setApply }) => {

    const { userrole } = useRoleQuery()

    const { mutate: SetUseRole} = useSetUserMutation();

    const getListRole = (list) => {
        const listRole = [];
        list?.forEach((key) => {
            const jobject = { "key": key.rolename, "value": key.roleid + "" }
            listRole.push(jobject)
        })
        return listRole
    }

    const getListRoleFromUser = (list) => {
        const listRole = [];
        list?.forEach((key) => {
            listRole.push(key.roleid + "")
        })
        return listRole
    }

    const optionRole = getListRole(userrole)

    const onSubmit = (values) => {
        const postData =
        {
            username: username,
            roleid: values,
            description: "Set role for user" + username
        }
        SetUseRole(postData);
        setApply(true)
    }


    return (
        <>
            <Formik
                initialValues={{ userrole: getListRoleFromUser(rolelist) }}
                onSubmit={({ userrole }) => onSubmit(userrole)}
            >
                {({ handleChange, submitForm }) => (
                    <>
                        {optionRole.map((role, index) => (
                            <div className='form-check form-check-inline' key={index}>
                                <label className='form-check-label'>
                                    <Field
                                        type="checkbox"
                                        name="userrole"
                                        value={role.value}
                                        className="form-check-input"
                                        onChange={(e) => {
                                            handleChange(e);
                                            submitForm();
                                        }}
                                    />
                                    <label htmlFor={role.value}>{role.key}</label>
                                </label>
                            </div>

                        ))}
                    </>
                )}
            </Formik>


        </>
    );
};

export default UserRolePermit;
