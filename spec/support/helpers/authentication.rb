module Helpers
  module Authentication
    def sign_in_as_admin
      admin = FactoryBot.create(:user, username: 'admin', email: 'admin@example.com')
      admin.update_attributes(role: 'admin')
      post login_path, params: { username: 'admin', password: 'asdfasdf' }
    end
  end
end
