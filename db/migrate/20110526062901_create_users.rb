class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :userid, :null => false
      t.string :password, :null => false
      t.integer :picture_count, :null => false, :default => 0
      t.integer :comment_count, :null => false, :default => 0
      t.integer :tag_count, :null => false, :default => 0

      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
