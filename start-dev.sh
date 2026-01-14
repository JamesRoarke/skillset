#!/bin/bash

echo "🚀 Starting Skillset Development Environment..."

# Stop any running containers
echo "📦 Stopping existing containers..."
docker-compose down

# Start fresh (keeps database data)
echo "🐳 Starting Docker containers..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check if services are up
echo "✅ Checking service health..."
docker-compose ps

# Test proxy connection
echo "🔍 Testing proxy connection..."
curl -s http://localhost:3000/health || echo "❌ Proxy not responding"

# Show Kratos logs for debugging
echo "📋 Recent Kratos logs:"
docker-compose logs --tail=10 kratos

echo ""
echo "✨ Development environment ready!"
echo "📱 Start your Expo app with: npm run android"
echo "🌐 Web version: http://localhost:8081"
echo "🔐 Auth proxy: http://localhost:3000"
echo ""