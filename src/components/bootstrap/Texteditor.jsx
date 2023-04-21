import { Editor } from "@tinymce/tinymce-react";
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

const Texteditor = (props) => {
    const { label, name, contents, ...rest } = props
    return (
        <div className='form-group' key={name}>
            <label htmlFor={name}>{label}</label>
            <div className="summernote">
                <Field
                    id={name}
                    name={name}
                    render={({ form }) => {
                        return (
                            <>
                                <Editor
                                    apiKey="r6pbr9fmuyz5cmhqxhczpuiaq76xsuuq66an060n2frgjtnt"
                                    init={{
                                        height: 800,
                                        menubar: true,
                                        plugins: [
                                            'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                            'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                            'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | code |link | image | bold italic backcolor | alignleft aligncenter alignright alignjustify |  \n" +
                                            "bullist numlist outdent indent | removeformat | help | link image media table mergetags",
                                        content_style: 'body { color: #7e7e7e }'
                                    }}
                                    onEditorChange={(content) => {
                                        form.setFieldValue(name, content)
                                    }}
                                    initialValue={contents}
                                    name={name}
                                    {...rest}
                                />
                            </>
                        )
                    }}
                />
                <ErrorMessage component={TextError} name={name} />
            </div>
        </div>
    )
}
export default Texteditor