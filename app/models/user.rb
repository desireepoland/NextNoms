class User < ActiveRecord::Base
  has_many :restaurants, :through => :users_restaurants
  has_many :users_restaurants
  validates :name, presence: true

  def restaurants_for(filter = 'all')
    if filter == 'tried'
      restaurants.where(users_restaurants: {tried: true}).ordered
    elsif filter == 'active'
      restaurants.where(users_restaurants: {tried: false}).ordered
    else
      restaurants.ordered
    end
  end

  def self.find_or_create_from_omniauth(auth_hash)
    user = self.find_by(uid: auth_hash["uid"], provider: auth_hash['provider'])
    if !user.nil?
      return user
    else
      user = User.new
      user.uid = auth_hash["uid"]
      user.name = auth_hash["info"]["name"]
      user.provider = auth_hash["provider"]
      user.email = auth_hash["info"]["email"]
      user.avatar_url = auth_hash["info"]["image"]
      if user.save
        user
      else
        nil
      end
    end
  end
end
