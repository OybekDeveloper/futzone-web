import { createSlice } from "@reduxjs/toolkit"

export const initialState={
    leagueData:[]
}

export const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers:{
        selectLeagueData:(state,action)=>{
            state.leagueData=action.payload
        }
    }
})

export const {selectLeagueData}=eventSlice.actions;
export default eventSlice.reducer;