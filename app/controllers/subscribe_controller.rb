class SubscribeController < ApplicationController
  include ActionController::Live

  def feed
    response.headers['Content-Type'] = 'text/event-stream'

    $redis.subscribe(TWITTER_CHANNEL) do |on|
      on.message do |channel, msg|
        response.stream.write "data: #{msg}\n\n"
      end
    end
  rescue ActionController::Live::ClientDisconnected
    logger.info "*** Client Disconnected ***"
  ensure
    response.stream.close
  end

end
