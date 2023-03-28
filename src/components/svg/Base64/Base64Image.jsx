import Image from 'next/image';
import React from 'react';

const Base64Image = (props) => {
    return (
        <Image src={`data:image/jpeg;base64,${props.data}`} alt="Base64Image" width={props.width} height={props.height}/>
    )
}
export default Base64Image;
