

export default function FriendAvt({friend , onClick}){
    return(
        <button key={friend.id}
                onClick={onClick}
                className="relative w-14 h-14 rounded-full overflow-hidden transition-all flex-shrink-0">
            <img src={friend.userFace}
                 alt="friend chat Profile"
                 className="w-full h-full object-cover"/>        
        </button>
    );
}