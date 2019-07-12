class StockController < ApplicationController
  def query
    render json: Stock.filter(params)
  end

  def csv
    send_data Stock.to_csv(params)
  end

  def load_data
    render json: Stock.load_data
  end
end
