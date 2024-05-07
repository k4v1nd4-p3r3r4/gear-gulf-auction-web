import {postData, getData, sendFormData, fetchImage} from "../api/Methods";

// ------------------------ Sign Up -----------------------------

export const signUp = async (data) => {
  try {
    const response = await postData("user/sign-up", {
      userName: data.userName,
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (error) {
    console.log("Error in sign up :", error);
  }
};

// ------------------------ Sign In -----------------------------

export const signIn = async (data) => {
  try {
    const response = await postData("user/sign-in", {
      email: data.email,
      password: data.password,
      date: data.date,
    });
    return response;
  } catch (error) {
    console.log("Error in sign in :", error);
  }
};

// ------------------------ Sell Vehicle -----------------------------  //sell

export const sellVehicle = async (data) => {
  try {
    const response = await postData("vehicle/sell", {
      vehicleName: data.vehicleName,
      description: data.description,
      year: data.year,
      bidAmount: data.bidAmount,
      startDate: data.startDate,
      endDate: data.endDate,
      postedDate: data.postedDate,
      userId: data.userId,
      imageName : data.imageName,
    });
    return response;
  } catch (error) {
    console.log("Error in sell vehicle :", error);
  }
};

export const uploadImage = async (data) => {
  try {
    const response = await sendFormData("image/upload", data)
    return response;
  }catch (error){
    console.error("Error in uploading image :", error);
  }
}

export const getImage = async (imageName) => {
  try {
    const response = await fetchImage(imageName)
    return response;
  }catch (error){
    console.error("Error in uploading image :", error);
  }
}

// ------------------------ Get Vehicles -----------------------------

export const getVehicles = async (data) => {
  try {
    const response = await postData("vehicle/get", {
      page: data.page,
      pageCount: data.pageCount,
    });
    return response;
  } catch (error) {
    console.log("Error in get vehicles :", error);
  }
};

// ------------------------ Get Vehicles By User -----------------------------   //sell

export const getVehiclesByUser = async (data) => {
  try {
    const response = await postData("vehicle/get-by-user", {
      page: data.page,
      pageCount: data.pageCount,
      userId: data.userId,
    });
    return response;
  } catch (error) {
    console.log("Error in get vehicles by user :", error);
  }
};

// ------------------------ Delete Vehicle -----------------------------  //sell

export const deleteVehicle = async (data) => {
  try {
    const response = await postData("vehicle/delete", {
      vehicleId: data.vehicleId,
    });
    return response;
  } catch (error) {
    console.log("Error in delete vehicle :", error);
  }
};

// ------------------------ Get Active Vehicles -----------------------------

export const getActiveVehicles = async (data) => {
  try {
    const response = await postData("vehicle/get-active", {
      page: data.page,
      pageCount: data.pageCount,
    });
    return response;
  } catch (error) {
    console.log("Error in get active vehicles :", error);
  }
};

// ------------------------ Get Deleted Vehicles -----------------------------

export const getDeletedVehicles = async (data) => {
  try {
    const response = await postData("vehicle/get-deleted-vehicles", {
      page: data.page,
      pageCount: data.pageCount,
    });
    return response;
  } catch (error) {
    console.log("Error in get deleted vehicles :", error);
  }
};

// ------------------------ Place Bids -----------------------------   //place bids

export const placeBids = async (data) => {
  try {
    const response = await postData("bid/place", {
      email: data.email,
      vehicleId: data.vehicleId,
      bidAmount: data.bidAmount,
      date: data.date,
    });
    return response;
  } catch (error) {
    console.log("Error in bid place :", error);
  }
};

// ------------------------ Get Bids For Vehicle -----------------------------

export const getBidsForVehicle = async (data) => {
  try {
    const response = await postData("bid/get-bids-vehicle", {
      page: data.page,
      pageCount: data.pageCount,
      vehicleId: data.vehicleId,
    });
    return response;
  } catch (error) {
    console.log("Error in get bids for vehicle :", error);
  }
};

// ------------------------ Get Bids By User -----------------------------  //my bids

export const getBidsByUser = async (data) => {
  try {
    const response = await postData("bid/get-bids-user", {
      page: data.page,
      pageCount: data.pageCount,
      userId: data.userId,
    });
    return response;
  } catch (error) {
    console.log("Error in get bids by user :", error);
  }
};

// ------------------------ Get Bids For Vehicle By User -----------------------------

export const getBidsForVehicleByUser = async (data) => {
  try {
    const response = await postData("bid/get-bids-vehicle-user", {
      page: data.page,
      pageCount: data.pageCount,
      userId: data.userId,
      vehicleId: data.vehicleId,
    });
    return response;
  } catch (error) {
    console.log("Error in get bids for a vehicle by user :", error);
  }
};
