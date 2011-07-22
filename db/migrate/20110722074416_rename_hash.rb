class RenameHash < ActiveRecord::Migration
  def self.up
    rename_column :pictures, :hash, :url_hashed
  end

  def self.down
    rename_column :pictures, :url_hashed, :hash
  end
end
