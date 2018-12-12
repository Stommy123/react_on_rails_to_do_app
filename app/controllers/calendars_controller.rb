class CalendarsController < ApplicationController

  def show
    respond_to do |format|
      format.html
      format.json do
        start_date  = Date.parse(params[:start_date])
        end_date    = Date.parse(params[:end_date])
        tasks       = current_user.tasks
                        .between(start_date, end_date)
                        .ordered
                        .group_by{ |task| task.due_date }
        render json: {
          startDate:  start_date,
          endDate:    end_date,
          tasks:      tasks
        }
      end
    end
  end

end
