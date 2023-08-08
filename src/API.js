const API_KEY = '55b53f70e4aceff3cff2f68ba919b819';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'en-US';

export default async function fetchInfo(apiQuery) {
  try {
    const info = await fetch(`${BASE_URL}${apiQuery}api_key=${API_KEY}&language=${LANGUAGE}`);
    const response = await info.json();
    return response;
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
}
