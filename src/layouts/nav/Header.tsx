
import React, { useEffect, useState } from 'react'
import Language from '@/components/Language/Language'
import Link from 'next/link'
import Profile from './Profile'

type Props = {}

const Header = (props: Props) => {
    const [darkMode, setDarkMode] = useState(false);

    if (typeof window !== 'undefined') {
        const body = document.querySelector("body");
        if (!darkMode) {
            body!.setAttribute("data-theme-version", "dark");
        } else {
            body!.setAttribute("data-theme-version", "light");
        }
    }

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            {mounted &&
                <div className="header">
                    <div className="header-content">
                        <nav className="navbar navbar-expand">
                            <div className="collapse navbar-collapse justify-content-between">
                                <div className="header-left">

                                </div>
                                <ul className="navbar-nav header-right">

                                    <div className="nav-item dropdown">
                                        <div className="input-group search-area d-inline-flex">
                                            <Language />
                                        </div>
                                    </div>
                                    <li className="nav-item dropdown notification_dropdown">
                                        <Link
                                            href={"#"}
                                            className={`nav-link bell dz-theme-mode ${darkMode ? "active" : ""
                                                }`}
                                        >
                                            <i
                                                className="far fa-sun i-dark"
                                                onClick={() => setDarkMode(!darkMode)}
                                            ></i>
                                            <i
                                                className="far fa-moon i-light"
                                                onClick={() => setDarkMode(!darkMode)}
                                            ></i>
                                        </Link>
                                    </li>
                                    <Profile />
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            }
        </>
    )
}

export default Header