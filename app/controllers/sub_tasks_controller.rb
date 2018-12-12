class SubTasksController < ApplicationController
  before_action :set_task, only: [:index, :create]
  before_action :set_sub_task, only: [:destroy, :update]

  def create
    @sub_task = @task.sub_tasks.new(sub_task_params)
    if @sub_task.save
      redirect_to task_sub_tasks_path(@task),
        notice: 'SubTask was successfully created.'
    else
      redirect_to task_sub_tasks_path(@task),
        alert: "Could not create SubTask: #{@sub_task.errors.full_messages.join(', ')}"
    end
  end

  def index
    @sub_tasks = @task.sub_tasks
    @sub_task = SubTask.new
  end

  def update
    @sub_task.update(completed: !@sub_task.completed)
    redirect_to task_sub_tasks_path(@sub_task.task),
      notice: 'SubTask was successfully updated.'
  end

  def destroy
    @sub_task.destroy
    redirect_to task_sub_tasks_path(@sub_task.task),
      notice: 'SubTask was successfully destroyed.'
  end

  private

  def set_task
    @task = Task.find(params[:task_id])
  end

  def set_sub_task
    @sub_task = SubTask.find(params[:id])
  end

  def sub_task_params
    params.require(:sub_task).permit(:description)
  end
end
