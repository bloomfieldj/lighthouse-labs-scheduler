export function getAppointmentsForDay(state, day) {
  if (!day) {
    return []
  }

  if (!state.days[0]) {
    return [];
  }

  if (!state.days.map(dayOfTheWeek => dayOfTheWeek.name).includes(day)) {
    return [];
  }

  const dayAppointmentIDs = state.days.filter(dayOption => dayOption.name === day)[0].appointments;


  if (!dayAppointmentIDs) {
    return [];
  }

  const appointmentsByDay = dayAppointmentIDs.map(appointmentID => state.appointments[appointmentID]);
  return appointmentsByDay;
}

export function getInterviewersForDay(state, day) {
  if (!day) {
    return []
  }

  if (!state.days[0]) {
    return [];
  }

  if (!state.days.map(dayOfTheWeek => dayOfTheWeek.name).includes(day)) {
    return [];
  }


  const dayInterviewerIDs = state.days.filter(dayOption => dayOption.name === day)[0].interviewers;

  if (!dayInterviewerIDs) {
    return [];
  }


  const interviewersByDay = dayInterviewerIDs.map(interviewerID => state.interviewers[interviewerID]);

  return interviewersByDay;
}

export function getInterview(state, interview) {
  if (!state.interviewers) {
    return null;
  }

  if (!interview) {
    return null;
  }

  if (!interview.interviewer) {
    return null;
  }

  const matchedInterview = function () {
    for (let interviewerPerson in state.interviewers) {
      if (state.interviewers[interviewerPerson].id === interview.interviewer) {
        return {
          student: interview.student,
          interviewer: state.interviewers[interview.interviewer]
        };
      }
    }

  }

  return matchedInterview();

}