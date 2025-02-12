import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connectedUser",
    initialState:null,
    reducers:{
        addConnecctionData:(state,action)=>{
            return action.payload;
        }
        ,
        removeConnectionData:(state) =>{
          return null;
        },

    }
})

 export const {addConnecctionData,removeConnectionData} =connectionSlice.actions;
 export default connectionSlice.reducer;