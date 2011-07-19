class ApplicationController < ActionController::Base
  #protect_from_forgery
  before_filter :convert_access_token_to_user
  before_filter :init 
  before_filter :check_user_agent, :except => :browser_not_supported

  
  after_filter :temp

  LAYOUT_WIDTH_FULL = 0;
  LAYOUT_WIDTH_780 = 1;


  def init
    @layout_width = LAYOUT_WIDTH_FULL
    @controller_name = self.controller_name
    @current_user = current_user
  end

  def check_user_agent
    redirect_to "/notsupported" unless request.env["HTTP_USER_AGENT"].downcase.index("chrome")
  end

  def current_user
    session[:current_user]
  end

  def current_user=( current_user )
    session[:current_user] = current_user
  end

  def get_current_user( access_token )
    current_user["access_token"]
  end

  private 
  def convert_access_token_to_user
    return false if params[:access_token].nil?
    unless current_user.nil?
      return false if current_user[:access_token] == params[:access_token]
    end
    self.current_user = find_user_by_access_token params[:access_token]
  end

  def find_user_by_access_token( access_token )
    user = User.find_by_access_token access_token
    user unless user.nil?
  end

  def temp

  end

end
