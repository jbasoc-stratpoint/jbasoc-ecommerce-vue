import ApiClient from "@/utils/https.ts";

export default {
  async getCategories() {
    return await ApiClient.get("/api/categories", {
      Authorization: `Bearer ${import.meta.env.VITE_API_KET}`,
    });
  },
  // ADD API FUNCTIONS FOR THIS MODULE HERE
};
