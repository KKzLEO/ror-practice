class StockController < ApplicationController
  def query
    render json: Stock.filter(params)
  end

  def csv
    send_data Stock.to_csv(params)
  end
end
