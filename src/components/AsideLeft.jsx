'use client';

import login from "@/images/bg-login2.png";
import logo from '@/images/Logo450x450.svg';
import { useTranslation } from 'next-i18next'
import Image from 'next/image';
import Link from "next/link";

const Asideleft = () => {
    const { t } = useTranslation('common');
    return (
        <div className="login-aside-left" style={{ backgroundImage: "url(" + login.src + ")" }}>
            <Link href={"#"} className="login-logo">
                <Image src={logo} alt="" className="mr-2 img-fluid" />
            </Link>
            <div className="login-description">
                <div className="mt-5">
                    <Link href={"#"} className="text-secondary mr-4">{t('privacy')}</Link>
                    <Link href={"#"} className="text-secondary mr-4">{t('contact')}</Link>
                    <Link href={"https://www.vknight.io/"} className="text-secondary">© 2021 vKnightHub</Link>
                </div>
            </div>
        </div>
    );
}

export default Asideleft;
