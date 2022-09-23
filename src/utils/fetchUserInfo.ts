import { CLICKUP_BASE_URL } from "../ClickupConfig";
import { request } from "./fetch";

export const fetchUserInfo = async (
    apiKey: string
): Promise<ClickupUser | undefined> => {
    const result = await request<{ user: ClickupUser }>(
        `${CLICKUP_BASE_URL}/user`,
        apiKey
    );

    return result?.data?.user;
};

type ClickupUser = {
    id: number;
    color: string;
    username: string;
    profilePicture: string;
};
