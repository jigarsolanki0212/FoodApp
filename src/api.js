import axios from 'axios';

export async function callData() {
  let config = {
    method: 'get',
    url: 'http://192.168.1.169:3001/dd/newdata',
  };
  try {
    let response = await axios(config);
    // console.log(response.data, 'api done');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
