import Image from "next/image"

const ProjectSvg = ({image,width,height,...rest}) => {
    return (
        image && <Image className="img-fluid" width={width} height={height} src={image} {...rest} alt=""/>
    )
}
export default ProjectSvg