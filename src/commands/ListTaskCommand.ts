import { Command } from "../cli";
import { ListTasksUseCase } from "../use-case/ListTasksUseCase";
import { TerminalView } from "../view/TerminalView";

export class ListTaskCommand {
    public static createListTaskCommand(
        terminal: TerminalView
    ): Command<undefined> {
        return {
            name: "ls",
            description: "list tasks in the current list",
            action: new ListTasksUseCase(terminal),
        };
    }
}
