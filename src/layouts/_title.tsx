import Link from "next/link";
import React from "react";

type PageProps = {
    pageHeading: string;
    motherMenu: string;
    activeMenu: string;
    path: string;
    activeDisplay: string;
}

const PageTitle = ({ pageHeading, motherMenu, activeMenu, path, activeDisplay }: PageProps) => {

    return (
        <div className="page-titles">
            <h4>{activeMenu}{pageHeading}</h4>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href={`/${path}`}>{motherMenu}</Link>
                </li>
                <li className="breadcrumb-item active">
                    <Link href="#">{activeDisplay}</Link>
                </li>
            </ol>
        </div>
    );
};

export default PageTitle;
