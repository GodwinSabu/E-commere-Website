import axios from "axios";
import { server } from "../../server";

export const createEvent = (newform) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest", // Updated to match the reducer
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newform,
      config
    );

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All events
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/event/get-all-events/${id}`
    );
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFAiled",
      payload: error.response.data.message,
    });
  }
};

//delete event by shop
export const deleteEvent = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:"deleteeventRequest"
        })
        const {data}= await axios.delete(`${server}/event/delete-shop-event/${id}`,{
            withCredentials:true
        })
        dispatch({
            type:"deleteeventSuccess",
            payload: data.message,
        })

        
    } catch (error) {
        dispatch({
            type: "deleteeventFailed",
            payload: error.response.data.message,
          });
    }
}

// get all events 
// import axios from 'axios';

export const getAllevents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });
    const { data } = await axios.get(
      `${server}/event/get-all-events`
    );
    console.log(data,'data {:');
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
    console.log(data.events,'wwwwwwww');
    
  } catch (error) {
    dispatch({
      type: "getAlleventsFail",
      payload: error.response.data.message,
    });
  }
};
