import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // // const events = useLoaderData();
  // const data = useLoaderData();
  // const events = data.events;

  // // if (data.isError) {
  // //   return <p>{data.message}</p>;
  // // }

  // return <>{<EventsList events={events} />}</>;
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
    <Await resolve={events}>
      {(loadEvents) => 
         <EventsList events={loadEvents} />
      }
    </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    // throw { message: "Could not fetch events." };
    // throw new Response(
    //   JSON.stringify({ message: "Could not fetch events." }), { status: 500 }
    // );
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    // const resData = await response.json();
    // return resData.events;
    // return response;
    const resData = await response.json();
    return resData.events;
  }
};
export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
