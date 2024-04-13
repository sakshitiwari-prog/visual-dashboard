import axios from 'axios';

export const GetDashBoardData = async (url: any) => {

  try {
    const response = await axios.get(url);
    console.log('response data:', response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    console.error('Error fetching data:', error);
    return error;
  }
};
