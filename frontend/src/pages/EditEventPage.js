// import { useLoaderData } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";
const EditEventPage = () => {
  // const data = useLoaderData();
  const data = useRouteLoaderData('event-detail');
  const event = data.event;

  return (
    <>
      <EventForm event={event} method="patch" />
    </>
  );
};

export default EditEventPage;
