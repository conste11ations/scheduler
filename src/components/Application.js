import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";


export default function Application(props) {

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
      .then(() => setState({ ...state, appointments }));
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
      .then(() => setState({ ...state, appointments }));
  }

  const schedule = getAppointmentsForDay(state, state.day).map(appointment => {

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interviewers={getInterviewersForDay(state, state.day)}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        /></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


