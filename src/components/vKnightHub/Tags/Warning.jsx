import Link from 'next/link';

const Warning = ({ tag }) => {
    return (
        <Link href="#" className={`btn-warning-tag ml-2`}>
            <i className={`fa fa-exclamation-triangle mr-2`}></i>
            {tag}
        </Link>
    );
}

export default Warning;
