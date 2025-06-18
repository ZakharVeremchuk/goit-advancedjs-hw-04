const token = "38994291-8fc9a2a1ed4020d28b7742733";

export function fetchImages(query) {
    const searchParams = new URLSearchParams({
        key: token,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    });
    const url = `https://pixabay.com/api/?${searchParams}`;
    const options = { method: "GET" };
    return fetch(url, options).then(response => response.json());
}