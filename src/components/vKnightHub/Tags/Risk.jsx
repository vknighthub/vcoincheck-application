import Link from 'next/link';

const Risk = ({ tag }) => {
    return (
        <Link href="#" className={`btn-hight-risk  ml-2`}>
            <i className={`fa fa-remove mr-2`}></i>
            {tag}
        </Link>
    );
}

export default Risk;
