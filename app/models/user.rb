class User < ActiveRecord::Base
  has_many :likes :pictures :comments
end
