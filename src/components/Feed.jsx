import { useEffect, useState } from "react";
import useFeed from "../hooks/useFeed"
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import Simmer from "./Simmer";


const Feed = () => {
 
  const [message] = useState(["Intrested","Ignored"])
  
  
  const feedApi =useFeed();
  
  useEffect(()=>{
    feedApi();
  },[]);

  const feedData = useSelector((state) => state.feed);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (Array.isArray(feedData)) {
      setUsers(feedData);
    }
  }, [feedData]);


  if (!users || users.length === 0) {
    return <Simmer />;
  }

  
  return (
    <div >
      {users&& <div className=" grid place-items-center mt-8">
      {users.map((user,) => (
        <UserCard key={user._id} users={users} message={message} setUsers={setUsers} user={user} /> 
      ))}
    </div>}
    </div>
  )
}

export default Feed
