import { ColumnFilter } from '@/components/table/FilteringTable/ColumnFilter';
import UK from '@/components/svg/Icon/UK';
import VN from '@/components/svg/Icon/VN';
import JP from '@/components/svg/Icon/JP';
import Link from "next/link";

export const COLUMNSFILTER = [
	{
		Header: '題名',
		Footer: '題名',
		accessor: 'title',
		Filter: ColumnFilter,
		Cell: (props) => (
			props.row.original.title
		)
	},
	{
		Header: '発行日',
		Footer: '発行日',
		accessor: 'pubdt',
		Filter: ColumnFilter,
	},
	{
		Header: () => (
			<>
				<div className="row">
					<div className="col-xs-12 ml-3">
						<UK width={26} height={26} display={true} />
					</div>
					<div className="col-xs-12 ml-3">
						<VN width={26} height={26} display={true} />
					</div>
					<div className="col-xs-12 ml-3" >
						<JP width={26} height={26} display={true} />
					</div>
				</div>

			</>
		),
		Footer: 'Admin',
		id: 'lang',
		Cell: (props) => {
			const value_en = props.row.original.keyen
			const value_vi = props.row.original.keyvn
			const value_jp = props.row.original.keyjp

			return (
				<>
					<div className="row">
						<div className="col-xs-12 ml-3">
						<Link href={`/post-library-language/library/${props.row.original.id}/language/${'en'}`}
								className={`btn ${value_en ? 'btn-success' : 'btn-danger'} shadow btn-xs sharp`}
							>
								<i className={`fa ${value_en ? 'fa-check' : 'fa-remove'} `}
									rel="tooltip"
									title={` ${value_en ? 'English: Completed' : 'Not Translated'} `}></i>
							</Link>
						</div>
						<div className="col-xs-12 ml-3">
						<Link href={`/post-library-language/library/${props.row.original.id}/language/${'vn'}`}
								className={`btn ${value_vi ? 'btn-success' : 'btn-danger'} shadow btn-xs sharp`}
							>
								<i className={`fa ${value_vi ? 'fa-check' : 'fa-remove'} `}
									rel="tooltip"
									title={` ${value_vi ? 'Vietnamese: Completed' : 'Not Translated'} `}></i>
							</Link>
						</div>

						<div className="col-xs-12 ml-3">
						<Link href={`/post-library-language/library/${props.row.original.id}/language/${'jp'}`}
								className={`btn ${value_jp ? 'btn-success' : 'btn-danger'} shadow btn-xs sharp`}
							>
								<i className={`fa ${value_jp ? 'fa-check' : 'fa-remove'} `}
									rel="tooltip"
									title={` ${value_jp ? 'Japanese: Completed' : 'Not Translated'} `}></i>
							</Link>
						</div>
					</div>

				</>
			)
		}
	}


]
