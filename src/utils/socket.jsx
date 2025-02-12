import { io } from "socket.io-client";
import { _BASE_URL } from "./constent";

export const createSocketConnection =()=>{
    return io(_BASE_URL)
}

