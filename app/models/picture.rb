class Picture < ActiveRecord::Base
  belongs_to :user
  has_many :likes 
  has_many :comments 
  has_many :picture_tags
  has_many :user_pictures
end
