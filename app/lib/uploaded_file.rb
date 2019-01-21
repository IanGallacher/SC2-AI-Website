class UploadedFile
  def initialize(uploaded_file)
    @uploaded_file = uploaded_file
  end
    
  def write_to_public(filename)
    File.open(Rails.root.join('public', 'replays', filename), 'wb') do |file|
      file.write(@uploaded_file.read)
    end
  end
end
