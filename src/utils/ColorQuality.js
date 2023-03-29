import Excellent from '@/components/vKnightHub/Tags/Excellent';
import Good from "@/components/vKnightHub/Tags/Good";
import Medium from "@/components/vKnightHub/Tags/Medium";
import Risk from "@/components/vKnightHub/Tags/Risk";
import Warning from "@/components/vKnightHub/Tags/Warning";

const ColorQuality = (qualityProject) => {
    let color = ''
    switch (qualityProject.key) {
        case 'H':
            color = <Risk tag={qualityProject.text} />
            break;
        case 'R':
            color = <Warning tag={qualityProject.text} />
            break;
        case 'M':
            color = <Medium tag={qualityProject.text} />
            break;
        case 'G':
            color = <Good tag={qualityProject.text} />
            break;
        case 'E':
            color = <Excellent tag={qualityProject.text} />
            break;
        default: color = <Excellent tag={qualityProject.text} />
    }

    return color
}
export default ColorQuality;