require 'rails_helper'

describe 'Author API -', type: :request do
  before do
    @fake_users = create_list(:user, 4)
  end

  it 'should show one author' do
    get author_path(@fake_users[0])
    author = JSON.parse response.body
    expect(author['username']).to eq @fake_users[0].username
  end

  it 'should show all authors' do
    get authors_path
    authors = JSON.parse response.body
    expect(authors.count).to eq 4
  end
end
