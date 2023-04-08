import client from '@/data/client'
import { MenuResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MetisMenu from '@metismenu/react'


const Metismenu = () => {
    const { locale, pathname } = useRouter();

    const GetMenulist = (language: any) => {

        const { data, isLoading, error } = useQuery<MenuResponse, Error>(
            ['menu', language],
            () => client.system.menu({
                language: language
            }),
        )
        return {
            menulist: data?.result.data,
            isLoading,
            error
        }
    }

    const { menulist } = GetMenulist(locale)


    return (
        <>
            {menulist &&
                <MetisMenu>
                    {menulist?.map((menu, index) => (
                        <li className={`${pathname === menu.path ? "mm-active" : ""}`} key={index}>
                            <Link href={menu.path} className={menu.class} passHref>
                                <i className={menu.icon}></i>
                                <span className="nav-text">{menu.name}</span>
                            </Link>
                            {menu.menu_sub[0] &&
                                <ul>
                                    {menu.menu_sub?.map((content, index) => (
                                        <li key={index} >
                                            <Link className={`${pathname === content.path ? "mm-active" : ""}`} href={content.path}>
                                                {content.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </li>
                    ))}
                </MetisMenu>
            }
        </>
    )
}

export default Metismenu