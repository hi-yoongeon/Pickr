# -*- coding: utf-8 -*-
class UserController < ApplicationController

  def signin
    data = params[:user]
    result = {}
    user = User.find_by_userid data["userid"]


    if user.nil?
      result["code"] = 0
      result["message"] = "아이디가 올바르지 않습니다"
    else
      if user.has_password? data["password"]
        result["code"] = 200
        result["data"] = user
      else
        result["code"] = 0
        result["message"] = "비밀번호가 올바르지 않습니다"
      end
    end

    render :json => result
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
