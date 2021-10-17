import React from "react";
import "./styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import useVisualMode from "components/hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useVisualMode(mode);

  const save = function (name, interviewerID) {

    const interview = {
      student: name,
      interviewer: interviewerID
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const confirmDeletion = function () {

    transition(CONFIRM);

  }

  const deleteInterview = function () {

    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  const edit = function () {
    transition(EDIT);
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

      {mode === ERROR_SAVE &&
        <Error
          message="Uhoh, looks like we couldn't create your new appointment."
          onClose={back}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Uhoh, looks like we couldn't cancel your new appointment."
          onClose={back}
        />
      }

    </article>
  );
};

