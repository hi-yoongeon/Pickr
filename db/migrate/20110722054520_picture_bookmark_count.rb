class PictureBookmarkCount < ActiveRecord::Migration
  def self.up
    change_column :pictures, :bookmark_count, :integer, :null => false, :defailt => 0
  end

  def self.down
    change_column :pictures, :bookmark_count, :integer, :null => false, :defailt => 1
  end
end
