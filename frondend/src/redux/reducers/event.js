import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
    success: false,
    error: null,
    allEvents: [],
}

export const eventReducer = createReducer(initialState,{
    eventCreateRequest : (state)=>{
        state.isLoading = true
    },
    eventCreateSuccess: (state, action)=>{
        state.isLoading=false
        state.event = action.payload
        state.success = true
    },
    eventCreateFail:(state, action)=>{
        state.isLoading = false
        state.error = action.payload
        state.success= false
    },

    //getAllevents of a shop
    getAlleventsShopRequest:(state)=>{
        state.isLoading = true
    },
    getAlleventsShopSuccess:(state,action)=>{
        state.isLoading = false
        state.events = action.payload
    },
    getAlleventsShopFail:(state,action)=>{
        state.isLoading = true
        state.error = action.payload

    },

       //getAllevents
       getAlleventspRequest:(state)=>{
        state.isLoading = true
    },
    getAlleventsSuccess:(state,action)=>{
        state.isLoading = false
        state.allEvents = action.payload
    },
    getAlleventsFail:(state,action)=>{
        state.isLoading = true
        state.error = action.payload

    },

    //delete event of a shop by id 
    deleteeventRequest:(state)=>{
        state.isLoading = true
    },
    deleteeventSuccess:(state, action)=>{
        state.isLoading = false
        state.message = action.payload
    },
    deleteeventFailed:(state, action)=>{
        state.isLoading= false
        state.error = action.payload
    },

    clearErrors :(state)=>{
        state.error = null
    }

})