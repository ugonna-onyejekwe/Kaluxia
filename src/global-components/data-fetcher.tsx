import axios from "axios";

export const fetchData = async (
  route: string,
  type: string,
  formData?: any,
  currentUser?: CurrentUserType
) => {
  if (type === "get") {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${route}`
    );
    return response.data;
  } else if (type === "post") {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/${route}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    );
    return response.data;
  } else if (type === "patch") {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/${route}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    );
    return response.data;
  } else if (type === "delete") {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/${route}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    );
    return response.data;
  }
};

export const getImage = (path: string | null) => {
  return `${import.meta.env.VITE_IMAGE_BASE_URL}/uploads/${path}`;
};
