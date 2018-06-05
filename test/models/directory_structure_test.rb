
require 'test_helper'

class DirectoryStructureTest < ActiveSupport::TestCase
  test "has replay folder" do
     assert File.directory? "public/replay"
  end
  test "has upload folder" do
     assert File.directory? "public/user-upload"
  end
end
