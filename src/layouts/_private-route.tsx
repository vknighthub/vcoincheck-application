import AsideLeft from '@/components/AsideLeft'
import loginbg from "@/images/bg-login.jpg";


export default function PrivateLayout({
    children,
}: React.PropsWithChildren<{}>) {
    return (
        <main>
            <div className="mh100vh">
                <div className="login-main-page" style={{ backgroundImage: "url(" + loginbg.src + ")" }}>
                    <div className="login-wrapper">
                        <AsideLeft />
                        {children}
                    </div>
                </div>

            </div>
        </main>
    )
}
