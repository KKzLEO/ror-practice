class StockController < ApplicationController
  def query
    respond_to do |format|
      format.json { render json: Stock.filter(params) }
      format.csv { send_data Stock.to_csv(params) }
    end
    # render json: Stock.filter(params)
  end

  def csv
    send_data Stock.to_csv(params)
  end
end
