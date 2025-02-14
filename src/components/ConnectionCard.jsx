
import { Link } from "react-router";




const ConnectionCard = (data) => {
  const {firstName,lastName,photoURL,skills,bio,age,_id,status} = data.data;

 
  return (
    <div className="p-4">
      <div className="card h-auto md:h-56 md:flex-row bg-base-100 shadow-xl w-full max-w-3xl mx-auto my-2">
        <figure className="w-full md:w-2/6 flex justify-center">
          <img src={photoURL} alt="Profile" className="object-cover w-full h-52 md:h-auto" />
        </figure>
        <div className="card-body flex-1">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>Skilss:{skills}</p>
          <p>Bio:{bio}</p>
          <p>Age:{age}</p>
          <p>status:{status==="online"?status+"🟢":status+"🔴"}</p>
          <div className="card-actions justify-end">
            <Link to={`/chat/${_id}`} className="btn btn-primary">Message</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectionCard
