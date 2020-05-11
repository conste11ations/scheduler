import React from "react";

import DayListItem from "components/DayListItem"

export default function DayList(props) {
  return (props.days.map(day =>
    <ul key={day.id}>
      <DayListItem
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}>
      </DayListItem>
    </ul>
  ));
}