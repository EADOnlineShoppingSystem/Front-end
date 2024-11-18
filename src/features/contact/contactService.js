import { axiosInstance } from '../../utils/axiosConfig';

const postQuery = async (contactData) => {
  try {
    const response = await axiosInstance.post('enquiry', contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const contactService = {
    postQuery,
};