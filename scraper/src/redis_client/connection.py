import redis    

from config import CONFIG

def get_connection() -> redis.Redis:
    return redis.Redis(
        host=CONFIG.REDIS_HOST,
        port=CONFIG.REDIS_PORT,
        decode_responses=True,  # Ensure responses are decoded to strings
    )