class RoutesController < ApplicationController
  # protect_from_forgery except: :destroy
  def invalid
    render json: { error: "invalid route" }
  end
end
