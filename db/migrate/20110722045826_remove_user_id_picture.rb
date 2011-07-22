class RemoveUserIdPicture < ActiveRecord::Migration
  def self.up
    remove_column :pictures, :user_id
  end

  def self.down
    add_column :pictures, :user_id, :integer
  end
end
