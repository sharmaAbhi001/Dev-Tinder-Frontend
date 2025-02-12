import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"
import UserCard from "./UserCard"
import { useState } from "react"

const Profile = () => {

  const [message] = useState()
  const user = useSelector(state=>state.user.user);
  console.log(user);

  
  return (
    <div className="flex justify-around" >
      <EditProfile/>
      {user&& <UserCard message={message} user={user}/>}
    </div>
  )
}

export default Profile
