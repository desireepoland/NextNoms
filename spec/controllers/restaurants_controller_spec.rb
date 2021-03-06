require 'rails_helper'

RSpec.describe RestaurantsController, type: :controller do
  let (:user) { create(:user) }
  let (:restaurant) { create(:restaurant) }
  let (:users_restaurant) { create(:users_restaurant) }

  let(:create_params) do
    { user_id: 1,
      restaurant: {
        place_id: "54321"
      }
    }
  end

  describe "POST #create" do
    it "redirects to the root path when logged out" do
      post :create, create_params, user_id: user.id
      expect(response.status).to eq 302
      expect(subject).to redirect_to root_path
    end
    it "adds a new restaurant to the user" do
      @restaurants = user.restaurants.all.count
      post :create, create_params, user_id: user.id
      expect(user.restaurants.all.count).to eq(@restaurants + 1)
    end
  end

  describe "GET #roulette" do
    it "redirects to root when logged out" do
      get :roulette
      expect(response.status).to eq 302
      expect(subject).to redirect_to root_path
    end
    context "logged in" do
      before do
        user = User.find_or_create_from_omniauth(OmniAuth.config.mock_auth[:facebook])
        session[:user_id] = user.id
      end
      it "renders roulette" do
        get :roulette
        expect(response.status).to eq 200
        expect(subject).to render_template :roulette
      end
    end
  end

  describe "GET #discover" do
    it "redirects to root when logged out" do
      get :discover
      expect(response.status).to eq 302
      expect(subject).to redirect_to root_path
    end
    context "logged in" do
      before do
        user = User.find_or_create_from_omniauth(OmniAuth.config.mock_auth[:facebook])
        session[:user_id] = user.id
      end
      it "renders discover" do
        get :discover
        expect(response.status).to eq 200
        expect(subject).to render_template :discover
      end
    end
  end


  describe "PATCH #update" do
    context "logged in" do
      before do
        user = User.find_or_create_from_omniauth(OmniAuth.config.mock_auth[:facebook])
        session[:user_id] = user.id
      end
      it "redirects to root after successful update" do
        patch :update, id: users_restaurant.id
        expect(response.status).to eq 302
        expect(subject).to redirect_to root_path
      end
    end
  end

  describe "DELETE #destroy" do
    context "logged in" do
      before do
        user = User.find_or_create_from_omniauth(OmniAuth.config.mock_auth[:facebook])
        session[:user_id] = user.id
      end
      it "redirects to the root path when logged out" do
        users_restaurant
        delete :destroy, id: users_restaurant.id
        expect(response.status).to eq 302
        expect(subject).to redirect_to root_path
      end
    end
  end

end
