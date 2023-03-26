import Link from 'next/link';
import React from 'react';

const Good = ({ tag }) => {
    return (
        <Link href="#" className={`btn-good-tag ml-2`}>
            <i className={`fa fa-thumbs-up mr-2`}></i>
            {tag}
        </Link>
    );
}

export default Good;
