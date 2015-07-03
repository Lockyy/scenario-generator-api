class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :omniauthable, omniauth_providers: [:yammer]

  has_many :user_oauths, dependent: :destroy
  has_many :tokens, dependent: :destroy

  def self.generate_password
    Devise.friendly_token
  end
end
