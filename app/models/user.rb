class User < ActiveRecord::Base
  def self.find_or_create_from_omniauth(auth_hash)
    user = self.find_by(uid: auth_hash["uid"])
    if !user.nil?
      return user
    else
      user = User.new
      user.uid = auth_hash["uid"]
      user.name = auth_hash["info"]["name"]
      user.provider   = auth_hash["provider"]
      user.avatar_url = auth_hash["info"]["image"]
      if user.save
        user
      else
        nil
      end
    end
  end
end
