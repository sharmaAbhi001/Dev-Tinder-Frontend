import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { _BASE_URL } from "../utils/constent";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);
  const messagesEndRef = useRef(null);
  const params = useParams();

  const targetUserId = params.id;
  const user = useSelector((store) => store.user.user);

  const userId = user?._id;
  const firstName = user?.firstName;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  // jaise hi page load ho purana msg load ho


  const fetchOldMessage = async () =>{

   try {
    const chat = await axios.get(_BASE_URL+"/api/v1/chat/"+targetUserId,{withCredentials:true});

    const chatMessages = chat?.data?.messages.map((msg) =>{
      return {
        firstName:msg?.senderId.firstName,
        text:msg?.text,
        userId:msg.senderId._id
      }
    });

    setMessage(chatMessages);
   } catch (error) {
    alert(error)
   }
  }


  useEffect(()=>{
    fetchOldMessage();
  },[])

  // two people join chat room
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, targetUserId, userId });

    socket.on("messageReceived", ({ firstName, text, userId }) => {   
      setMessage((prevMessages) => [
        ...prevMessages,
        { firstName, text, userId },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // send message

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: firstName,
      targetUserId,
      userId,
      text: newMessage,
    });
    setNewMessage("");
  };

  // recieved msg to everyone who is in that room

  return (
    <div className="flex justify-center  h-[560px] bg-gray-100">
      {/* Chat Box (6/12 width) */}
      <div className="w-6/12 bg-white shadow-lg rounded-lg flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex space-x-32  font-semibold rounded-t-lg">
          <h1>Chat BOx</h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 h-[560px] overflow-y-auto space-y-3">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.userId === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header text-sm text-gray-300">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-2">Just now</time>
              </div>
              <div
                className={`chat-bubble ${
                  msg.userId === userId ? "bg-blue-500" : "bg-gray-500"
                } text-white`}
              >
                {msg.text}
              </div>
              <div className="chat-footer opacity-50 text-xs">Delivered</div>
            </div>
          ))}
          {/* Scroll Target */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-3 border-t flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 ml-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
