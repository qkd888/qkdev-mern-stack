import React from "react";
import renderer from "react-test-renderer";
import EventsContainer from "../Components/EventComponents/EventsContainer";
import SubscriberEventsContainer from "../Components/EventComponents/SubscriberEventsContainer";

// Testing if Admin Events container renders  properly when passed an empty events list
test("Admin events container renders correctly with empty array", () => {
  const tree = renderer.create(<EventsContainer events={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Testing if Admin Events container renders  properly when passed a populated events list
test("Admin events container renders correctly with populuated array", () => {
  const events = [
    {
      eventName: "global citizen",
      eventDescription: "Best concert of your life",
      eventDate: "2 December 2018",
      _id: 6,
    },
  ];
  const tree = renderer.create(<EventsContainer events={events} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Testing if subscriber Events container renders  properly when passed an empty events list

test("Subscriber events renders correctly with empty array", () => {
  const tree = renderer
    .create(<SubscriberEventsContainer events={[]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// Testing if subscriber Events container renders  properly when passed a populated events list
test("Subscriber events renders correctly with populuated array", () => {
  const events = [
    {
      eventName: "global citizen",
      eventDescription: "Best concert of your life",
      eventDate: "2 December 2018",
      _id: 6,
    },
  ];
  const tree = renderer.create(<EventsContainer events={events} />).toJSON();
  expect(tree).toMatchSnapshot();
});
