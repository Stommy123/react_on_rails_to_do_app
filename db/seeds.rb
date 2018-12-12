# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: "some@guy.com", password: "password")

task = user.tasks.find_or_create_by(description: "Learn Models")
task.sub_tasks.find_or_create_by(description: "Learn Validations")
task.sub_tasks.find_or_create_by(description: "Learn to use 'g'")

task = user.tasks.find_or_create_by(description: "Learn Controllers")
task.update(due_date: 2.days.ago.to_date)

task = user.tasks.find_or_create_by(description: "Learn Views")
task.update(due_date: 2.days.from_now.to_date)

task = user.tasks.find_or_create_by(description: "Learn Migrations")
task.update(due_date: 1.week.from_now.to_date)

user.tasks.find_or_create_by(description: "Learn Git")
user.tasks.find_or_create_by(description: "Learn React")
user.tasks.find_or_create_by(description: "Learn JavaScript")
user.tasks.find_or_create_by(description: "Learn HTML")
user.tasks.find_or_create_by(description: "Learn CSS")

100.times do
  t = user.tasks.new(
        description: Faker::ChuckNorris.fact,
        due_date: Faker::Date.between(3.months.ago, 3.months.from_now),
        completed: [true, false].sample
      )
  t.due_date = nil if [true, false, false].sample
  t.save
end

(1..87).each do |street_num|
  street = "#{street_num}01 Collins Ave"
  user.tasks.create(
    description: "Visit #{street}",
    street: street,
    city: "Miami Beach",
    state: "Florida",
    country: "United States"
  )
  sleep 0.5
end

puts "#{Task.count} tasks in the system..."
puts "#{SubTask.count} sub_tasks in the system..."
