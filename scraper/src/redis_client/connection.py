import redis    

from config import config

def get_connection() -> redis.Redis:
    return redis.Redis(
        host=config.redis_host,
        port=config.redis_port,
        decode_responses=True,  # Ensure responses are decoded to strings
    )