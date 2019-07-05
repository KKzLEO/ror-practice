class Stock < ActiveRecord::Base
  attr_accessible :company_id, :company_name, :company_href, :opening_price, :max_price, :min_price, :yesterday_closing_price, :today_closing_price, :volume, :up_down_value, :percentage_up_down_value

  require 'open-uri'
  require 'nokogiri'

  def self.load_data
    puts Time.now
    turnovers = []
    url = 'https://stock.wearn.com/qua.asp'
    htmlData = open(url).read
    # htmlData.force_encoding('UTF-8')
    parseData = Nokogiri::HTML.parse(htmlData)
    node = parseData.css('.stockalllistbg1, .stockalllistbg2')
    node.each do |row|
        column = row.css('td')
        stockData = {
          company_id: column[1].text.strip,
          company_name: column[2].css('font')[0].text.strip,
          company_href: column[2].css('a')[0]['href'],
          opening_price: column[3] == nil ? String.new : column[3].text.strip.to_f,
          max_price: column[4] == nil ? String.new : column[4].text.strip.to_f,
          min_price: column[5] == nil ? String.new : column[5].text.strip.to_f,
          yesterday_closing_price: column[6] == nil ? String.new : column[6].text.strip,
          today_closing_price: column[7] == nil ? String.new : column[7].text.strip.to_f,
          volume: column[8] == nil ? String.new : column[8].css('font')[0].text.strip,
          up_down_value: (column[11] == nil || column[11].css('font')[0] == nil ) ? String.new : column[11].css('font').text.strip,
          percentage_up_down_value: column[12] == nil ? String.new : column[12].text.strip
        }
        turnovers << stockData
    end
    turnovers.each do |turenover|
      flag = Stock.new(turenover)
      if flag.save
      else
        # puts flag.errors.full_messages
      end
    end
  end

  def self.filter(arg)
    # result = Stock.all if arg.count == nil
    # result = Stock.first(arg.count) if arg.count != nil
    # result = []
    # if arg.count != nil
    #   result = Stock.first(arg.count)
    # else
    #   result = Stock.all
    # end
    result = Stock.first(arg.count)
    Stock.first(50)
  end
end
