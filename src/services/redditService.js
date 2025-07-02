import axios from 'axios'

axios.defaults.baseURL = 'https://www.reddit.com';
axios.defaults.headers.common['Content-Type'] = 'Application/json';

export async function getRedditPosts(cursor = null, direction = 'after') {
  const params = {
    limit: 10
  }
  if (cursor) params[direction] = cursor
  console.log(params)
  try {
    const response = await axios.get('r/popular.json', {params});
    return response.data;
  } catch (error) {
    return error.data;
  }
}


