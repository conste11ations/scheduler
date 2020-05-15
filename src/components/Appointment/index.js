import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // chose to have id arg to explicitly inform that props.id is used
  const save = (name, interviewer, id) => {

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(id, interview)
      .then(() => transition(SHOW));
  }

  const deleteInterview = (id) => {

    transition(DELETING);
    props.cancelInterview(id)
      .then(() => transition(EMPTY));
  }

  const confirm = () => {
    transition(CONFIRM);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirm()}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer, props.id)}
        />
      }
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={() => deleteInterview(props.id)}
        />
      }
      {mode === SAVING && <Status message="Saving, please wait..." />}
      {mode === DELETING && <Status message="Deleting, please wait..." />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    </article>);
}