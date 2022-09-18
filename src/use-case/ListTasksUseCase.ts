import { ConfigService } from "../framework/ConfigService";
import { fetchTasks } from "../utils/fetchTasks";
import { TerminalView } from "../view/TerminalView";

export class ListTasksUseCase {
    public constructor(private _terminal: TerminalView) {}

    public async exec(): Promise<void> {
        const configService = new ConfigService();
        const config = await configService.getConfig();

        let tasks = await this._terminal.waitAction(
            fetchTasks(config.apiKey, config.list.id)
        );

        if (!tasks) {
            this._terminal.endWithError(
                "There is no tasks at " + config.folder.name
            );
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

        this._terminal.showTable(tableData, undefined, config.list.name);
    }
}
