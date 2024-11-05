import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const getSurveyList = async () => {
  try {
    const response = await axios.get(`/api/v1/forms/`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      // params: {
      //   page: 1, // 가져올 페이지
      //   page_size: 100,
      //   // search: "한국영상",
      // },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return null;
  }
};
