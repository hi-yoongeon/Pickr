class UserController < ApplicationController

  def login
  end

  def loginView
    render :layout => "plain"
  end

  def signup

    puts params["data"]["User"]["userid"]

    render :text => "hihiho"
  end

  def signupView
    render :layout => "plain"
  end

  def logout

  end

end
