import client from '@/data/client'
import { MenuResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MM from './MM'

type Props = {}

const Metismenu = (props: Props) => {
    const { locale, pathname } = useRouter();

    const GetMenulist = () => {

        const { data, isLoading, error } = useQuery<MenuResponse, Error>(
            ['menu',locale],
            () => client.system.menu({
                language: locale
            }),
        )
        return {
            menulist: data?.result.data,
            isLoading,
            error,
        }
    }
    
    const { menulist } = GetMenulist()
    
    return (
        <>
                <MM className="metismenu" id="menu">
                    {menulist?.map((menu, index) => (
                        <li className={`${pathname === menu.path ? "mm-active" : ""}`} key={index}>
                            <Link href={menu.path} className={menu.class} passHref>
                                <i className={menu.icon}></i>
                                <span className="nav-text">{menu.name}</span>
                            </Link>

                            <ul>
                                {menu.menu_sub?.map((content, index) => (
                                    <li key={index} >
                                        <Link className={`${pathname === content.path ? "mm-active" : ""}`} href={content.path}>
                                            {content.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </li>
                    ))}
                </MM>
        </>
    )
}

export default Metismenu