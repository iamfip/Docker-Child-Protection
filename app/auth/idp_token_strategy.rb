# frozen_string_literal: true

require 'warden'

# This strategy is used when Primero needs to authorize a JWT token from an external identity provider.
class IdpTokenStrategy < Warden::JWTAuth::Strategy

  def valid?
    !token.nil? && Rails.configuration.x.idp.use_identity_provider
  end

  def authenticate!
    idp_token = IdpToken.build(token)
    fail!('Invalid JWT token') unless idp_token.valid?

    user = idp_token.user
    fail!('Valid JWT does not correspond to user') unless user.present?

    success!(user)
  rescue StandardError => e
    fail!(e.message)
  end

end