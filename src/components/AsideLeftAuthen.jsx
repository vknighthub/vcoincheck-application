import login from "@/images/bg-login2.png";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

const AsideLeftAuthen = () => {
    const { t } = useTranslation('common');
    return (
        <div className="login-aside-left" style={{ backgroundImage: "url(" + login.src + ")" }}>
            <Link href={"#"} className="login-logo">
                <Image src={'https://api.vcoincheck.io/user/image/scan.gif'} alt="" className="mr-2 img-fluid" width={535} height={400}/>
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

export default AsideLeftAuthen;
