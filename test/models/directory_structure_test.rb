
require 'test_helper'

class DirectoryStructureTest < ActiveSupport::TestCase
  test "has replay folder" do
     assert File.directory? "public/replay"
  end
  test "has user-upload folder" do
     assert File.directory? "public/user-upload"
  end
  test "has dll folder" do
     assert File.directory? "public/user-upload/dll"
  end
  test "has avatar folder" do
     assert File.directory? "public/user-upload/avatar"
  end
end
