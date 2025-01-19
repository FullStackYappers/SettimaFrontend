import axios from "axios";

const API_BASE_URL = '/api'

export const likeItem = async (type: string, id: number) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post(
        `${API_BASE_URL}/likes`,
        {
          likeable_id: id,
          likeable_type: type,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error liking item: ", error.response?.data?.message || error.message);
      }
      console.error("Unexpected error while liking the item: ", error);
    }
  };
  
  export const unlikeItem = async (type: string, id: number) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.delete(`${API_BASE_URL}/likes`, {
        data: {
          likeable_id: id,
          likeable_type: type,
        }, headers: {
          'Authorization': `Bearer ${token}`
      }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error unliking item: ", error.response?.data?.message || error.message);
      }
      console.error("Unexpected error while unliking the item: ", error);
    }
  };