import axiosInstance from "./axios";
import axios from "axios";

// ------------------------ Post Data -----------------------------

export const postData = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request :", error);
    throw error;
  }
};

// ------------------------ Send Form Data -----------------------------

export const sendFormData = async (url, formData) => {
  try {
    const response = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending FormData :", error);
    throw error;
  }
};

//-------------------fetch Image Data --------------------------------------------

export const fetchImage = async (imageName) => {
  try {
    const response = await axiosInstance.get(`image/view/${imageName}`, {
      responseType: 'blob',
    });
    const imageBlob = new Blob([response.data], { type: response.data.type });
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};

// ------------------------ Get Data -----------------------------

export const getData = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error making GET request :", error);
    throw error;
  }
};
