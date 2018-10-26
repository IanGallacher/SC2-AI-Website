require 'rails_helper'

RSpec.configure do |config|
  # Include our authentication helper in all of our request specs
  config.include Helpers::Authentication, type: :request

  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.swagger_root = Rails.root.to_s + '/swagger'

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:to_swagger' rake task, the complete Swagger will
  # be generated at the provided relative path under swagger_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a swagger_doc tag to the
  # the root example_group in your specs, e.g. describe '...', swagger_doc: 'v2/swagger.json'
  config.swagger_docs = {
    'v1/swagger.json' => {
      swagger: '2.0',
      info: {
        title: 'API V1',
        version: 'v1'
      },
      definitions: {
        author: {
          type: :object,
          properties: {
            id: { type: :integer },
            avatar: { type: :string, 'x-nullable': true },
            email: { type: :string },
            created_at: { type: :string },
            updated_at: { type: :string },
            github: { type: :string, 'x-nullable': true },
            website: { type: :string },
            username: { type: :string }
          },
          required: [ 'id', 'username' ]
        },
        bot: {
          type: :object,
          properties: {
            id: { type: :integer },
            owner_id: { type: :integer, 'x-nullable': true },
            author: { type: :string },
            match_count: { type: :integer },
            race: { type: :string },
            win_count: { type: :integer },
            current_mmr: { type: :integer }
          },
          required: [ 'id', 'owner_id', 'race' ]
        },
        bot_history: {
          type: :object,
          properties: {
            id: { type: :integer },
            bot_id: { type: :integer },
            mmr: { type: :integer },
            created_at: { type: :string },
            season_id: { type: :integer }
          },
          required: [ 'id', 'bot_id', 'mmr', 'season_id' ]
        },
        planned_game: {
          type: :object,
          properties: {
            id: { type: :integer },
            requested_on: { type: :string, 'x-nullable': true },
            computer_id: { type: :integer, 'x-nullable': true },
            season_id: { type: :integer }
          },
          required: [ 'computer_id', 'season_id' ]
        },
        season: {
          type: :object,
          properties:  {
            id: { type: :integer },
            name: { type: :string, 'x-nullable': true },
            start_date: { type: :string },
            end_date: { type: :string }
          },
          required: [ 'id', 'username' ]
        }
      },
      paths: {}
    }
  }
end
