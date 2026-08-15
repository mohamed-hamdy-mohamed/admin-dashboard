export type UserRole = "admin" | "moderator" | "user";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

export interface MeResponse {
  success: boolean;
  data: {
    user: AuthUser;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data?: {
    alreadyVerified?: boolean;
  };
}

export interface VerificationStatusRequest {
  email: string;
}

export interface VerificationStatusResponse {
  success: boolean;
  data: {
    emailVerified: boolean;
  };
}

export interface ResendVerificationRequest {
  email: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}
