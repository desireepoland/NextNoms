require 'rails_helper'

RSpec.describe SiteController, type: :controller do
  let (:user) { create(:user) }

  describe "GET 'index'" do
    it "is successful when logged in" do
      user = User.find_or_create_from_omniauth(OmniAuth.config.mock_auth[:facebook])
      session[:user_id] = user.id
      get :index
      expect(response.status).to eq 200
      expect(subject).to render_template :index
    end
    it "is successful when not logged in" do
      get :index
      expect(response.status).to eq 200
      expect(subject).to render_template :welcome
    end
  end
end
