import React from 'react'
import EventCard from "./EventCard"
import styles from '../../Styles/styles';
import { useSelector } from 'react-redux';

const Events = () => {
  const {allEvents} = useSelector((state)=>state.events)
  // const { events } = useSelector(state => state.events);
  // console.log(allEvents,'ssssssssssssssssssssssssssssssssssssssssssalleventss:',events);
  return(
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1> Popular Events</h1>
        </div>
        <div className="w-full grid">
            <EventCard data={allEvents && allEvents[0]} />
        </div>
      
      </div>
    </div>
  );
}

export default Events