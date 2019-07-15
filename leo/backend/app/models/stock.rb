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

  extend Crawler

  DEFAULT_QUERY_COUNT = 50

  def self.load_data
    delete_duplicated_stock_data
    Stock.create(crawl_stock_data)
  end

  def self.filter(arg)
    load_data if is_stock_data_empty_today

    count = arg[:count] || DEFAULT_QUERY_COUNT
    date = arg[:date] || Date.today.to_s
    sort_method = arg[:sortMethod] || 'asc'
    sort_field = arg[:sortField] || 'company_id'
    operator = arg[:companyId].blank? ? 'OR' : 'AND'

    Stock.where("DATE(created_at) = ? #{operator} company_id = ?", Date.parse(date), arg[:companyId])
         .order("#{sort_field} #{sort_method}")
         .first(count.to_i)
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

  def self.is_stock_data_empty_today
    is_empty = Stock.where('DATE(created_at) = ?', Date.today.to_s).empty?
    error_message = 'the crontab of fetching stock data is failed. The stock data is empty.'
    logger.debug error_message if is_empty
    is_empty
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
        yesterday_closing_price: row[6].text.strip.to_f,
        today_closing_price: row[7].text.strip.to_f,
        volume: row[8].css('font')[0].text.strip.gsub(',', '').to_f,
        status: row[10].text.strip == '▲' ? 'up' : row[10].text.strip == '▼' ? 'down' : 'none',
        up_down_value: row[11].css('font').text.strip.to_f,
        percentage_up_down_value: row[12].text.gsub(/[[:space:]]/, '')
      }
      stock_data_list << stock_data
    end
    stock_data_list
  end
end
