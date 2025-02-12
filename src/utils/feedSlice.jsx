import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeedData:(state,action)=>{
            return action.payload;
        }
        ,
        removeFeedData:(state) =>{
          return null;
        },

    }
})

 export const {addFeedData,removeFeedData} =feedSlice.actions;
 export default feedSlice.reducer;