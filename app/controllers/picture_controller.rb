class PictureController < ApplicationController
  def index
    @picture_id = params[:id]
    @layout_width = LAYOUT_WIDTH_780
  end

end
