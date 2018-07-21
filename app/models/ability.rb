class Ability
  include CanCan::Ability

  def initialize(user)
    signed_in = user.present?
    user ||= User.new
    can :read, :all
    #cannot :read, GameResult unless signed_in
    can :create, GameResult if user.role == 'admin'
    can :create, Bot if signed_in
    can :update, Bot do |bot|
      (signed_in && bot.owner_id == user.id) || user.role == 'admin'
    end

    can :destroy, Bot do |bot|
      (signed_in && bot.owner_id == user.id) || user.role == 'admin'
    end

    can :create, User, id: user.id
    can :update, User do |u|
      (signed_in && u.id == user.id) || user.role == 'admin'
    end
  end
end
