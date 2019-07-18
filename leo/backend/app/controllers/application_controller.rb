class ApplicationController < ActionController::Base
  protect_from_forgery
  include ErrorHandler
end
