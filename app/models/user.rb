class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:yammer]

  has_many :user_oauths, dependent: :destroy
  has_many :tokens, dependent: :destroy
  has_many :reviews
  has_many :attachments, through: :reviews
  has_many :bookmarks
  has_many :bookmarked_products, through: :bookmarks, source: :product
  has_many :products
  has_many :collections, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_and_belongs_to_many :tags

  scope :with_oauth, ->(provider, uid) do
    joins(:user_oauths).where(user_oauths: { provider: provider, uid: uid })
  end

  scope :with_token, ->(token) { joins(:tokens).where(tokens: { token: token }) }

  validates :name, presence: true

  def total_attachments
    attachments.size
  end

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

  def signed_in_minutes
    diff_seconds = (Time.now - current_sign_in_at).round
    diff_minutes = diff_seconds / 60
    return diff_minutes
  end

  def total_reviews
    self.reviews.size
  end

  def total_products
    self.products.size
  end

  def recent_activity(sorting)
    reviews.sorted(sorting)
  end
end
