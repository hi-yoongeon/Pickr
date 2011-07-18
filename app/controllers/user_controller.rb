# -*- coding: utf-8 -*-
class UserController < ApplicationController

  def signin
    
    user = params[:user]

    d = User.authenticate( user["userid"], user["password"] )

    puts d


    render :nothing => true

  end

  def signinView
    render :layout => "plain"
  end

  def signup
    user = User.new params[:user]
    result = {}
    
    if user.save == true
      result["code"] = 200
      result["data"] = user
    else
      result["code"] = 0
      result["message"] = "아이디가 중복됩니다."
    end

    render :json => result

  end

  def signupView
    render :layout => "plain"
  end

  def signout

  end

end
