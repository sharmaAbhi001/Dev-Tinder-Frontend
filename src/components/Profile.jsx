import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"
import UserCard from "./UserCard"
import { useState } from "react"

const Profile = () => {

  const [message] = useState()
  const user = useSelector(state=>state.user.user);
  console.log(user);

  
  return (
    <div className=" space-y-3 md:flex justify-around " >
      
      {user&& <UserCard message={message} user={user}/>}
      <EditProfile/>
    </div>
  )
}

export default Profile
