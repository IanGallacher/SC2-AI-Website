class UserBotsController < ApplicationController
  def index
    puts "params"
    puts params
    render json: User.find(params[:user_id]).bots
  end
end
