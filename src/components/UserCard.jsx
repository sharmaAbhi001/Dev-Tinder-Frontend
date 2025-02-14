import axios from "axios";
import { motion, useMotionValue, useTransform } from "motion/react";
import { _BASE_URL } from "../utils/constent";
import { div } from "motion/react-client";
import { useState } from "react";

const UserCard = ({user,users, setUsers ,message}) => {

  const [response,setResponse] = useState();
  const { firstName, lastName, age, bio, skills, photoURL, _id } = user;


  const x = useMotionValue(0);

  const opacity = useTransform(x,[-150,0,150],[0,1,0]);
  const rotate = useTransform(x,[-150,150],[-18,18])

  const handelEndDrag= async() => {
    if (x.get() > 70) { 
      try {
        const response = await axios.post(`${_BASE_URL}/api/v1//request/send/intrested/${user._id}`,{},{
          withCredentials:true,
      })
      if(response.status===201)
        {
            setResponse(response.data.message)
        }
      } catch (error) {
        (error);
        
      }
      setUsers((pv)=>pv.filter((v)=>v._id!==_id))

    } else if (x.get() < -70) {
    
      try {
        const response = await axios.post(`${_BASE_URL}/api/v1//request/send/ignored/${user._id}`,{},{
          withCredentials:true,
      })
      if(response.status===201)
      {
          setResponse(response.data.message)
      }
      } catch (error) {
      alert(error)
        
      }

      setUsers((pv)=>pv.filter((v)=>v._id!==_id))
    }
  };


  return (
   <>
    <div>
      {response}
    </div>
    <motion.div
      drag="x"
      dragConstraints={{left:0,right:0}}
      onDragEnd={handelEndDrag}
      className="card bg-slate-700  w-96 "
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate
      }}
    >
      <figure className="h-96 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={photoURL}
          alt="Shoes"
        />
      </figure>
      <div className="card-body  h-56 text-white">
        <h2 className="card-title text-slate-50">
          {firstName}
          <div className="text-slate-50">{lastName}</div>
        </h2>
       <div className="flex"> <p>Bio : {bio}</p>
       <p>Age{age}</p></div>
        <p>{skills}</p>
        <div className="card-actions justify-between">
         {message &&  <button className="btn btn-primary badge badge-secondary">
            {message[1]}
          </button>}
          { message && <button className="btn btn-primary">
          {message[0]}
          </button>}
        </div>
      </div>
    </motion.div>
   </>
  );
};

export default UserCard;
