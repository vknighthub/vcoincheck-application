import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import logoSmall from '@/images/logo192.png';
import logo from "@/images//logo128.svg";

const NavHeader = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <div className="nav-header">
            <Link href={"/"} className="brand-logo">
                {toggle ? <Image className="logo-abbr img-fluid" src={logoSmall} alt="" width={40} /> : <Image className="logo-abbr img-fluid" src={logo} alt="" />}
            </Link>
            <div className="nav-control" onClick={() => setToggle(!toggle)} >
                <div className={`hamburger ${toggle ? "is-active" : ""}`}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            </div>
        </div>
    )
}

export default NavHeader