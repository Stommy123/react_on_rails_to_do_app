import React from 'react';
import dateFns from 'date-fns';

const Cell = props => {
 return(
    <div
      className={`col cell ${
        !dateFns.isSameMonth(props.day, props.monthStart)
          ? "disabled"
          : dateFns.isSameDay(props.day, props.currentDate) ? "current" : ""
      }`}
      onClick={() => props.onDateClick(dateFns.parse(props.cloneDay))}
    >
      {
        props.tasks.map((task) => {
          return(
            <div key={task.id}>
              {task.completed ? <s>{task.description}</s> : task.description }
            </div>
          )
        })
      }
      <span className="number">{props.formattedDate}</span>
   </div>
 );
}

export default Cell;
