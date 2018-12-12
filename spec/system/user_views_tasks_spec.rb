require "rails_helper"

RSpec.describe "task display", type: :system, js: true do
  let(:user) do
    User.create(email: "some@guy.com", password: "password")
  end
  context "when the task is due in the past" do
    it "displays red" do
      user.tasks.create(description: "yesterday", due_date: Date.yesterday)

      sign_in(user)
      visit tasks_path
      sleep 1

      color = find('.due_date').native.css_value('background-color')
      expect(color).to eq("rgba(220, 53, 69, 1)")
    end
  end
  context "when the task is due soon" do
    it "displays yellow" do
      user.tasks.create(description: "today", due_date: Date.today)

      sign_in(user)
      visit tasks_path
      sleep 1

      color = find('.due_date').native.css_value('background-color')
      expect(color).to eq("rgba(255, 193, 7, 1)")
    end
  end
  context "when the task is due later" do
    it "displays green" do
      user.tasks.create(description: "tomorrow", due_date: 10.days.from_now.to_date)

      sign_in(user)
      visit tasks_path
      sleep 1

      color = find('.due_date').native.css_value('background-color')
      expect(color).to eq("rgba(40, 167, 69, 1)")
    end
  end
end
