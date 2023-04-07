import { useRouter } from "next/router";

const Review = ({ review, index, username }) => {
    const router = useRouter()
    

    const handleRowClick = (reviewid, userName) => {
        router.push(`/owner-project-review-detail/review/${reviewid}`);
    }
    const getStatusType = (status) => {
        switch (status) {
            case 'P':
                return <i className="fa fa-circle text-warning mr-1"> Pending to Approve</i>
            case 'A':
                return <i className="fa fa-circle text-success mr-1"> Approved</i>
            default: return ''
        }
    }

    return (
        <tr style={{ cursor: `pointer` }} onClick={() => handleRowClick(review.reviewid, username)}>
            <td>
                <span className="bgl-success p-3 d-inline-block">
                    {index + 1}
                </span>
            </td>
            <td className="font-w500">{review.reviewid}</td>
            <td className="font-w500">{getStatusType(review.status)}</td>
            <td className="font-w500">{review.reviewdate}</td>
        </tr>
    );
};

export default Review;
