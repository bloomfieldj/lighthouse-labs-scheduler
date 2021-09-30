import React from "react";
import "./styles.scss"

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
// import Confirm from "components/Appointment/Confirm"
import Show from "components/Appointment/Show"
// import Status from "components/Appointment/Status"
// import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form"
import useVisualMode from "components/hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useVisualMode(mode)


  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />

      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name} />}

      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)} />}

      {mode === CREATE && <Form
        interviewers={props.interviewers} onCancel={back} />}

    </article>
  )
}