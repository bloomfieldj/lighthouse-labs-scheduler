import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [studentError, setStudentError] = useState("");
  const [interviewerError, setInterviewerError] = useState("");

  function validate() {
    if (name === "") {
      setStudentError("Student name cannot be blank!");
      return;
    }

    if (interviewer === null) {
      setInterviewerError("Don't forget to select an interviewer!");
      return;
    }

    setInterviewerError("");
    setStudentError("");
    props.onSave(name, interviewer);
  }
  const reset = function () {
    setName("");
    setInterviewer(null);
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            value={name}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{studentError}</section>
          <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
          <section className="appointment__validation">{interviewerError}</section>
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};