class Identity < OmniAuth::Identity::Models::ActiveRecord
  validates_presence_of :name
  validates :email, presence: true, uniqueness: true
  # validates_format_of :email, :with => /^[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}$/i
end
