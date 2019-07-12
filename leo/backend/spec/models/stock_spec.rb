require 'rails_helper'
require 'Stock.rb'

RSpec.describe Stock do
  describe 'stock crawl method' do
    context '.crawl_stock_data case 1' do
      before do
        allow(Stock).to receive(:crawl_data)
          .and_return(Nokogiri::HTML(attributes_for(:stock).fetch(:html_case_1)).css('.stockalllistbg1'))
      end
      context 'test type' do
        subject { Stock.crawl_stock_data }
        it { is_expected.to be_an_instance_of(Array) }
        it { is_expected.to_not be_empty }
      end
      context 'test content' do
        subject { Stock.crawl_stock_data.first }
        it 'company id' do
          expect(subject[:company_id]).to eq('2371')
        end
        it 'company name' do
          expect(subject[:company_name]).to eq('大同')
        end
        it 'company href' do
          expect(subject[:company_href]).to eq('http://stock.wearn.com/a2371.html')
        end
        it 'company opening price' do
          expect(subject[:opening_price]).to eq(18.85)
        end
        it 'company max price' do
          expect(subject[:max_price]).to eq(19.85)
        end
        it 'company min price' do
          expect(subject[:min_price]).to eq(16.65)
        end
        it 'stock status' do
          expect(subject[:status]).to eq('down')
        end
      end
    end
    context '.crawl_stock_data case 2' do
      before do
        allow(Stock).to receive(:crawl_data)
          .and_return(Nokogiri::HTML(attributes_for(:stock).fetch(:html_case_2)).css('.stockalllistbg1'))
      end
      context 'test type' do
        subject { Stock.crawl_stock_data }
        it { is_expected.to be_an_instance_of(Array) }
        it { is_expected.to_not be_empty }
      end
      context 'test content' do
        subject { Stock.crawl_stock_data.first }
        it 'company id' do
          expect(subject[:company_id]).to eq('2372')
        end
        it 'stock status' do
          expect(subject[:status]).to eq('up')
        end
      end
    end
    context '.crawl_stock_data empty case' do
      before do
        allow(Stock).to receive(:crawl_data)
          .and_return(Nokogiri::HTML(attributes_for(:stock).fetch(:html_empty)).css('.stockalllistbg1'))
      end
      context 'test type' do
        subject { Stock.crawl_stock_data }
        it { is_expected.to be_an_instance_of(Array) }
        it { is_expected.to be_empty }
      end
    end
  end
end
