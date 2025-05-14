// Package cache предоставляет реализации кэширования для пользователей
package cache

import (
	"context"
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"

	"auth/internal/domain/users"
)

// RedisUserCache реализует кэширование пользователей в Redis
type RedisUserCache struct {
	client *redis.Client
	ttl    time.Duration
}

// NewRedisUserCache создает новый экземпляр RedisUserCache
func NewRedisUserCache(client *redis.Client, ttl time.Duration) *RedisUserCache {
	return &RedisUserCache{
		client: client,
		ttl:    ttl,
	}
}

// Get получает пользователя из кэша
func (c *RedisUserCache) Get(ctx context.Context, id uuid.UUID) (*users.User, error) {
	data, err := c.client.Get(ctx, c.key(id)).Bytes()
	if err == redis.Nil {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	var user users.User
	if err := json.Unmarshal(data, &user); err != nil {
		return nil, err
	}

	return &user, nil
}

// Set сохраняет пользователя в кэш
func (c *RedisUserCache) Set(ctx context.Context, user *users.User) error {
	data, err := json.Marshal(user)
	if err != nil {
		return err
	}

	return c.client.Set(ctx, c.key(user.ID()), data, c.ttl).Err()
}

// Delete удаляет пользователя из кэша
func (c *RedisUserCache) Delete(ctx context.Context, id uuid.UUID) error {
	return c.client.Del(ctx, c.key(id)).Err()
}

// key генерирует ключ для Redis
func (c *RedisUserCache) key(id uuid.UUID) string {
	return "user:" + id.String()
}
