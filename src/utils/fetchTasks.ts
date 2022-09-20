import { CLICKUP_BASE_URL } from "../ClickupConfig";
import { TaskInfo, UserInfo } from "../types";
import { request } from "./fetch";

interface FetchTasksOptions {
    includesSubtasks: boolean;
    assignee: string;
}

export const fetchTasks = async (
    apiKey: string,
    listId: string,
    options?: FetchTasksOptions
): Promise<TaskInfo[] | undefined> => {
    const params = getParams(options);
    const url = `${CLICKUP_BASE_URL}/list/${listId}/task?${params}`;

    const result = await request<ClickupTasks>(url, apiKey);

    const tasks = result?.data?.tasks?.map(
        (task): TaskInfo => ({
            id: task.id,
            customId: task.custom_id,
            name: task.name,
            status: {
                name: task.status?.status,
                color: task.status?.color,
                order: task.status?.orderindex,
            },
            assignees: task.assignees?.map(
                (assignee): UserInfo => ({
                    username: assignee.username,
                    color: assignee.color,
                    id: assignee.id,
                })
            ),
        })
    );
    return tasks;
};

function getParams(options?: FetchTasksOptions): string {
    let params = "";
    if (options?.includesSubtasks) {
        params += "includesubtasks=true";
    }
    if (options?.assignee) {
        params += `assignees%5B%5D=${options?.assignee}`;
    }
    return params;
}

interface ClickupTasks {
    tasks: Array<{
        id: string;
        custom_id: string | undefined;
        name: string;
        status: {
            status: string;
            color: string;
            orderindex: number;
        };
        assignees?: Array<{
            username: string;
            color: string;
            id: string;
        }>;
    }>;
}
