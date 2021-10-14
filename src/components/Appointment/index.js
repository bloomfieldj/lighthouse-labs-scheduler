import React from "react";
import "./styles.scss"

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Confirm from "components/Appointment/Confirm"
import Show from "components/Appointment/Show"
import Status from "components/Appointment/Status"
// import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form"
import useVisualMode from "components/hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"

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

  const confirmDeletion = function () {

    transition(CONFIRM);

  }

  const deleteInterview = function () {

    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY, true));
  }

  const edit = function () {
    transition(EDIT, true)
  }

  const show = function () {

    transition(SHOW);

  }

  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirmDeletion}
          onEdit={edit}
        />}

      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />}

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM &&
        <Confirm
          onCancel={back}
          onConfirm={deleteInterview}
          message="Are you sure you'd like to cancel this appointment?"
        />}

      {mode === EDIT &&
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={show}
        />
      }

    </article>
  )
}

