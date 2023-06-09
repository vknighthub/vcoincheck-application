
import { useUpdateAvatarMutation } from '@/data/user';
import Image from 'next/image';

const FileDialogue = (props) => {

    const { mutate: ChangeAvatarUserAction } = useUpdateAvatarMutation()

    const reloadProfile = () => {
        const preview = document.getElementById('profile');
        const file = document.querySelector('input[name=browse]').files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            preview.src = reader.result;
            let postdata = {
                username: props.username,
                avatar: preview.src
            }
            ChangeAvatarUserAction(postdata);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <div className="image-upload">
                <Image id="profile" className="img-fluid rounded-circle" alt="profile" src={props.image} width={props.width} height={props.height} />
                <input id="browse" name="browse" type="file" accept="image/*" capture="camera" onChange={() => reloadProfile()} multiple />
            </div>

        </>
    )


}
export default FileDialogue