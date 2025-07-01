import axios from 'axios'

axios.defaults.baseURL = 'https://www.reddit.com';
axios.defaults.headers.common['Content-Type'] = 'Application/json';

export async function getRedditPosts() {
  try {
    const response = await axios.get('r/programacion.json');
    return response.data;
  } catch (error) {
    return error.data;
  }
}


