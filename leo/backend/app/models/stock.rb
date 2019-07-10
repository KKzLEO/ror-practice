# frozen_string_literal: true

# comment
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

  require 'open-uri'
  require 'nokogiri'
  require 'csv'

  def self.load_data
    turnovers = []
    url = 'https://stock.wearn.com/qua.asp'
    html_data = open(url).read
    # htmlData.force_encoding('UTF-8')
    parse_data = Nokogiri::HTML.parse(html_data)
    node = parse_data.css('.stockalllistbg1, .stockalllistbg2')
    node.each do |row|
      column = row.css('td')
      if !column[10].nil?
        status = 'up' if column[10].text.strip == '▲'
        status = 'down' if column[10].text.strip == '▼'
      else
        status = 'none'
      end

      stock_data = {
        company_id: column[1].text.strip,
        company_name: column[2].css('font')[0].text.strip,
        company_href: column[2].css('a')[0]['href'],
        opening_price: column[3].nil? ? 0 : column[3].text.strip.to_f,
        max_price: column[4].nil? ? 0 : column[4].text.strip.to_f,
        min_price: column[5].nil? ? 0 : column[5].text.strip.to_f,
        yesterday_closing_price: column[6].nil? ? '' : column[6].text.strip,
        today_closing_price: column[7].nil? ? 0 : column[7].text.strip.to_f,
        volume: column[8].nil? ? '' : column[8].css('font')[0].text.strip,
        status: status,
        up_down_value: column[11].nil? || column[11].css('font')[0].nil? ? 0 : column[11].css('font').text.strip.to_f,
        percentage_up_down_value: column[12].nil? ? '' : column[12].text.strip
      }
      turnovers << stock_data
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
end
