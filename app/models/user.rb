class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:yammer]

  has_many :user_oauths, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :attachments, through: :reviews
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_products, through: :bookmarks, source: :product
  has_many :products
  has_many :collections, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :collection_users, dependent: :destroy, foreign_key: :sharee_id
  has_many :shared_collections, through: :collection_users, foreign_key: :sharee_id

  has_and_belongs_to_many :tags

  scope :with_oauth, ->(provider, uid) do
    joins(:user_oauths).where(user_oauths: { provider: provider, uid: uid })
  end

  validates :name, presence: true

  after_save :check_for_invitations
  before_validation :whitelisted?

  def self.generate_password
    Devise.friendly_token
  end

  def self.find_with_oauth(provider, uid)
    with_oauth(provider, uid).first
  end

  def visible_collections(user)
    self.collections.visible(user) + self.shared_collections.visible(user)
  end

  def update_oauth!(provider, uid, login_hash)
    oauth = user_oauths.where(provider: provider, uid: uid).first_or_initialize
    oauth.last_login_hash = login_hash || {}
    oauth.save
    oauth
  end

  def first_login?
    sign_in_count == 1
  end

  def signed_in_minutes
    diff_seconds = (Time.now - current_sign_in_at).round
    diff_minutes = diff_seconds / 60
    return diff_minutes
  end

  def recent_activity(sorting)
    reviews.sorted(sorting)
  end

  def check_for_invitations
    invites = CollectionUser.invites.where(email: self.email)
    invites.each do |invite|
      invite.update_attributes(email: nil, sharee: self)
    end
  end

  def whitelisted?
    return true unless ENV['ENABLE_WHITELIST']

    # If no AllowedUser is found the user is not whitelisted
    allowed = !AllowedUser.find_by(email: self.email.downcase).nil?
    # Add an error to tell the user they aren't whitelisted
    self.errors.add :email, 'is not whitelisted' unless allowed
    allowed
  end
end
