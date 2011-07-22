class RemoveColumsPicture < ActiveRecord::Migration
  def self.up
    remove_column :pictures, :filename
    remove_column :pictures, :filesize
    remove_column :pictures, :content_type
    remove_column :pictures, :is_cached
    remove_column :pictures, :additional_info
  end

  def self.down
    add_column :pictures, :filename, :string
    add_column :pictures, :filesize, :integer
    add_column :pictures, :content_type, :string
    add_column :pictures, :is_cached, :boolean
    add_column :pictures, :additional_info, :string
  end
end
