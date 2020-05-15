import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // chose to have id arg to explicitly inform that props.id is used
  const save = (name, interviewer, id) => {

    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(id, interview)
    .then(transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={(name, interviewer) => save(name, interviewer, props.id)} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    </article>);
}