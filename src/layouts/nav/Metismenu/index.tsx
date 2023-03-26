import Link from 'next/link'
import React from 'react'
import MM from './MM'
import { useQuery } from '@tanstack/react-query'

type Props = {}

const Metismenu = (props: Props) => {
    
    return (
        <MM className="metismenu" id="menu">
            <li className="mm-active">
                <Link href={"/"}>
                    <i></i>
                    <span className="nav-text"></span>
                </Link>
                <ul>
                    <li >
                        <Link href={"/"}></Link>
                    </li>
                </ul>
            </li>
        </MM>
    )
}

export default Metismenu