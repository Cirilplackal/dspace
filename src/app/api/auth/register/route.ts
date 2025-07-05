import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Mock database - replace with real database
const users: any[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    avatar: null,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = registerSchema.parse(body);

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password: hashedPassword,
      avatar: null,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: 'Registration successful',
      status: 201
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 