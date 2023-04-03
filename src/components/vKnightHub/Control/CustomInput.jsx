import { useTranslation } from "next-i18next";
import { useState } from "react";
import Avatar from './../../svg/User/Avatar';
import Editable from "./Editable";

const CustomInput = ({
    cancellor,
    parentId,
    value,
    edit,
    submit,
    handleCancel,
    fullname,
    avatar
}) => {
    const [text, setText] = useState(value === undefined ? "" : value);
    const { t } = useTranslation('common');

    const handleChange = (e) => {
        setText(e.target.value);
    };
    return (
        <form>
            <div className="form">
                <div className="row-comment">
                    {" "}
                    <Avatar src={avatar} width={40} style={{ height: 40 }} />
                    <div className="row-comment">
                        <div className="arrow-left"></div>
                        <div className="input-div">
                            <span className="input-name">{fullname}</span>
                            <Editable
                                value={text}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="btn-div">
                    <button
                        className="post-btn"
                        onClick={() => submit(cancellor, text, parentId, edit, setText)}
                        type="submit"
                        disabled={!text}
                    >
                        {t('comment')}
                    </button>
                    <button
                        className="cancel-btn"
                        onClick={() => handleCancel(cancellor, edit)}
                    >
                        {t('cancel')}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CustomInput;
