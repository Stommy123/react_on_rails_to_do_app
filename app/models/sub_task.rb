class SubTask < ApplicationRecord
  validates :description, presence: true
  belongs_to :task
end
