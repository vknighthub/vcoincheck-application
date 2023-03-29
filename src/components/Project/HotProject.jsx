import { ProjectSvg } from "@/components/svg";
import ColorQuality from '@/utils/ColorQuality';
import { useRouter } from "next/router";

const HotProject = ({ project, index }) => {

    const router = useRouter();
    const handleRowClick = (row) => {
        router.push(`/ecom-project-detail/${row}`);
    }

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
                {ColorQuality(project.quality)}
            </td>
            <td>{project.totalreview}</td>
            <td>{project.modifydate}</td>
        </tr>
    );
};

export default HotProject;
