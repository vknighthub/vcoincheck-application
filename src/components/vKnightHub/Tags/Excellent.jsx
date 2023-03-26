import Link from 'next/link';
import React from 'react';

const Excellent = ({ tag }) => {
    return (
        <Link href="#" className={`btn-tag ml-2`}>
            <i className={`fa fa-star mr-2`}></i>
            {tag}
        </Link>
    );
}

export default Excellent;
