import React from 'react'

const ModalForm = props => (
  <form style={{width: '100%'}} onSubmit={props.createTask}>
    <div className="form-group">
      <div className="custom-control" style={{paddingLeft: 0}}>
        <input
          type="text"
          className={
            props.task.description.length > 0 ?
              "form-control" : props.task.errors.length > 0 ?
              "form-control is-invalid" : "form-control"
          }
          value={props.task.description}
          onChange={props.handleDescriptionChange}
        />
        <div className="invalid-feedback">
          { props.task.errors.join(', ') }
        </div>
      </div>
    </div>
    <button type="submit" className="btn btn-primary">
      Create Task
    </button>
  </form>
)

export default ModalForm
