import { useState, useEffect } from "react";
import axios from "axios";
import { spotCounter } from "helpers/selectors";

export default function useApplicationData(defaultMode) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios({
        method: 'GET',
        url: 'http://localhost:8001/api/days'
      }),
      axios({
        method: 'GET',
        url: 'http://localhost:8001/api/appointments'
      }),
      axios({
        method: 'GET',
        url: 'http://localhost:8001/api/interviewers'
      })
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios({
      method: 'PUT',
      url: `http://localhost:8001/api/appointments/${id}`,
      data: {
        interview
      }
    })
      .then(() => setState({ ...state, days: spotCounter(state.days, state.day, appointments), appointments }));
  }

  const cancelInterview = (id) => {

    const appointments = {
      ...state.appointments,
      [id]: {
        ...state.appointments[id],
        interview: null
      }
    };
    return axios({
      method: 'DELETE',
      url: `http://localhost:8001/api/appointments/${id}`,
    })
      .then(() => setState({ ...state, days: spotCounter(state.days, state.day, appointments), appointments }));
  }

  return { state, setDay, bookInterview, cancelInterview };
}