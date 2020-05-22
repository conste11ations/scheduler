
export function getAppointmentsForDay(state, day) {

  const existsAppList = state.days.filter(appointmentList => appointmentList.name === day)[0];
  if (existsAppList === undefined || state.days.length === 0) {
    return [];
  }
  const appointmentObjects = (existsAppList.appointments).map(key => state.appointments[key]);

  return appointmentObjects;
}

export function getInterview(state, interview) {

  if (Object.is(interview, null)) {
    return null;
  }

  return { ...interview, interviewer: Object.entries(state.interviewers).filter(interviewerObj => interviewerObj[1].id === interview.interviewer)[0][1] };
}

export function getInterviewersForDay(state, day) {

  const existsInterviewerList = state.days.filter(interviewerList => interviewerList.name === day)[0];
  if (existsInterviewerList === undefined || state.days.length === 0) {
    return [];
  }
  const interviewerObjects = (existsInterviewerList.interviewers).map(key => state.interviewers[key]);

  return interviewerObjects;
}

export function spotCounter (daysArr, dayName, appointmentsObj) {

  const todaysKey = daysArr.findIndex(key => key.name === dayName);
  // Design decision: dynamically count number of appointments allocated per day in case we need to change that number
  let countingSpots = (daysArr[todaysKey].appointments).length;

  (daysArr[todaysKey].appointments).forEach(appointment => appointmentsObj[appointment].interview && countingSpots--);

  let withUpdatedSpots = [ ...daysArr ];
  withUpdatedSpots[todaysKey] = {...daysArr[todaysKey], spots: countingSpots};

  return withUpdatedSpots;
}