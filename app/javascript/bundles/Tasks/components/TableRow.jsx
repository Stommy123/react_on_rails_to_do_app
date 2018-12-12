import React from 'react'

const TableRow = props => (
  <tr>
    <td>
      {
        props.completed ? <s>{props.description}</s> : props.description
      }
    </td>
    <td>
      <span className={`${props.badge_class} due_date`}>
        {props.due_date}
      </span>
    </td>
    <td>
      <a
        href={props.location}
        className="btn btn-info"
      >
        Details
      </a>
    </td>
  </tr>
)

export default TableRow
