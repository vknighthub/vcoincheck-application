
import { ProjectSvg } from '@/components/svg';
import { ProjectInfo } from '@/types';
import ColorQuality from '@/utils/ColorQuality';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
import { Tab } from 'react-bootstrap';

type PageProps = {
    project: ProjectInfo,
}

const ProjectDescription = ({ project }: PageProps) => {
    const { t } = useTranslation()

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                            <Tab.Container defaultActiveKey="first">
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <ProjectSvg image={project.proicon} width={400} height={400} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                        <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                            <div className="product-detail-content">
                                <div className="new-arrival-content pr row">
                                    <div className="col-xl-6 col-lg-6  col-md-6 col-xxl-6 ">
                                        <h1>{project.proname}</h1>
                                        <p>{t('projectcode')}: <span className="item ml-3">{project.procd}</span>{" "}</p>
                                        <p>{t('categories')} : <span className="item ml-3">{project.protype}</span></p>
                                        <p>
                                            {t('ecosystem')}:&nbsp;&nbsp;
                                            <span className="badge badge-success light mr-1">{project.Ecosystem}</span>
                                        </p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6  col-md-6 col-xxl-6 ">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6  col-md-6 col-xxl-6 ">
                                                <p>{t('projectscore')}: <span className="item ml-3">{project.scores}</span>{" "}</p>
                                                <p>{t('projectquality')}:
                                                    {ColorQuality(project.quality)}
                                                </p>

                                                <p>{t('noofreviewed')}: <span className="item ml-3">{project.totalreview}</span>{" "}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <span className="text-content ml-3">
                                        {parse(project.prodescr)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDescription