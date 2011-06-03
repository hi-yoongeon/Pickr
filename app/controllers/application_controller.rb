class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :init 
  before_filter :check_user_agent, :except => :browser_not_supported

  LAYOUT_WIDTH_FULL = 0;
  LAYOUT_WIDTH_780 = 1;


  def init
    @layout_width = LAYOUT_WIDTH_FULL
  end

  def check_user_agent
    redirect_to "/notsupported" unless request.env["HTTP_USER_AGENT"].downcase.index("chrome")
      
  end

end
