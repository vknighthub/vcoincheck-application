
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { languages } from './../../config/localization/language';
import { JP, UK, VN } from "./../svg";


const Language = () => {
    const router = useRouter();
    const {locale} = router;
    const [country, setCountry] = useState(locale)

    const handleChangeLanguage = (lng) => {
        switch (lng) {
            case "en":
                setCountry('en')
                break;
            case "vn":
                setCountry('vn')
                break;
            case "jp":
                setCountry('jp')
                break;
            default:
                setCountry('en')
        }
        router.push(router.pathname, router.asPath, {
            locale: lng,
            scroll: false
        })
    }

    const getIcon = (code, display) => {
        switch (code) {
            case 'en':
                return <UK width={26} height={26} display={display} />
            case 'vn':
                return <VN width={26} height={26} display={display} />
            case 'jp':
                return <JP width={26} height={26} display={display} />
            default:
                break;
        }
    }

    return (

        <Dropdown className="nav-item dropdown notification_dropdown ml-sm-3">
            <Dropdown.Toggle
                variant=""
                className="nav-link ai-icon i-false"
                id="language"
            >
                {languages.map(({ country_code }, index) => (
                    <Link href={"#"} key={index} locale={country_code}>
                        {getIcon(country_code, country_code === country ? "true" : "none")}
                    </Link>
                ))}

            </Dropdown.Toggle>
            <Dropdown.Menu className="">
                <PerfectScrollbar className="widget-media ps">
                    {languages.map(({ code, name, country_code }) => (
                        <Dropdown.Item
                            className="dropdown-item"
                            disabled={locale === country_code || country_code === country} key={country_code}
                            onClick={() => handleChangeLanguage(code)}

                        >
                            {getIcon(country_code)}
                            <span className="ml-2">{name}</span>
                        </Dropdown.Item>
                    ))}
                </PerfectScrollbar>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Language;
