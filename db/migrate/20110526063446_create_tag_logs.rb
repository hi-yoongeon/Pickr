class CreateTagLogs < ActiveRecord::Migration
  def self.up
    create_table :tag_logs do |t|
      t.integer :tag_id, :null => false
      t.integer :user_id, :null => false
      t.integer :picture_id, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :tag_logs
  end
end
