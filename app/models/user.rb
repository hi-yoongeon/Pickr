require 'digest'
class User < ActiveRecord::Base
  has_many :likes
  has_many :pictures
  has_many :comments

  attr_accessor :password
  before_save :encrypt_password

  validates :userid, :uniqueness => true

  def has_password?( submitted_password )
    encrypted_password == encrypt( submitted_password )
  end

  private
  def encrypt_password
    self.salt = make_salt if new_record?
    self.encrypted_password = encrypt( password )
  end

  def encrypt( string )
    secure_hash( "#{salt}--#{string}" )
  end

  def make_salt
    secure_hash( "#{Time.now.utc}--#{password}" )
  end

  def secure_hash( string )
    Digest::SHA2.hexdigest( string )
  end

end
