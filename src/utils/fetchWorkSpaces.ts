import { CLICKUP_BASE_URL } from "../ClickupConfig";
import { request } from "./fetch";

export const fetchWorkSpaces = async (
    apiKey: string,
    workspaceId: string
): Promise<Array<Workspace> | undefined> => {
    const url = `${CLICKUP_BASE_URL}/team/${workspaceId}/space`;
    const result = await request<WorkSpacesResponse>(url, apiKey);

    return result?.data?.spaces?.map((item, index) => ({
        index: index,
        id: item.id,
        name: item.name,
    }));
};

interface WorkSpacesResponse {
    spaces: Array<Workspace>;
}

type Workspace = {
    index: number;
    id: string;
    name: string;
};
