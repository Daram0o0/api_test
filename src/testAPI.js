import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const getSurveyList = async ({form_id}) => {
  try {
    const response = await axios.get(`/api/v1/forms/${form_id}/responses`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return null;
  }
};
