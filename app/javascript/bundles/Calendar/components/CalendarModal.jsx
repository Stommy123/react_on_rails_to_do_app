import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import dateFns from 'date-fns'
import ModalForm from './ModalForm'

const CalendarModal = props => {
  const headerDate  = dateFns.format(props.selectedDate, 'dddd, MMMM Do')
  const yyyyMMDD    = dateFns.format(props.selectedDate, 'YYYY-MM-DD')
  const tasks       = props.tasks[yyyyMMDD] || []
  return(
    <Modal isOpen={props.open} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{headerDate}</ModalHeader>
      <ModalBody>
        <ul>
          {
            tasks.map((task) => {
              return(
                <li key={task.id}>
                  <a href={task.location}>
                    {
                      task.completed ? <s>{task.description}</s> : task.description
                    }
                  </a>
                </li>
              )
            })
          }
          {
            tasks.length === 0 &&
            <p><i>No tasks due today</i></p>
          }
        </ul>
      </ModalBody>
      <ModalFooter>
        <ModalForm
          createTask={props.createTask}
          task={props.task}
          handleDescriptionChange={props.handleDescriptionChange}
        />
      </ModalFooter>
    </Modal>
  )
}

export default CalendarModal
