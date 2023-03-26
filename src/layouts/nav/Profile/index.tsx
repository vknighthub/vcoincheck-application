

import { useMe } from '@/data/user';
import UserProfile from './UserProfile';

type Props = {}

const Profile = (props: Props) => {
    const { isAuthorized } = useMe()
        
        return (
            <UserProfile isAuthorized = {isAuthorized}/>
        )
}

export default Profile