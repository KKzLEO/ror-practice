class StockController < ApplicationController
    require 'rest-client'
    require 'open-uri'
    require 'nokogiri'

    def query
        result = []
        url = 'https://stock.wearn.com/qua.asp'
        htmlData = open(url).read
        htmlData.force_encoding('big5')
        parseData = Nokogiri::HTML.parse(htmlData)
        node = parseData.css('.stockalllistbg1, .stockalllistbg2')
        node.each do |row|
            column = row.css('td')
            stock = Stock.new
            stock.id = column[1].text
            stock.company_name = column[2].css('font')[0].text
            stock.company_href = column[2].css('a').attr('href')
            stock.start_price = column[3].text.strip
            stock.max_price = column[4].text.to_f
            stock.min_price = column[5].text
            stock.yesterday_closing_price = column[6].text
            stock.today_closing_price = column[7].text
            stock.volume = column[8].css('a > font')[0].text
            stock.up_down_value = column[9].css('>font')[0].text
            stock.percentage_up_down_value = column[10].text
            result << stock
        end
        @hi = 'hello'
    end

    
end
