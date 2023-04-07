export const GetDataProjectReview = (data, type) => {
    const filteredData = data?.filter((review) => review.reviewtype === type);
    let items = [];
    if (filteredData?.length > 0) {
        items = filteredData[0].main_data;
    } else {
        items = null
    }
    return items
}