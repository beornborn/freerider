class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.serializer
    ActiveModelSerializers::SerializableResource
  end

  def serial_as_json(options = {})
    self.class.serializer.new(self, options).as_json
  end
end
