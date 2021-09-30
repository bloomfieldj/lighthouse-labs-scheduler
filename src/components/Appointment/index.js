import React from "react";
import "./styles.scss"

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
// import Confirm from "components/Appointment/Confirm"
import Show from "components/Appointment/Show"
// import Status from "components/Appointment/Status"
// import Error from "components/Appointment/Error"
// import Form from "components/Appointment/Form"

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />
      {props.interview ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        /> :

        <Empty />
      }

    </article>
  )
}