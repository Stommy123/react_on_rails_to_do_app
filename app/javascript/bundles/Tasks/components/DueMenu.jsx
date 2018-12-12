import React from 'react'

const DueMenu = props => (
  <p style={{minHeight: 30}}>
    <span
      className="badge badge-danger badge-clickable mr-1"
      style={{ fontSize: props.due === 'past_due' ? 'large' : 'small' }}
      onClick={ (e) => { props.handleDueClick('past_due') } }
    >
      Past Due
    </span>
    <span
      className="badge badge-warning badge-clickable mr-1"
      style={{ fontSize: props.due === 'due_soon' ? 'large' : 'small' }}
      onClick={ (e) => { props.handleDueClick('due_soon') } }
    >
      Due Soon
    </span>
    <span
      className="badge badge-success badge-clickable mr-1"
      style={{ fontSize: props.due === 'due_later' ? 'large' : 'small' }}
      onClick={ (e) => { props.handleDueClick('due_later') } }
    >
      Due Later
    </span>
    <span
      className="badge badge-secondary badge-clickable"
      style={{ fontSize: props.due === 'not_due' ? 'large' : 'small' }}
      onClick={ (e) => { props.handleDueClick('not_due') } }
    >
      Not Due
    </span>
  </p>
)

export default DueMenu
