import { ConfigService } from "../framework/ConfigService";
import { fetchTasks } from "../utils/fetchTasks";
import { TerminalView } from "../view/TerminalView";

export function listTasks(terminal: TerminalView) {
  return async () => {
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

    const tableData = tasks.map((task) => [
      task.customId || task.id,
      task.status.name,
      task.name,
      task.assignees?.map((a) => a.username).join(", ") || "",
    ]);

    const tableHeader = ["id", "status", "name", "user"];
    terminal.showTable(
      [tableHeader, ...tableData],
      "showing list " + config.folder.name
    );
  };
}
