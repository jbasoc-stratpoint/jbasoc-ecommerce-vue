import ApiClient from "@/utils/https.ts";

interface LOGIN_INTERFACE {
  identifier: string;
  password: string;
}

interface UPDATE_PASSWORD_INTERFACE {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

export default {
  // ADD API FUNCTIONS FOR THIS MODULE HERE
  async login(data: LOGIN_INTERFACE) {
    return await ApiClient.post("/api/auth/local", data);
  },
  async updatePassword(data: UPDATE_PASSWORD_INTERFACE, jwt: string) {
    return await ApiClient.post("/api/auth/change-password", data, {
      Authorization: `Bearer ${jwt}`,
    });
  },
  async register(data: UPDATE_PASSWORD_INTERFACE) {
    return await ApiClient.post("/api/auth/local/register", data);
  },
};
