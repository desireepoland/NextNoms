require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  context "when using facebook authentication" do
    context "is successful" do
      before { request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:facebook] }

      it "redirects to home page" do
        get :create, provider: :facebook
        expect(response).to redirect_to root_path
      end

      it "creates a user" do
        expect { get :create, provider: :facebook }.to change(User, :count).by(1)
      end

      it "assigns the @user var" do
        get :create, provider: :facebook
        expect(assigns(:user)).to be_an_instance_of User
      end

      it "assigns the session[:user_id]" do
        get :create, provider: :facebook
        expect(session[:user_id]).to eq assigns(:user).id
      end
    end

    context "when the user has already signed up" do
      before { request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:facebook] }
      let!(:user) { User.find_or_create_from_omniauth(OmniAuth.config.mock_auth[:facebook]) }

      it "doesn't create another user" do
        expect { get :create, provider: :facebook }.to change(User, :count).by(0)
      end

      it "assigns the session[:user_id]" do
        get :create, provider: :facebook
        expect(session[:user_id]).to eq user.id
      end
    end

    context "fails on :facebook" do
      before { request.env["omniauth.auth"] = :invalid_credential }

      it "redirect to home with flash error" do
        get :create, provider: :facebook
        expect(response).to redirect_to root_path
        expect(flash[:notice]).to include "Failed to authenticate"
      end
    end

    context "when failing to save the user" do
      before {
        request.env["omniauth.auth"] = {"uid" => "1234", "info" => {}}
      }

      it "redirect to home with flash error" do
        get :create, provider: :facebook
        expect(response).to redirect_to root_path
        expect(flash[:notice]).to include "Failed to save the user"
      end
    end

    describe "destroy" do
      it "removes user_id from session" do
        delete :destroy
        expect(session[:user_id]).to be_nil
      end
      it "redirects to root path" do
        delete :destroy
        expect(subject).to redirect_to root_path
      end
    end
  end

end
