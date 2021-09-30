export function getAppointmentsForDay(state, day) {

  if (!state.days[0]) {
    return []
  }

  if (!state.days.map(dayOfTheWeek => dayOfTheWeek.name).includes(day)) {
    return []
  }

  const dayAppointmentIDs = state.days.filter(dayOption => dayOption.name === day)[0].appointments;


  if (!dayAppointmentIDs) {
    return []
  }

  const appointmentsByDay = dayAppointmentIDs.map(appointmentID => state.appointments[appointmentID])
  return appointmentsByDay
}