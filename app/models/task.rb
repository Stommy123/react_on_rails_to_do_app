class Task < ApplicationRecord
  validates :description, presence: true

  geocoded_by :address
  after_validation :geocode, if: :needs_geocode?

  has_many :sub_tasks, dependent: :destroy
  belongs_to :user

  scope :completed, ->  { where(completed: true) }
  scope :pending,   ->  { where(completed: false) }
  scope :ordered,   ->  { order(due_date: :asc) }
  scope :not_due,   ->  { where(due_date: nil) }
  scope :past_due,  ->  { where("due_date < ?", Date.today) }
  scope :due_later, ->  { where("due_date >= ?", 1.week.from_now.to_date) }
  scope :due_soon,  ->  { where("due_date > ? and due_date < ?", Date.today, 1.week.from_now.to_date) }
  scope :search,    ->  (term) { where("description ilike ?", "%#{term}%") }
  scope :between,   ->  (start_date, end_date) do
                          where(
                            "due_date is not null and due_date >= ? and due_date <= ?",
                            start_date, end_date
                          )
                        end

  def address
    [street, city, state, country].compact.join(', ')
  end

  def due_soon?
    due_date && due_date >= Date.today && due_date < 1.week.from_now.to_date
  end

  def due_later?
    due_date && due_date >= 1.week.from_now.to_date
  end

  def past_due?
    due_date && due_date.past?
  end

  def not_due?
    due_date.nil?
  end

  def formatted_due_date
    due_date&.strftime('%-m/%-d/%y')
  end

  def badge_class
    if due_later?
      "badge badge-success"
    elsif due_soon?
      "badge badge-warning"
    elsif past_due?
      "badge badge-danger"
    else
      ""
    end
  end

  def location
    "/tasks/#{id}/sub_tasks"
  end

  def needs_geocode?
    address.present? && latitude.nil? && longitude.nil?
  end

  def as_json(options={})
    {
      id:           id,
      description:  description,
      completed:    completed,
      due_date:     formatted_due_date,
      location:     location,
      badge_class:  badge_class,
      icon:         completed? ? "checked" : "cancel"
    }
  end
end
