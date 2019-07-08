class StockController < ApplicationController
  def query
    render json: Stock.filter(params)
  end
end
