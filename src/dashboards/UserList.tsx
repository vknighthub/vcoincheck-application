import client from '@/data/client'
import { UserListResponse } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Swal from 'sweetalert2'

const UserList = () => {
    const { t } = useTranslation('common')

    const { mutate: DeleteUserAction } = useMutation(client.users.delete, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                Swal.fire("Succeed!", "This user have been deleted", "success")
            }
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

    const getUserStatus = (status: string) => {
        switch (status) {
            case 'P':
                return <i className="fa fa-circle text-warning mr-1"> {t('pendingtoapprove')}</i>
            case 'N':
                return <i className="fa fa-circle text-success mr-1"> {t('normal')}</i>
            case 'C':
                return <i className="fa fa-circle text-danger mr-1"> {t('closed')}</i>
            default: return ''
        }
    }

    const handleDeleteUser = (userName: string, status: string) => {
        let postData = {
            username: userName
        }
        if (status === 'P') {
            DeleteUserAction(postData)
        } else {
            Swal.fire("Warning!", "This user is not allowed to be deleted", "warning");
        }
    }

    const FetchUsers = () => {
        const { data, isLoading } = useQuery<UserListResponse, Error>(
            ['user-list'],
            () => client.users.getall(),
        )
        return {
            userlist: data?.result.data,
            isLoading
        }
    }

    const { userlist } = FetchUsers()

    return (
        <>
            <div className="card-header d-block d-sm-flex border-0">
                <div>
                    <h4 className="fs-20 text-black">User list</h4>
                </div>
            </div>
            <div className="card-body tab-content p-0">
                <div className="table-responsive">
                    <table className="table shadow-hover card-table">
                        <thead>
                            <tr>
                                <th>
                                    <strong>{t('no')}</strong>
                                </th>
                                <th>
                                    <strong>{t('username')}</strong>
                                </th>
                                <th>
                                    <strong>{t('firstname')}</strong>
                                </th>
                                <th>
                                    <strong>{t('lastname')}</strong>
                                </th>
                                <th>
                                    <strong>{t('gender')}</strong>
                                </th>
                                <th>
                                    <strong>{t('address')}</strong>
                                </th>
                                <th>
                                    <strong>{t('email')}</strong>
                                </th>
                                <th>
                                    <strong>{t('status')}</strong>
                                </th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userlist?.map((user, index) => (
                                <tr key={index}>
                                    <td className="font-w500">
                                        {index + 1}
                                    </td>
                                    <td className="font-w500">
                                        {user.username}
                                    </td>
                                    <td className="font-w500">
                                        {user.firstname}
                                    </td>
                                    <td className="font-w500">
                                        {user.lastname}
                                    </td>
                                    <td className="font-w500">
                                        {user.gender === 1 ? "Male" : "Female"}
                                    </td>
                                    <td className="font-w500">
                                        {user.address}
                                    </td>
                                    <td className="font-w500">
                                        {user.email}
                                    </td>
                                    <td className="font-w500">
                                        {getUserStatus(user.status)}
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <Link href={`/user-active-profile/${user.username}`}
                                                className="btn btn-success shadow btn-xs sharp mr-2"
                                            >
                                                <i className="fa fa-cube"></i>
                                            </Link>
                                            <Link
                                                href="#"
                                                onClick={() => handleDeleteUser(user.username, user.status)}
                                                className="btn btn-danger shadow btn-xs sharp"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserList