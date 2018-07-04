require 'rails_helper'

describe 'Directory Structure' do
  it 'should have the correct directories' do
    expect(File.directory? 'public/replay').to be true
    expect(File.directory? 'public/user-upload').to be true
    expect(File.directory? 'public/user-upload/dll').to be true
    expect(File.directory? 'public/user-upload/avatar').to be true
  end
end
