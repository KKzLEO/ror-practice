class Stock < ActiveRecord::Base
  attr_accessible :company_id,
                  :company_name,
                  :company_href,
                  :opening_price,
                  :max_price,
                  :min_price,
                  :yesterday_closing_price,
                  :today_closing_price,
                  :volume,
                  :up_down_value,
                  :percentage_up_down_value,
                  :status
  require 'csv'

  extend CrawlHelper

  def self.load_data
    delete_duplicated_stock_data
    Stock.create(crawl_stock_data)
  end

  def self.filter(arg)
    arg[:count] ||= Stock.count
    arg[:date] ||= Date.today.to_s
    arg[:sortMethod] ||= 'asc'
    arg[:sortField] ||= 'company_id'
    condition = 'DATE(created_at) = ? AND company_id = ?' unless arg[:companyId].nil?
    condition = 'DATE(created_at) = ? OR company_id = ?' if arg[:companyId].nil?

    Stock.where(condition, Date.parse(arg[:date]), arg[:companyId])
         .order("#{arg[:sortField]} #{arg[:sortMethod]}")
         .first(arg[:count].to_i)
  end

  def self.to_csv(arg)
    attributes = %w{id company_id company_name company_href opening_price max_price min_price yesterday_closing_price today_closing_price volume up_down_value percentage_up_down_value}

    CSV.generate do |csv|
      csv << attributes
      filter(arg).each do |stock|
        csv << attributes.map { |attr| stock.send(attr) }
      end
    end
  end

  def self.delete_duplicated_stock_data
    Stock.where('DATE(created_at) = ?', Date.today.to_s).delete_all
  end

  def self.crawl_stock_data
    stock_data_list = []
    url = 'https://stock.wearn.com/qua.asp'
    selector = ['.stockalllistbg1', '.stockalllistbg2']
    crawl_data(url, selector).each do |row|
      row = row.css('td')
      stock_data = {
        company_id: row[1].text.strip,
        company_name: row[2].css('font')[0].text.strip,
        company_href: row[2].css('a')[0]['href'],
        opening_price: row[3].text.strip.to_f,
        max_price: row[4].text.strip.to_f,
        min_price: row[5].text.strip.to_f,
        yesterday_closing_price: row[6].text.strip,
        today_closing_price: row[7].text.strip.to_f,
        volume: row[8].css('font')[0].text.strip,
        status: row[10].text.strip == '▲' ? 'up' : row[10].text.strip == '▼' ? 'down' : 'none',
        up_down_value: row[11].css('font').text.strip.to_f,
        percentage_up_down_value: row[12].text.strip
      }
      stock_data_list << stock_data
    end
    stock_data_list
  end
end
