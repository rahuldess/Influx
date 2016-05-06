class StreamController < ApplicationController

  def call
    if protected_params[:track].present?
      @track_key = protected_params[:track]

      generate_oauth_header
      init_publisher
    end

    render nothing: true
  end

  private

  def generate_oauth_header
    @oauth_header = SingleUserOauth.generate_header( oauth_params )
  end

  # Spawing background worker
  def init_publisher
    PublisherWorker.perform_async( publisher_params )
  end

  def oauth_params
    {
      request_method: GET,
      requested_url: 'https://stream.twitter.com/1.1/statuses/filter.json',
      query_params: {
        track: @track_key
      },
      oauth_consumer_key:    Rails.application.secrets.oauth_consumer_key,
      oauth_token:           Rails.application.secrets.oauth_token,
      oauth_consumer_secret: Rails.application.secrets.oauth_consumer_secret,
      oauth_access_secret:   Rails.application.secrets.oauth_access_secret
    }
  end

  def publisher_params
    {
      oauth_header: @oauth_header,
      track_key:    @track_key
    }
  end

  # Whitelisting the params
  def protected_params
    params.permit(:track)
  end

end
