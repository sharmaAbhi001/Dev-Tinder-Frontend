import { configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from'./feedSlice';
import connectedUserReduder from './connectionStore'


const store = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
       connectedUser:connectedUserReduder, 
    },
  });

export default store