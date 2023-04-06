import { ProjectSvg } from '@/components/svg';
import { ColumnFilter } from '@/components/table/FilteringTable/ColumnFilter';
import ColorQuality from '@/utils/ColorQuality';
import Link from 'next/link';

const getStatusType = (status) => {
	switch (status) {
		case 'P':
			return <i className="fa fa-circle text-warning mr-1"> Pending to Approve</i>
		case 'A':
			return <i className="fa fa-circle text-success mr-1"> Approved</i>
		default: return ''
	}
}


export const COLUMNSFILTER = [
	{
		Header: 'Icon',
		Footer: 'Icon',
		Cell: (props) => (<Link href={`/ecom-project-detail/${props.row.original.proname}`}><ProjectSvg image={props.row.original.proicon} width={24} height={24} /></Link>),
	},
	{
		Header: 'Name',
		Footer: 'Name',
		accessor: 'proname',
		Filter: ColumnFilter,
		Cell: (props) => (
			<Link href={`/ecom-project-detail/${props.row.original.proname}`} className="text-success">
				{props.row.original.proname}
			</Link>
		),
	},
	{
		Header: 'Ecosystem',
		Footer: 'Ecosystem',
		accessor: 'Ecosystem',
		Filter: ColumnFilter,
		Cell: (props) => (
			<Link href={`/project/ecosystem/${btoa(props.row.original.Ecosystemcd)}`} className="text-info">
				{props.row.original.Ecosystem}
			</Link>
		),
	},
	{
		Header: 'Categories',
		Footer: 'Categories',
		accessor: 'protype',
		Filter: ColumnFilter,
		Cell: (props) => (
			<Link href={`/project/protype/${btoa(props.row.original.protypecd)}`} className="text-info">
				{props.row.original.protype}
			</Link>
		),
	},
	{
		Header: 'No of viewed',
		Footer: 'No of viewed',
		accessor: 'totalreview',
		Filter: ColumnFilter,
	},
	{
		Header: 'Quality',
		Footer: 'Quality',
		Cell: (props) => {
			const colorquality = ColorQuality(props.row.original.quality)
			return (
				colorquality
			)
		}
	}
]

export const COLUMNSREVIEWLIST = [
	{
		Header: 'Project',
		Footer: 'Project',
		accessor: 'proname',
		Filter: ColumnFilter,
	},
	{
		Header: 'User',
		Footer: 'User',
		accessor: 'username',
		Filter: ColumnFilter,
	},
	{
		Header: 'Categories',
		Footer: 'Categories',
		accessor: 'protype',
		Filter: ColumnFilter,
	},
	{
		Header: 'Status',
		Footer: 'Status',
		accessor: 'status',
		Filter: ColumnFilter,
		Cell: (props) => (
			getStatusType(props.row.original.status)
		)
	},
	{
		Header: 'Admin',
		Footer: 'Admin',
		Cell: (props) => (
			<>
				<Link href={`/project-review-list-action/proname/${props.row.original.proname}/username/${props.row.original.username}/review/${'false'}`} className="btn btn-success shadow btn-xs sharp mr-2"
				>
					<i className="fa fa-eye"></i>
				</Link>
			</>
		)
	},
]


export const COLUMNSUSERREVIEWLIST = [
	{
		Header: 'Review ID',
		Footer: 'Review ID',
		accessor: 'reviewid',
		Filter: ColumnFilter,
	},
	{
		Header: 'Categories',
		Footer: 'Categories',
		accessor: 'protype',
		Filter: ColumnFilter,
	},
	{
		Header: 'Status',
		Footer: 'Status',
		accessor: 'status',
		Filter: ColumnFilter,
		Cell: (props) => (
			getStatusType(props.row.original.status)
		)
	},
	{
		Header: 'Review Date',
		Footer: 'Review Date',
		accessor: 'reviewdate',
		Filter: ColumnFilter,
	},
	{
		Header: 'Comment',
		Footer: 'Comment',
		accessor: 'comment',
		Filter: ColumnFilter,
	},
	{
		Header: 'Admin',
		Footer: 'Admin',
		Cell: (props) => (
			<>
				<Link href={`/project-review-list-action/${btoa(props.row.original.proname)}&${btoa(props.row.original.username)}&${btoa(props.row.original.reviewid)}`} className="btn btn-success shadow btn-xs sharp mr-2"
				>
					<i className="fa fa-eye"></i>
				</Link>
			</>
		)
	},
]


export const COLUMNSFILTERPROJECT = [
	{
		Header: 'Icon',
		Footer: 'Icon',
		Cell: (props) => (<Link href={`/ecom-project-detail/${props.row.original.proname}`}><ProjectSvg image={props.row.original.proicon} width={24} height={24} /></Link>),
	},
	{
		Header: 'Name',
		Footer: 'Name',
		accessor: 'proname',
		Filter: ColumnFilter,
	},
	{
		Header: 'Ecosystem',
		Footer: 'Ecosystem',
		accessor: 'Ecosystem',
		Filter: ColumnFilter,
	},
	{
		Header: 'Categories',
		Footer: 'Categories',
		accessor: 'protype',
		Filter: ColumnFilter,
	},
	{
		Header: 'Status',
		Footer: 'Status',
		accessor: 'prosts',
		Filter: ColumnFilter,
	},
	{
		Header: 'No of viewed',
		Footer: 'No of viewed',
		accessor: 'totalreview',
		Filter: ColumnFilter,
	},
	{
		Header: 'Admin',
		Footer: 'Admin',
		Cell: (props) => (
			<>
				<Link href={`/project-management-action/${btoa(props.row.original.proname)}`} className={`btn ${props.row.original.proaprstscd === 'P' ? 'btn-warning' : 'btn-success'} shadow btn-xs sharp mr-2`}
				>
					<i className="fa fa-eye"></i>
				</Link>
			</>
		)
	}
]

