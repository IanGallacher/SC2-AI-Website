class AuthorsController < ApplicationController
  # protect_from_forgery except: :destroy
  def index
    render json: User.all
  end
  def show
    render json: User.find(params[:id])
  end
end
