require "rails_helper"

RSpec.describe Task, type: :model do
  let(:user) do
    User.create(email: "some@guy.com", password: "password")
  end
  describe ".between" do
    it "returns tasks between a start date and an end date" do
      old_task    = user.tasks.create(
                      description:  "old",
                      due_date:     5.days.ago.to_date
                    )
      middle_task = user.tasks.create(
                      description:  "middle",
                      due_date:     Date.today
                    )
      future_task = user.tasks.create(
                      description: "future",
                      due_date:     5.days.from_now.to_date
                    )
      not_due     = user.tasks.create(
                      description:  "not due",
                      due_date:     nil
                    )

      tasks = Task.between(2.days.ago.to_date, 2.days.from_now.to_date)

      expect(tasks).to match_array([middle_task])
    end
  end

  describe ".search" do
    let(:ok){ user.tasks.create(description: "ok") }
    let(:hello){ user.tasks.create(description: "hello") }
    let(:goodbye){ user.tasks.create(description: "goodbye") }
    context "with all lowercase" do
      it "returns the tasks which match a search term" do
        tasks = Task.search("e")

        expect(tasks).to match_array([hello, goodbye])
      end
    end
    context "with case swapping" do
      it "returns case insensitive matches" do
        tasks = Task.search("E")

        expect(tasks).to match_array([hello, goodbye])
      end
    end
    context "with an empty string" do
      it "returns case insensitive matches" do
        tasks = Task.search("")

        expect(tasks).to match_array([hello, goodbye, ok])
      end
    end
  end

  describe "#badge_class" do
    context "when the task is past due" do
      it "returns badge badge-danger" do
        task  = user.tasks.create(
                  description:  "past due",
                  due_date:     Date.yesterday
                )

        badge_class = task.badge_class

        expect(badge_class).to eq("badge badge-danger")
      end
    end
    context "when the task is due soon" do
      it "returns badge badge-warning" do
        task  = user.tasks.create(
                  description:  "due soon",
                  due_date:     Date.tomorrow
                )

        badge_class = task.badge_class

        expect(badge_class).to eq("badge badge-warning")
      end
    end
    context "when the task is due later" do
      it "returns badge badge-success" do
        task  = user.tasks.create(
                  description:  "due later",
                  due_date:     10.days.from_now.to_date
                )

        badge_class = task.badge_class

        expect(badge_class).to eq("badge badge-success")
      end
    end
    context "when the task is not due" do
      it "returns an empty string" do
        task  = user.tasks.create(
                  description:  "not due",
                  due_date:     nil
                )

        badge_class = task.badge_class

        expect(badge_class).to eq("")
      end
    end
  end
end
