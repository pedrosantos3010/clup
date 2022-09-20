import axios from "axios";

export const request = async <T = unknown>(
    url: string,
    apiKey: string
): Promise<{ data: T } | null> => {
    try {
        return await axios.get(url, {
            headers: {
                Authorization: apiKey,
            },
        });
    } catch (e) {
        console.error(e);
        return null;
    }
};
