class MapsController < ApplicationController

  def show
    respond_to do |format|
      format.html do
        @coordinates  = request.location.coordinates.reverse
        @task         = current_user.tasks.new
      end
      format.json do
        @tasks  = current_user.tasks.near([params[:lat], params[:lng]], 50)
        render json:  {
                        type: "FeatureCollection",
                        features: @tasks.map do |task|
                          {
                            type: "Feature",
                            properties: task,
                            geometry: {
                              type: "Point",
                              coordinates: task.to_coordinates.reverse
                            }
                          }
                        end
                      }
      end
    end
  end

end
