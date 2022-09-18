import { ConfigService } from "../framework/ConfigService";
import { fetchTasks } from "../utils/fetchTasks";
import { TerminalView } from "../view/TerminalView";

export function listTasks(terminal: TerminalView) {
    return async (): Promise<void> => {
        const configService = new ConfigService();
        const config = await configService.getConfig();

        let tasks = await terminal.waitAction(
            fetchTasks(config.apiKey, config.list.id)
        );

        if (!tasks) {
            terminal.endWithError("There is no tasks at " + config.folder.name);
            return;
        }

        tasks = tasks.sort((t1, t2) => t2.status.order - t1.status.order);

        const tableData = tasks.map((task) => ({
            id: { content: task.customId || task.id },
            status: { content: task.status.name, color: task.status.color },
            name: { content: task.name },
            user: {
                content:
                    task.assignees?.map((a) => a.username).join(", ") || "",
            },
        }));

        terminal.showTable(tableData, undefined, config.list.name);
    };
}
