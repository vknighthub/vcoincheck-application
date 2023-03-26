import { useRouter } from "next/router";
import GetContentLanguage from "@/utils/GetContentLanguage";
import { ProjectSvg } from "@/components/svg";
import ColorQuality from '@/utils/ColorQuality';

const HotProject = ({ project, index }) => {

    const router = useRouter();
    const {locale} = router;
    const handleRowClick = (row) => {
        router.push(`/ecom-project-detail/${row}`);
    }

    const quality = GetContentLanguage(locale, project.quality)
    const colorQuality = ColorQuality(locale, quality)

    return (
        <tr style={{ cursor: `pointer` }} onClick={() => handleRowClick(project.proname)}>
            <td>
                <span className="bgl-success p-3 d-inline-block">
                    {index + 1}
                </span>
            </td>
            <td>
                <div className="font-w600 wspace-no">
                    <span className="mr-1">
                        {<ProjectSvg image={project.proicon} width={24} height={24} />}
                    </span>
                    {project.proname}
                </div>
            </td>
            <td className="font-w500">{project.Ecosystem}</td>
            <td className="font-w600 ">{project.protype}</td>
            <td>
                {colorQuality}
            </td>
            <td>{project.totalreview}</td>
            <td>{project.modifydate}</td>
        </tr>
    );
};

export default HotProject;
