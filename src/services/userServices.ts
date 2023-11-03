import { fetchApi } from "../utils/fetchApi";

// Models
import type { User, UserDetails } from "../models/User";

interface getResponse {
  data?: User[];
  limit?: number;
  page?: number;
  total?: number;
}

interface deleteResponse {
  id?: string;
}

class UserServices {
  async get(pageSize: number = 10, page: number = 0): Promise<getResponse> {
    try {
      const response: any = await fetchApi.get(
        `/user?page=${page}&limit=${pageSize}`
      );
      return {
        data: response?.data?.map(
          (user: any): User => ({
            firstName: user?.firstName,
            lastName: user?.lastName,
            fullName: `${user?.title} ${user?.firstName} ${user?.lastName}`,
            picture: user?.picture,
            id: user?.id,
            title: user?.title,
          })
        ),
        limit: response?.limit,
        page: response?.page,
        total: response?.total,
      };
    } catch (err) {
      console.error("Error:", err);
      return {};
    }
  }

  async delete(id: string): Promise<deleteResponse> {
    try {
      const response: any = await fetchApi.delete(`/user/${id}`);
      return {
        id: response?.id || null,
      };
    } catch (err) {
      console.error("Error:", err);
      return {};
    }
  }

  async createUser(user: UserDetails) {
    try {
      const response = await fetchApi.post("/user/create", user);
      return response;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  }

  async getById(id: string): Promise<UserDetails> {
    try {
      const response: any = await fetchApi.get("/user/" + id);
      return response;
    } catch (err) {
      console.log("Error:", err);
      return {};
    }
  }

  async update(id: string, user: UserDetails): Promise<UserDetails> {
    try {
      const response: any = await fetchApi.put("/user/" + id, user);
      return response;
    } catch (err) {
      console.log("Error:", err);
      return false;
    }
  }
}

export const userServices = new UserServices();
