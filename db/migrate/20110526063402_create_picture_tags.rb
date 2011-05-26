class CreatePictureTags < ActiveRecord::Migration
  def self.up
    create_table :picture_tags do |t|
      t.integer :tag_id, :null => false
      t.integer :picture_id, :null => false
      t.integer :count, :null => false, :default => 1

      t.timestamps
    end
  end

  def self.down
    drop_table :picture_tags
  end
end
