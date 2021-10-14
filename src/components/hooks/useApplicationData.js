import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(
      `http://localhost:8001/api/appointments/${id}`,
      { interview: interview })
      .then(res => {
        setState({ ...state, appointments })
        return res
      })
      .catch(err => console.log(err))
  }

  const editInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.patch(
      `http://localhost:8001/api/appointments/${id}`,
      { interview: interview })
      .then(res => {
        setState({ ...state, appointments })
        return res
      })
      .catch(error => error)
  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(
      `http://localhost:8001/api/appointments/${id}`)
      .then(res => {
        setState({ ...state, appointments })
        return res
      })
      .catch(error => error)
  }

  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   const interviewers = getInterviewersForDay(state, state.day);

  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //       interviewers={interviewers}
  //       bookInterview={bookInterview}
  //       editInterview={editInterview}
  //       cancelInterview={cancelInterview}
  //     />
  //   );
  // });


  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })

  })

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  }
}