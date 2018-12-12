import React from 'react'
import dateFns from 'date-fns'

const Days = props => {
  const dateFormat = "ddd"
  const days = []
  let startDate = dateFns.startOfWeek(new Date())
  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col col-center" key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>
    )
  }
  return <div className="days calendar-row">{days}</div>
}

export default Days
