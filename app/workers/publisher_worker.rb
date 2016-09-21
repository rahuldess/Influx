class PublisherWorker
  include Sidekiq::Worker

  def perform( publisher_params )
    return unless publisher_params.values.all? { |value| value.present? }

    @publisher_params = publisher_params
    @total_matched    = 0

    EventMachine.run do
      twitter_stream
    end
  end

  private

  def twitter_stream
    buffer = ""
    http   = http_request

    http.stream do |chunk|
      unless chunk.nil?
        buffer += chunk

        while line = buffer.slice!(/.+\r\n/)
          @tweet = JSON.parse(line)
          unless @tweet.dig('place', 'bounding_box', 'coordinates').nil?
            # Debugging purpose
            # ap @tweet['place']['bounding_box']['coordinates'].first.first.reverse.flatten.join(', ')
            publish_stream
          end
        end
      end
    end
  end

  def publish_stream
    Publisher.publish(TWITTER_CHANNEL, ({
      coordinates: @tweet['place']['bounding_box']['coordinates'].first.first.reverse.flatten.join(', '),
      count: @total_matched += 1 }).to_json)
    end

    def http_request
      EventMachine::HttpRequest.new("https://stream.twitter.com/1.1/statuses/filter.json?track=#{@publisher_params['track_key']}")
      .get(head: {
        "Content-Type"    => "application/x-www-form-urlencoded",
        "Accept-Encoding" => "deflate",
        "Authorization"   => @publisher_params['oauth_header']
      },
      timeout: 90,
      keepalive: true)
    end

  end
