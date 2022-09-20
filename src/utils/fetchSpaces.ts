import { CLICKUP_BASE_URL } from "../ClickupConfig";
import { request } from "./fetch";

export const fetchSpaces = async (
    apiKey: string
): Promise<Array<Team> | undefined> => {
    const result = await request<TeamsResponse>(
        `${CLICKUP_BASE_URL}/team`,
        apiKey
    );

    return result?.data?.teams?.map((item, index) => ({
        index: index,
        id: item.id,
        name: item.name,
    }));
};

type Team = {
    index: number;
    id: string;
    name: string;
};

interface TeamsResponse {
    teams: Array<Team>;
}
