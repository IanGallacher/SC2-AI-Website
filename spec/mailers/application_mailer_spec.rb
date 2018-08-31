require 'rails_helper'

describe 'Password Mailer -' do
  it "should send mail" do
    # Create the email and store it for further assertions
    email = MyMailer.reset_password_instructions(User.first, 'faketoken')

    email.deliver_now

    # Test the body of the sent email contains what we expect it to
    assert_equal ['me@example.com'], email.from
    assert_equal ['friend@example.com'], email.to
    assert_equal 'You have been invited by me@example.com', email.subject
    assert_equal read_fixture('invite').join, email.body.to_s
  end
end