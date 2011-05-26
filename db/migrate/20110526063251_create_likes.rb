class CreateLikes < ActiveRecord::Migration
  def self.up
    create_table :likes do |t|
      t.integer :picture_id, :null => false
      t.integer :user_id, :null => false
      t.string :type, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :likes
  end
end
