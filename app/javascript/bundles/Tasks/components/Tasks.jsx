import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table'
import DueMenu from './DueMenu'
import Search from './Search'
import Pagination from './Pagination'

class Tasks extends Component {
  state = {
            completed:  this.props.completed,
            due:        '',
            term:       '',
            page:       1,
            totalPages: 1,
            tasks:      [{},{},{},{},{}]
          }

  fetchTasks = (term, page, completed, due) => {
    axios.get(`/tasks.json?term=${term}&page=${page}&completed=${completed}&due=${due}`)
      .then((response) => {
        const { tasks, page, totalPages } = response.data
        this.setState({ tasks, due, term, page, totalPages })
      })
  }

  handleDueClick = selectedDue => {
    let { completed, due } = this.state
    const page = 1
    const term = ''
    if (selectedDue === due){
      due = ''
    }else{
      due = selectedDue
    }
    this.fetchTasks(term, page, completed, due)
  }

  handleSearch = event => {
    const term = event.target.value
    const page = 1
    const { completed, due } = this.state
    this.fetchTasks(term, page, completed, due)
  }

  changePage = page => {
    const { term, completed, due } = this.state
    this.fetchTasks(term, page, completed, due)
  }

  componentDidMount(){
    const { term, page, completed, due } = this.state
    this.fetchTasks(term, page, completed, due)
  }

  render(){
    const { term, tasks, due, page, totalPages } = this.state
    return(
      <div>
        <DueMenu due={due} handleDueClick={this.handleDueClick} />
        <Search
          invalid={ term.length > 0 && tasks.length === 0 }
          term={term}
          handleSearch={this.handleSearch}
        />
        <Table tasks={tasks}/>
        <Pagination
          page={page}
          totalPages={totalPages}
          changePage={this.changePage}
        />
      </div>
    )
  }
}

export default Tasks
