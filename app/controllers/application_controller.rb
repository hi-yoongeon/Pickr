class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :init

  def init

  end

end
