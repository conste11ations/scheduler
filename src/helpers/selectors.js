
export function getAppointmentsForDay(state, day) {

  const existsAppList = state.days.filter(appointmentList => appointmentList.name === day)[0];
  if (existsAppList === undefined) {
    return [];
  }

  const appointmentKeys = existsAppList.appointments;
  const appointmentObjects = appointmentKeys.map(key => state.appointments[key]);

  return appointmentObjects;
}