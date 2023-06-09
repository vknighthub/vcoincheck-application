import { useLogout, useMe } from '@/data/user';
import profile from '@/images/profile/profile.png';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown } from "react-bootstrap";

const UserProfile = ({ isAuthorized }) => {
    const { t } = useTranslation('common');
    const { me } = useMe();
    const { mutate: logout } = useLogout();


    return (
        <>
            {isAuthorized &&
            
                (
                    <Dropdown className="nav-item dropdown header-profile ">
                        <Dropdown.Toggle
                            as="a"
                            variant=""
                            className="nav-link i-false c-pointer"
                        >
                            <div className="header-info">
                                <span className="text-black">
                                    {t('hello')}, <strong>{me?.firstname}  {me?.lastname}</strong>
                                </span>
                                <p className="fs-12 mb-0">{me?.isadmin ? "Admin" : "Normal user"}</p>
                            </div><Image src={me?.avatar ? me.avatar : profile} width={57} height={57} alt="" className="img-fluid" priority/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="start">
                            
                            <Link href="/app-profile" className="dropdown-item ai-icon">
                                <svg
                                    id="icon-user1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-primary"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                </svg>
                                <span className="ml-2">{t('profile')}</span>
                            </Link>

                            <Link href="#" className="dropdown-item ai-icon" onClick={() => logout()}>
                                <svg
                                    id="icon-logout"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-danger"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1={21} y1={12} x2={9} y2={12} />
                                </svg>
                                <span className="ml-2"> {t('logout')} </span>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>
                )
            }
            {!isAuthorized &&
                (
                    <div className="nav-item dropdown">
                        <Link className="dropdown-item ai-icon" href="/page-login">
                            <svg
                                id="icon-logout"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-success"
                                width={18}
                                height={18}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1={21} y1={12} x2={9} y2={12} />
                            </svg>
                            <span className="ml-2"> {t('logins')} </span>
                        </Link>
                    </div>
                )
            }
        </>
    )
}

export default UserProfile