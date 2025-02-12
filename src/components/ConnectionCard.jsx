
import { Link } from "react-router";




const ConnectionCard = (data) => {
  const {firstName,lastName,photoURL,skills,bio,age,_id} = data.data;

 
  return (
    <div>
      <div className="card h-52 md:card-side bg-base-100  shadow-xl w-6/12 mx-auto my-2">
  <figure className="w-2/6" >
    <img
      src={photoURL}
      alt="Album" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName }</h2>
    <p>{skills}</p>
    <p>{bio}</p>
    <p>{age}</p>
    <div className="card-actions justify-end">
     <Link to={`/chat/${_id}`} className="btn btn-primary">Message</Link>
    </div>
  </div>
</div>
    </div>
  )
}

export default ConnectionCard
