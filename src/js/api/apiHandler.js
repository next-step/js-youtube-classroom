import { BASE_URL } from "../utils/constants.js";
import { YOUTUBE_API_KEY } from "../../../config.js";

export const request = async (url) => {
	try {
		const response = await fetch(url);
		return response.json();
	} catch (e) {
		console.error(e);
	}
};

const api = {
	fetchResult: (data, pageToken = '') => {
		return request(
			`${BASE_URL}?part=snippet&key=${YOUTUBE_API_KEY}&type=video&maxResults=10&q=${data}&pageToken=${pageToken}`
		);
	},
};

export default api
