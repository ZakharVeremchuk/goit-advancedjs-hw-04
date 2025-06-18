import axios from "axios";

const token = "38994291-8fc9a2a1ed4020d28b7742733";
let lastQuery;
let page;

export async function fetchImages(query) {

    if(lastQuery !== query) {
        lastQuery = query;
        page = 1;
    } else {
        page += 1;
    }

    return await axios.get("https://pixabay.com/api/", {
        params: {
            key: token,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: page,
            per_page: 15
        }
    }).then(response => response.data);
}