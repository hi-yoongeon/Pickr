class MainController < ApplicationController
  def home
    
  end

  def browser_not_supported
    @layout_width = LAYOUT_WIDTH_780
    @user_agent = request.env['HTTP_USER_AGENT']
  end
end
