import React from "react";

import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss";



export default function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(person =>
          <InterviewerListItem 
            key={person.id}
            id={person.id}
            name={person.name}
            avatar={person.avatar}
            selected={person.id === props.value}
            setInterviewer={event => props.onChange(person.id)}
          />
        )}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};