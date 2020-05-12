import React from "react";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props;

  const selectedClass = "interviewers__item" + (selected ? "--selected" : "");

  return (
    <li key={id} className={selectedClass} onClick={setInterviewer}>
      <img
        className={"interviewers__item-image"}
        src={avatar}
        alt={name}
        />{selected && name}</li>
  );
}