

export default function FriendAvt({friend , onClick}){
    return(
        <button key={friend.id}
                onClick={onClick}
                className="relative w-20 h-20 rounded-full overflow-hidden transition-all">
            <img src={friend.userFace}
                 alt="friend chat Profile"
                 className="w-full h-full object-cover"/>        
        </button>
    );
}