class PictureController < ApplicationController
  def index
    @picture_id = params[:id]
    @layout_width = LAYOUT_WIDTH_780
  end

  def add
    url = params[:picture][:url];
    hash = make_image_hash url;
    result = {};

    pic =  Picture.find_by_hash( hash )

    if( pic == nil )
      pic = Picture.new
      pic.hash = hash
      pic.url = url
      pic.save
      download_image_and_make_thumbnail url, hash
    end
    
    like = UserPicture.where("user_id = ? AND picture_id = ?", current_user[:id], pic.id).first

    if( like.nil? )
      user_pic = UserPicture.new
      user_pic.user_id = current_user[:id]
      user_pic.picture_id = pic.id
      user_pic.save
      pic.bookmark_count = pic.bookmark_count + 1
      pic.save
    end
    
    render :json => result
  end

  def del
    url = params[:picture][:url];
    hash = make_image_hash url;
    result = {}

    pic = Picture.find_by_hash hash

    user_pic = UserPicture.where("user_id = ? AND picture_id = ?", current_user[:id], pic.id).first

    unless(user_pic.nil?)
      user_pic.delete
      pic.bookmark_count = pic.bookmark_count - 1;
      pic.save
    end
    render :json => result
  end

  def is_bookmark
    url = params[:picture][:url];
    hash = make_image_hash url;
    result = {}

    pic = Picture.find_by_hash hash

    if(pic.nil?)
      result["is_bookmark"] = false
    else
      user_pic = UserPicture.where("user_id = ? AND picture_id = ?", current_user[:id], pic.id).first

      if( user_pic.nil? )
        result["is_bookmark"] = false        
      else
        result["is_bookmark"] = true        
      end
    end
    render :json => result
  end

  def download
    
    if( params[:image_type] == "original" )
      path = Rails.root.to_s + "/pictures/#{params[:hash]}"
    else
      path = Rails.root.to_s + "/pictures/#{params[:image_type]}/#{params[:hash]}"
    end

    send_file(path)

  end


  private
  
  def make_image_hash( url )
    require 'digest'
    Digest::SHA2.hexdigest url
  end

  def download_image_and_make_thumbnail( url, hash )
    require "RMagick"
    save_dir = Rails.root.to_s + "/pictures/"

    wget_command = "wget -O #{save_dir + hash} #{url}";
    system wget_command 

    sleep 2

    img = Magick::Image.read("#{save_dir + hash}")[0]
    img.resize_to_fill(112, 80).write("#{save_dir}small/#{hash}")
    img.resize_to_fill(175, 125).write("#{save_dir}medium/#{hash}")
    img.resize_to_fill(450).write("#{save_dir}big/#{hash}")

  end

end
