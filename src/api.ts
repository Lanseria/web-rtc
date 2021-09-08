import axios from "axios";

export const imgCocoReq = (data: any) => {
  return axios.request({
    url: "/api/deep_learn_test",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};
