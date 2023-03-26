import Link from 'next/link';

const Medium = ({ tag }) => {
    return (
        <Link href="#" className={`btn-medium ml-2`}>
            <i className={`fa fa-refresh mr-2`}></i>
            {tag}
        </Link>
    );
}

export default Medium;
