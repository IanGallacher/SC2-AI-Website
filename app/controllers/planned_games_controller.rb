class PlannedGamesController < ApplicationController
  before_action :set_planned_game, only: [:show, :edit, :update, :destroy]

  # GET /planned_games
  def index
    @planned_games = PlannedGame.all
  end

  # GET /planned_games/1
  def show
  end

  # GET /planned_games/new
  def new
    @planned_game = PlannedGame.new
  end

  # GET /planned_games/1/edit
  def edit
  end

  # POST /planned_games
  def create
    @planned_game = PlannedGame.new(planned_game_params)

    if @planned_game.save
      redirect_to @planned_game, notice: 'Planned game was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /planned_games/1
  def update
    if @planned_game.update(planned_game_params)
      redirect_to @planned_game, notice: 'Planned game was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /planned_games/1
  def destroy
    @planned_game.destroy
    redirect_to planned_games_url, notice: 'Planned game was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_planned_game
      @planned_game = PlannedGame.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def planned_game_params
      params.require(:planned_game).permit(:season_id)
    end
end
