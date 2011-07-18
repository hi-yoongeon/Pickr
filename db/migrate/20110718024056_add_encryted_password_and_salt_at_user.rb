class AddEncrytedPasswordAndSaltAtUser < ActiveRecord::Migration
  def self.up
    add_column :users, :encrypted_password, :string
    add_column :users, :salt, :string
    remove_column :users, :password
  end

  def self.down
    remove_column :users, :encrypted_password
    remove_column :users, :salt
    add_colum :users, :password, :string
  end
end
