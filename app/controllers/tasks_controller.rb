class TasksController < ApplicationController
  before_action :set_task, only: [:destroy, :update]
  before_action :set_tasks, only: [:index]
  # GET /tasks
  def index
    respond_to do |format|
      format.html do
        @coordinates = request.location.coordinates
        @task = Task.new
      end
      format.json do
        page        = (params[:page] || 1).to_i
        per_page    = 5
        total_pages = (@tasks.count.to_f / per_page).ceil
        total_pages = 1 if total_pages.zero?
        @tasks      = @tasks.paginate(page: page, per_page: per_page)
        render json:  {
          tasks:      @tasks,
          page:       page,
          totalPages: total_pages
        }
      end
    end
  end

  # POST /tasks
  def create
    # coordinates = request.location.coordinates
    # coordinates = [0.0, 0.0] if coordinates.empty?
    # coordinates = {latitude: coordinates.first, longitude: coordinates.last}
    @task = current_user.tasks.new(task_params)



    if @task.save
      respond_to do |format|
        format.html do
          redirect_back fallback_location: root_path,
            notice: 'Task was successfully created.'
        end
        format.json do
          render json: @task
        end
        format.js do
          render :create
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_back fallback_location: root_path,
            alert: "Could not create task: #{@task.errors.full_messages.join(', ')}"
        end
        format.json do
          render json: { errors: @task.errors.full_messages }, status: 422
        end
      end
    end
  end

  # PUT/PATCH /tasks/1
  def update
    @task.update(completed: !@task.completed)
    redirect_to task_sub_tasks_path(@task),
      notice: "Task was successfully updated."
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
    redirect_to root_path,
      notice: 'Task was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = current_user.tasks.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      if params[:use_current_location]
          params.require(:task)
            .permit(
              :description,
              :due_date,
              :latitude,
              :longitude
            )
      else
          params.require(:task)
            .permit(
              :description,
              :due_date,
              :street,
              :city,
              :state,
              :country
            )
      end

    end

    def set_tasks
      @tasks  = current_user.tasks.ordered
      @tasks  = case params[:completed]
                when "completed"
                  @tasks.completed
                when "pending"
                  @tasks.pending
                else
                  @tasks
                end
      @tasks  = case params[:due]
                when "due_soon"
                  @tasks.due_soon
                when "due_later"
                  @tasks.due_later
                when "past_due"
                  @tasks.past_due
                when "not_due"
                  @tasks.not_due
                else
                  @tasks
                end
      @tasks  = @tasks.search(params[:term])
    end
end
