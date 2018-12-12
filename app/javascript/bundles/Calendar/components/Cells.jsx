import React from 'react'
import dateFns from 'date-fns'
import Cell from './Cell'

const Cells = props => {
  const { currentMonth, currentDate } = props
  const monthStart = dateFns.startOfMonth(currentMonth)
  const monthEnd = dateFns.endOfMonth(monthStart)
  const startDate = dateFns.startOfWeek(monthStart)
  const endDate = dateFns.endOfWeek(monthEnd)
  const dateFormat = "D"
  const rows = []
  let days = []
  let day = startDate
  let formattedDate = ""
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat)
      const dailyTasks = props.tasks[dateFns.format(day, 'YYYY-MM-DD')] || [];
      const cloneDay = day
      days.push(
        <Cell
          key={day}
          day={day}
          cloneDay={cloneDay}
          monthStart={monthStart}
          currentDate={currentDate}
          formattedDate={formattedDate}
          onDateClick={props.onDateClick}
          tasks={dailyTasks}
        />
      )
      day = dateFns.addDays(day, 1)
    }
    rows.push(
      <div className="calendar-row" key={day}>
        {days}
      </div>
    )
    days = []
  }
  return <div className="body">{rows}</div>
}

export default Cells
