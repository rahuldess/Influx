$redis = Redis.new(host: 'localhost', port: 6379)
$redis.config(:set, "save", "")
