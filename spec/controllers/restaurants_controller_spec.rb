require 'rails_helper'

RSpec.describe RestaurantsController, type: :controller do
  let (:user) { create(:user) }
  let (:restaurant) { create(:restaurant) }

  let(:create_params) do
    { user_id: 1,
      restaurant: {
        place_id: "54321"
      }
    }
  end

  describe "POST #create" do
    it "redirects to the root path" do
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


  describe "PATCH #update" do
  end

  describe "DESTROY #destroy" do
    # it "redirects to the root path" do
    #   delete :destroy, ....
    #   expect(subject).to redirect_to root_path
    # end
  end

end
