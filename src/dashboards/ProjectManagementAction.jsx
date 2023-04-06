
import ProjectSvg from '@/components/svg/Project/ProjectSvg';
import { FetchEcosystem, FetchProjectType, useApproveProjectMutation, useRemoveProjectMutation, useSetFeaturedProjectMutation } from '@/data/project';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Tab } from "react-bootstrap";
import Swal from 'sweetalert2';
import VerifyProject from './VerifyProject';



const ProjectManagementAction = ({ projectDetail }) => {

	const { t } = useTranslation("common");

	const [editModal, setEditModal] = useState(false);

	const project = projectDetail.project_info

	const { listecosystem } = FetchEcosystem()
	const { projecttype } = FetchProjectType()

	const { mutate: ApproveProject } = useApproveProjectMutation();

	const { mutate: RemoveProject } = useRemoveProjectMutation();

	const { mutate: SetFeaturedProject } = useSetFeaturedProjectMutation();

	

	const handleApproveProject = (project) => {
		const postdata = {
			procd: project.procd
		}
		Swal.fire({
			title: "Are you sure you want to approve this project?",
			html: "Approve a project",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `${t('submit')}`,
			cancelButtonText: `${t('cancel')}`,
		}).then((result) => {
			if (result.value) {
				ApproveProject(postdata);
			}
		});
	}

	const handleRemoveProject = (project) => {
		const postdata = {
			procd: project.procd
		}
		Swal.fire({
			title: "Are you sure you want to remove this project?",
			html: "Remove a project",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `${t('submit')}`,
			cancelButtonText: `${t('cancel')}`,
		}).then((result) => {
			if (result.value) {
				RemoveProject(postdata);
			}
		});
	}

	const setFeatutedProject = (projectcd) => {
		const postdata = {
			procd: projectcd
		}
		Swal.fire({
			title: `${t('areyousuresetfeatured')}`,
			html: `${t('featured')}`,
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `${t('submit')}`,
			cancelButtonText: `${t('cancel')}`,
		}).then((result) => {
			if (result.value) {
				SetFeaturedProject(postdata);
			}
		});
	}

	return (
		<>
			{project &&
				<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
									{/* Tab panes */}
									<Tab.Container defaultActiveKey="first">
										<Tab.Content>
											<Tab.Pane eventKey="first">
												<ProjectSvg image={project.proicon} width={400} height={400} />
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>
								</div>
								{/*Tab slider End*/}

								<div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
									<div className="product-detail-content">
										{/*Product details*/}
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
												<p>{t('projectscore')}: <span className="item ml-3">{project.scores}</span>{" "}</p>
												<p>{t('projectquality')}: <span className="item ml-3">{project.scores}</span>{" "}</p>
												<p>{t('noofreviewed')}: <span className="item ml-3">{project.totalreview}</span>{" "}</p>
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

					{editModal ? <VerifyProject projecttype={projecttype} ecosystem={listecosystem} projectinfo={project} />
						:
						<>
							{project.proaprstscd === 'P' && <button className="btn btn-success" type="submit" onClick={() => handleApproveProject(project)}>{t('approve')}</button>}
							<button name="edit" className="btn btn-primary ml-2" type="submit" onClick={() => setEditModal(true)}>{t('edit')}</button>
							<button name="setfeatured" className="btn btn-success ml-2" type="submit" onClick={() => setFeatutedProject(project.procd)}>{t('featured')}</button>

							{project.proaprstscd === 'P' && <button name="remove" className="btn btn-danger ml-2" type="submit" onClick={() => handleRemoveProject(project)}>{t('remove')}</button>}
						</>
					}

				</div>
			}
		</>
	);
};

export default ProjectManagementAction;
