const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/data`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
};
