import FriendBox from "../../components/friends/FriendBox";
import face from '../../assets/images/face.jpg';


export default function Friend()
{
    return (
        <div className="flex justify-center ">
            <FriendBox userFace={face} status={"offline"}  userName="Ochangli"/>
        </div>
    );
}