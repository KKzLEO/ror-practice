class StockFilterArg
    attr_accessor :sort_method
    attr_accessor :sort_field
    attr_accessor :count
    attr_accessor :date
    attr_accessor :id

    def initialize()
        @sort_method = 'asc'
        @count = 50
    end
end