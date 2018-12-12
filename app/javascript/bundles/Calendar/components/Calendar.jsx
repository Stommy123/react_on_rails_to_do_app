import React, { Component } from 'react'
import dateFns from 'date-fns'
import axios from 'axios'
import Header from './Header'
import Days from './Days'
import Cells from './Cells'
import CalendarModal from './CalendarModal'
import { csrfHeaders } from './csrfHeaders'

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    currentDate:  new Date(),
    tasks:        {},
    modalOpen:    false,
    task:         {
                    description:  '',
                    due_date:     '',
                    errors:       []
                  }
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
      modalOpen:    true
    })
  }

  nextMonth = () => {
    const currentMonth = dateFns.addMonths(this.state.currentMonth, 1)
    this.fetchTasks(currentMonth)
  }

  prevMonth = () => {
    const currentMonth = dateFns.subMonths(this.state.currentMonth, 1)
    this.fetchTasks(currentMonth)
  }

  fetchTasks = currentMonth => {
  const monthStart = dateFns.startOfMonth(currentMonth)
  const monthEnd = dateFns.endOfMonth(monthStart)
  let   startDate = dateFns.startOfWeek(monthStart)
  let   endDate = dateFns.endOfWeek(monthEnd)
  startDate = dateFns.format(startDate, 'YYYY-MM-DD')
  endDate = dateFns.format(endDate, 'YYYY-MM-DD')
  axios.get(`/calendar.json?start_date=${startDate}&end_date=${endDate}`)
    .then((response) => {
      this.setState({ currentMonth, tasks: response.data.tasks })
    })
  }

  toggleModal = () => {
    this.setState({
      modalOpen: false,
      task: {
        description:  '',
        due_date:     '',
        errors:       []
      }
    })
  }

  createTask = event => {
    event.preventDefault()
    let { task, tasks } = this.state
    const selectedDate = dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')
    task.due_date = selectedDate
    axios.post('/tasks.json', { task }, { headers: csrfHeaders })
      .then((response) => {
        if(tasks[selectedDate]){
          tasks[selectedDate].push(response.data)
        }else{
          tasks[selectedDate] = [response.data]
        }
        this.setState({
          tasks,
          task: { description: '', due_date: '', errors: [] }
        })
      })
      .catch((error) => {
        if(error.response.status === 422){
          task.errors = error.response.data.errors
          this.setState({ task })
        }
      })
  }

  handleDescriptionChange = event => {
    let { task } = this.state
    task.description = event.target.value
    this.setState({ task })
  }

  componentDidMount(){
    const { currentMonth } = this.state
    this.fetchTasks(currentMonth)
  }

  render() {
    const { currentMonth, currentDate, selectedDate,
            task, tasks, modalOpen } = this.state
    return(
     <div className="calendar">
       <Header
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
          currentMonth={currentMonth}
       />
       <Days />
       <Cells
        tasks={tasks}
        currentMonth={currentMonth}
        currentDate={currentDate}
        onDateClick={this.onDateClick}
       />
       <CalendarModal
        open={modalOpen}
        toggle={this.toggleModal}
        selectedDate={selectedDate}
        tasks={tasks}
        createTask={this.createTask}
        task={task}
        handleDescriptionChange={this.handleDescriptionChange}
       />
     </div>
    )
  }
}

export default Calendar
