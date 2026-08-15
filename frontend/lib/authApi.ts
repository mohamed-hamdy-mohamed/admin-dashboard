import { API_BASE_URL } from "@/constants/api";
import { apiClient } from "@/lib/apiClient";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  MessageResponse,
  RegisterRequest,
  RegisterResponse,
  ResendVerificationRequest,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerificationStatusRequest,
  VerificationStatusResponse,
} from "@/types/auth";

export const registerUser = async (payload: RegisterRequest) => {
  const { data } = await apiClient.post<RegisterResponse>(
    `${API_BASE_URL}/auth/register`,
    payload
  );

  return data;
};

export const loginUser = async (payload: LoginRequest) => {
  const { data } = await apiClient.post<LoginResponse>(
    `${API_BASE_URL}/auth/login`,
    payload
  );

  return data;
};

export const forgotPassword = async (payload: ForgotPasswordRequest) => {
  const { data } = await apiClient.post<ForgotPasswordResponse>(
    `${API_BASE_URL}/auth/forgot-password`,
    payload
  );

  return data;
};

export const verifyEmail = async (payload: VerifyEmailRequest) => {
  const { data } = await apiClient.post<VerifyEmailResponse>(
    `${API_BASE_URL}/auth/verify-email`,
    payload
  );

  return data;
};

export const getVerificationStatus = async (
  payload: VerificationStatusRequest
) => {
  const { data } = await apiClient.post<VerificationStatusResponse>(
    `${API_BASE_URL}/auth/verification-status`,
    payload
  );

  return data;
};

export const resendVerification = async (payload: ResendVerificationRequest) => {
  const { data } = await apiClient.post<MessageResponse>(
    `${API_BASE_URL}/auth/resend-verification`,
    payload
  );

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await apiClient.get<MeResponse>(`${API_BASE_URL}/auth/me`);

  return data;
};

export const updateCurrentUser = async (payload: {
  firstName: string;
  lastName: string;
}) => {
  const { data } = await apiClient.patch<MeResponse>(
    `${API_BASE_URL}/auth/me`,
    payload
  );

  return data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await apiClient.post<MeResponse>(
    `${API_BASE_URL}/auth/avatar`,
    formData
  );

  return data;
};
