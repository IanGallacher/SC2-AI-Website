require 'swagger_helper'

describe 'Author API -', type: :request do
  path '/api/authors' do
    get 'Retrieves all authors' do
      produces 'application/json'

      response '200', 'all authors found' do
        schema type: 'array', items: { '$ref' => '#/definitions/author' }
        before do
          create_list(:user, 4)
        end

        it 'should show all authors' do
          get authors_path
          authors = JSON.parse response.body
          expect(authors.count).to eq 4
        end
      end
    end
  end

  path '/api/authors/{id}' do
    get 'Retrieves a single author' do
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'author found' do
        schema '$ref' => '#/definitions/author'
        let (:id) { create(:user).id }
        run_test!
      end
    end
  end
end
