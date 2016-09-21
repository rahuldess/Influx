class Publisher
  class << self

    def publish(channel_name, message)
      if CHANNEL_LIST.include?(channel_name) && message.present?
        $redis.publish channel_name, message
      else
        raise "Unrecognized channel name or Empty message"
      end
    end

  end
end
