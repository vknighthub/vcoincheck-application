import Link from "next/link";


const BackTo = (props) => {
    const { className, name, to, ...rest } = props;
    return (
        <Link className={className} href={props.to} {...rest}>{name}</Link>
    );
};


export default BackTo;
