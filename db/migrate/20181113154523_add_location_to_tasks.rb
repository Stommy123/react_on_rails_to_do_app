class AddLocationToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :latitude, :float
    add_column :tasks, :longitude, :float
    add_column :tasks, :ip, :string
    add_column :tasks, :street, :string
    add_column :tasks, :city, :string
    add_column :tasks, :state, :string
    add_column :tasks, :country, :string
  end
end
