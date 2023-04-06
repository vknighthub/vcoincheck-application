import FilteringTable from "@/components/table/FilteringTable/FilteringTable";
import { COLUMNSREVIEWLIST as COLUMNS_EN } from './locale/en/Columns';
import { COLUMNSREVIEWLIST as COLUMNS_JP } from './locale/jp/Columns';
import { COLUMNSREVIEWLIST as COLUMNS_VN } from './locale/vn/Columns';

const ProjectReviewList = ({ reviewList, lang }) => {


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
								<FilteringTable colunmsfilter={columns(lang)} datafilter={reviewList} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProjectReviewList;
