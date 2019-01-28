# == Schema Information
#
# Table name: generators
#
#  id         :bigint(8)        not null, primary key
#  ad_link    :string
#  kind       :string
#  name       :string
#  slug       :string
#  spoilers   :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Indexes
#
#  index_generators_on_name     (name)
#  index_generators_on_user_id  (user_id)
#

require 'rails_helper'

describe Generator do
  it { should have_many :columns }
end
