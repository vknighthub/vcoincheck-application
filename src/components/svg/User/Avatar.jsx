import React from 'react';
import profile from '@/images/profile/profile.png'
import Image from 'next/image';

const Avatar = ({ src, width, height, ...rest }) => {
    return (
        <Image src={src ? src : profile} width={width} height={height} alt={profile} className="img-fluid rounded-circle" {...rest} ></Image>
    )
}
export default Avatar;
