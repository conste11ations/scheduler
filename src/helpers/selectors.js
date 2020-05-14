
export function getAppointmentsForDay(state, day) {

  const existsAppList = state.days.filter(appointmentList => appointmentList.name === day)[0];
  if (existsAppList === undefined) {
    return [];
  }

  const appointmentKeys = existsAppList.appointments;
  const appointmentObjects = appointmentKeys.map(key => state.appointments[key]);

  return appointmentObjects;
}

export function getInterview(state, interview) {

  if (Object.is(interview, null)) {
    return null;
  }

  const temp = Object.entries(state.interviewers).filter(interviewerObj => interviewerObj[1].id === interview.interviewer)[0][1]

  return {...interview, interviewer: temp};
}