require 'rails_helper'

RSpec.describe IdentitiesController, type: :controller do
  describe "new" do
    it "renders new template" do
      get :new
      expect(response.status).to eq 200
    end
  end
end
