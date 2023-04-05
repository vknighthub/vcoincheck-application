import FilteringTable from "@/components/table/FilteringTable/FilteringTable";
import { COLUMNSFILTERPROJECT as COLUMNS_EN } from './project/locale/en/Columns';
import { COLUMNSFILTERPROJECT as COLUMNS_JP } from './project/locale/jp/Columns';
import { COLUMNSFILTERPROJECT as COLUMNS_VN } from './project/locale/vn/Columns';

const ProjectManagement = ({ projects, lang }) => {

	const columns = (language) => {
		switch (language) {
			case 'en': return COLUMNS_EN
			case 'vn': return COLUMNS_VN
			case 'jp': return COLUMNS_JP
			default: return COLUMNS_EN
		}
	}

	return (
		<>
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
							<div className="card-body tab-content p-0">
								<FilteringTable colunmsfilter={columns(lang)} datafilter={projects} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default ProjectManagement
