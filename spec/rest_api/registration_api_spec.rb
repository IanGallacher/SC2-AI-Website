require 'rails_helper'

describe 'User Registraion API -', type: :request do
  it 'should not register duplicate usernames'
  it 'should not register duplicate emails'
  it 'should setup role as regular user'
end
