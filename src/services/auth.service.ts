import apiClient from "@/lib/api/client";
import {
  LoginHospitalDto, LoginDto, RegisterHospitalDto, RegisterDoctorDto,
  RegisterReceptionistDto, RegisterPatientDto, RegisterLabTechDto, TokenResponse
} from "@/types/auth.types";

const authService = {
  verifyUid: (nhisUid: string) =>
    apiClient.post<{ isValid: boolean }>("/api/auth/verify-uid", { nhisUid }),

  registerHospital: (dto: RegisterHospitalDto) =>
    apiClient.post<TokenResponse>("/api/auth/register/hospital", dto),

  loginHospital: (dto: LoginHospitalDto) =>
    apiClient.post<TokenResponse>("/api/auth/login/hospital", dto),

  registerDoctor: (dto: RegisterDoctorDto) =>
    apiClient.post<TokenResponse>("/api/auth/register/doctor", dto),

  loginDoctor: (dto: LoginDto) =>
    apiClient.post<TokenResponse>("/api/auth/login/doctor", dto),

  registerReceptionist: (dto: RegisterReceptionistDto) =>
    apiClient.post<TokenResponse>("/api/auth/register/receptionist", dto),

  loginReceptionist: (dto: LoginDto) =>
    apiClient.post<TokenResponse>("/api/auth/login/receptionist", dto),

  registerPatient: (dto: RegisterPatientDto) =>
    apiClient.post<TokenResponse>("/api/auth/register/patient", dto),

  loginPatient: (dto: LoginDto) =>
    apiClient.post<TokenResponse>("/api/auth/login/patient", dto),

  registerLabTech: (dto: RegisterLabTechDto) =>
    apiClient.post<TokenResponse>("/api/auth/register/lab-technician", dto),

  loginLabTech: (dto: LoginDto) =>
    apiClient.post<TokenResponse>("/api/auth/login/lab-technician", dto),

  refreshToken: (refreshToken: string) =>
    apiClient.post<TokenResponse>("/api/auth/refresh-token", { refreshToken }),

  logout: (refreshToken: string) =>
    apiClient.post("/api/auth/logout", { refreshToken }),
};

export default authService;
