class Picture < ActiveRecord::Base
  belongs_to :user
  has_many :likes :comments :picture_tags
end
