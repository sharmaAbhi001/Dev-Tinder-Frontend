import axios from "axios";
import { _BASE_URL } from "../utils/constent";

const RequestCard = (data) => {

const {_id} = data ;  
  const { firstName, lastName, photoURL, skills, bio, age,gender} = data.data.fromUserId;

  const handelAcceptClick = async () =>{
       try {
        const response = await axios.post(`${_BASE_URL}/api/v1//request/review/accepted/${_id}`,{},{
            withCredentials:true
        });

        console.log(response);
         if(response.status===201)
         {
            alert("You accepted "+firstName+"Now you are friend");
         }
       } catch (error) {
        alert(error)
        
       }
  }

  const handelRejectClick = async () =>{
    try {
     const response = await axios.post(`${_BASE_URL}/api/v1//request/review/rejected/${_id}`,{},{
         withCredentials:true
     });

     console.log(response);
      if(response.status===201)
      {
         alert("You rejected "+firstName+"");
      }
    } catch (error) {
   alert(error)
     
    }
}

  return (
    <div>
      <div className="card h-60 md:card-side bg-base-100  shadow-xl w-6/12 mx-auto my-2">
        <figure className="w-2/6">
          <img src={photoURL} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{skills}</p>
          <p>{bio}</p>
          <p>{age}</p>
          <p>{gender}</p>
          <div className="card-actions space-x-6 justify-end">
            <button  onClick={handelAcceptClick} className="btn btn-secondary">Accept</button>
            <button onClick={handelRejectClick} className="btn bg-red-500 hover:bg-red-600 text-white">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
