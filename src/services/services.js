import axios from 'axios';
export const CommonPost = async (url, body) => {
  const response = await axios.post(url, body);
  return response;
};
export const CommonGet = async url => {
  const response = await axios.get(url);
  return response;
};
export const customGetMethod = async (url, token) => {
  console.log(url);
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
};
