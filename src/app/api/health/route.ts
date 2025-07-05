import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'connected', // Mock - replace with real database check
        cache: 'connected', // Mock - replace with real cache check
        storage: 'connected', // Mock - replace with real storage check
      },
    };

    return NextResponse.json(healthCheck);
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { status: 'unhealthy', error: 'Health check failed' },
      { status: 500 }
    );
  }
} 