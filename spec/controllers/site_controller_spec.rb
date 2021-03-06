require 'rails_helper'

RSpec.describe SiteController, type: :controller do
  let (:user) { create(:user) }

  describe "GET 'index'" do
    context "when logged in" do
      before do
        user = User.find_or_create_from_omniauth(OmniAuth.config.mock_auth[:facebook])
        session[:user_id] = user.id
      end
      it "is successful when logged in" do
        get :index
        expect(response.status).to eq 200
        expect(subject).to render_template :index
      end
      it "filters for active" do
        cookies[:filter] = "active"
        get :index
        expect(response.status).to eq 200
        expect(subject).to render_template :index
      end
      it "filters for tried" do
        cookies[:filter] = "tried"
        get :index
        expect(response.status).to eq 200
        expect(subject).to render_template :index
      end
    end
    it "is successful when not logged in" do
      get :index
      expect(response.status).to eq 200
      expect(subject).to render_template :welcome
    end
  end

  describe "GET 'about'" do
    it "renders the abput template" do
      get :about
      expect(subject).to render_template :about
    end
  end
end
