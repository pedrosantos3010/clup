import axios from "axios";

export const request = async (
    url: string,
    apiKey: string
): Promise<unknown | null> => {
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
