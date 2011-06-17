class AlbumController < ApplicationController
  def index
    @userid = self.params['userid'];
  end

end
