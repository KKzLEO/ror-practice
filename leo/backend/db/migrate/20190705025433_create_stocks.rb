class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
      t.string :company_id, :null => false
      t.string :company_name
      t.string :company_href
      t.float :opening_price
      t.float :max_price
      t.float :min_price
      t.float :yesterday_closing_price
      t.float :today_closing_price
      t.float :volume
      t.float :up_down_value
      t.string :percentage_up_down_value
      t.string :status
      t.timestamps
    end
  end
end
