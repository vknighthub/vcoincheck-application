export default function PrivateLayout({
    children,
}: React.PropsWithChildren<{}>) {
    return (
        <main>
            <div className="mh100vh">
                {children}
            </div>
        </main>
    )
}
