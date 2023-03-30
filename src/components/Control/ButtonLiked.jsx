import client from '@/data/client';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';


const ButtonLiked = ({ islike, numberoflike, reviewid }) => {
    const [liked, setLiked] = useState(islike);
    const [contentLike, setContentLike] = useState('');

    const { mutate: Like } = useMutation(client.project.likeprojectreview, {
        onSuccess: () => {
        },
        onError: (errorAsUnknown) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                color: 'red',
                title: 'Oops...',
                text: `${errorAsUnknown}`,
            })

        }
    });


    const handleClickLike = (review, like, numberLike) => {
        if (like) {
            setLiked(false)
            setContentLike(numberLike + ' people liked')
        } else {
            const postdata = {
                reviewid: review
            }
            Like(postdata)
            setLiked(true)
            setContentLike('You and ' + numberLike + ' others people')
        }
    }

    return (
        <>
            <Link href="#" onClick={() => handleClickLike(reviewid, liked, numberoflike)}>
                <i className={`fa fa-thumbs-up fs-18 mr-3 ${liked ? 'text-success' : ''}`}> Like</i>
            </Link>
            <span className="item fs-14 mx-3">{contentLike}</span>
        </>
    )
}

export default ButtonLiked