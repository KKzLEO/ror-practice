module CrawlHelper
  require 'open-uri'
  require 'nokogiri'

  def crawl_data(url, selector = [])
    html_data = open(url).read
    html_data.force_encoding('big5')
    html_data.encode!('utf-8', undef: :replace, replace: '?', invalid: :replace)
    parse_data = Nokogiri::HTML(html_data)
    parse_data.css(selector.join(', '))
  end
end
