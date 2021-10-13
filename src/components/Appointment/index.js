import React from "react";
import "./styles.scss"

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
// import Confirm from "components/Appointment/Confirm"
import Show from "components/Appointment/Show"
import Status from "components/Appointment/Status"
// import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form"
import useVisualMode from "components/hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useVisualMode(mode);

  // const findIntereviewerByID = function (interviewerID) {
  //   for (let interviewerKey in props.interviewers) {

  //     if (props.interviewers[interviewerKey].id === interviewerID) {

  //       return props.interviewers[interviewerKey];
  //     }
  //   }
  // }

  const save = function (name, interviewerID) {

    const interview = {
      student: name,
      interviewer: interviewerID
    }
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW, true));
  }


  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />

      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name} />}

      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)} />}

      {mode === CREATE && <Form
        interviewers={props.interviewers} onCancel={back} onSave={save} />}

      {mode === SAVING && <Status message="Saving" />}

    </article>
  )
}

//can access form inputs from saveData but not props.onSave