import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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
      `/api/appointments/${id}`,
      { interview: interview })
      .then(res => {
        setState({
          ...state,
          appointments
        });
        return res;
      })
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
      `/api/appointments/${id}`,
      { interview: interview })
      .then(res => {
        setState({ ...state, appointments });
        return res;
      })
  };

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
      `/api/appointments/${id}`)
      .then(res => {
        setState({
          ...state, appointments
        });
        return res;
      })
  };


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
    });
  });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  };
}