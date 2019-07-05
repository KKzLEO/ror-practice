class StockController < ApplicationController

    def query
        request = {
            count: params[:count].to_i
        }
        # request['id'] = params[:id] if params[:id] != nil
        # request['count'] = params[:count].to_i if params[:count] != nil



        render json: Stock.first(request[:count])
    end
end
