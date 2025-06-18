import axios from "axios";

const token = "38994291-8fc9a2a1ed4020d28b7742733";

export function fetchImages(query) {
    return axios.get("https://pixabay.com/api/", {
        params: {
            key: token,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true
        }
    }).then(response => response.data);
}