class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.serializer
    ActiveModelSerializers::SerializableResource
  end
end
