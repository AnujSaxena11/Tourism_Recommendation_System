local time = redis.call("TIME")
local now = tonumber(time[1]) * 1000 + math.floor(tonumber(time[2]) / 1000)
local bucketCount = #KEYS

local calculatedTokens = {}
local calculatedLastRefill = {}

-- First pass: calculate and check every bucket
for i = 1, bucketCount do

    local key = KEYS[i]

    local capacity = tonumber(ARGV[1 + ((i - 1) * 2)])
    local refillRate = tonumber(ARGV[2 + ((i - 1) * 2)])

    local tokens = tonumber(redis.call("HGET", key, "tokens"))
    local lastRefillTime = tonumber(redis.call("HGET", key, "lastRefillTime"))

    if tokens == nil then
        tokens = capacity
        lastRefillTime = now
    end

    local elapsedSeconds = math.max(0, (now - lastRefillTime) / 1000)

    local newTokens = elapsedSeconds * refillRate

    tokens = math.min(
        capacity,
        tokens + newTokens
    )

    -- Bucket doesn't have a token
    if tokens < 1 then

        local retryAfter = math.ceil((1 - tokens) / refillRate)

        return {0, retryAfter}
    end

    calculatedTokens[i] = tokens - 1
    calculatedLastRefill[i] = now
end


-- Second pass: all buckets passed, so commit changes
for i = 1, bucketCount do

    local key = KEYS[i]

    redis.call(
        "HSET",
        key,
        "tokens",
        calculatedTokens[i],
        "lastRefillTime",
        calculatedLastRefill[i]
    )

    -- Remove inactive bucket after 1 hour
    redis.call("EXPIRE", key, 3600)
end

return {1, 0}