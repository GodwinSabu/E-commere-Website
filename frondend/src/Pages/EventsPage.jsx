import React from 'react'
import Header from './Layout/Header'
import EventCard from '../components/Events/EventCard'

const EventsPage = () => {
  return (
    <div>
          <div>
          <Header activeHeading={4} />
          <EventCard active={true} />
          {/* <EventCard active={true} /> */}
        </div>
    </div>
  )
}

export default EventsPage