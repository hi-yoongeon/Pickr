class AlbumController < ApplicationController
  def index
    @userid = params['userid']
    user = User.find_by_userid @userid
    @userPictures = UserPicture.where("user_id = ?", user.id)
  end

end
