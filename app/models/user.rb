class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:yammer]

  has_many :user_oauths, dependent: :destroy
  has_many :tokens, dependent: :destroy
  has_many :reviews
  has_and_belongs_to_many :tags

  scope :with_oauth, ->(provider, uid) do
    joins(:user_oauths).where(user_oauths: { provider: provider, uid: uid })
  end

  scope :with_token, ->(token) { joins(:tokens).where(tokens: { token: token }) }

  validates :name, presence: true

  def self.generate_password
    Devise.friendly_token
  end

  def self.find_with_token(token)
    with_token(token).first
  end

  def self.find_with_oauth(provider, uid)
    with_oauth(provider, uid).first
  end

  def update_oauth!(provider, uid, login_hash)
    oauth = user_oauths.where(provider: provider, uid: uid).first_or_initialize
    oauth.last_login_hash = login_hash || {}
    oauth.save
    oauth
  end

  def create_token!(value)
    tokens.create!(token: value)
  end

  def first_login?
    sign_in_count == 1
  end

  def total_reviews
    self.reviews.size
  end
end
