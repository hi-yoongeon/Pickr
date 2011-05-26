class CreatePictures < ActiveRecord::Migration
  def self.up
    create_table :pictures do |t|
      t.integer :user_id, :null => false
      t.string :path, :null => false
      t.string :hash, :null => false
      t.string :filename, :null => false
      t.integer :filesize, :null => false, :default => 0
      t.string :content_type, :null => false
      t.string :url, :null => false
      t.boolean :is_cached, :null => false, :default => 0
      t.boolean :is_thumbnail, :null => false, :default => 0
      t.integer :bookmark_count, :null => false, :default => 1
      t.integer :like_count, :null => false, :default => 0
      t.integer :dislike_count, :null => false, :default => 0
      t.integer :tag_count, :null => false, :default => 0
      t.integer :comment_count, :null => false, :default => 0
      t.text :additional_info

      t.timestamps
    end
  end

  def self.down
    drop_table :pictures
  end
end
