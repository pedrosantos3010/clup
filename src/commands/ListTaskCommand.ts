import { Command } from "../cli";
import { ConfigService } from "../framework/ConfigService";
import {
    ListTasksUseCase,
    ListUseCaseOptions,
} from "../use-case/ListTasksUseCase";
import { TerminalView } from "../view/TerminalView";

export class ListTaskCommand {
    public static createListTaskCommand(
        terminal: TerminalView,
        configService: ConfigService
    ): Command<ListUseCaseOptions> {
        return {
            name: "ls",
            description: "list tasks in the current list",
            action: new ListTasksUseCase(terminal, configService),
            options: [
                {
                    shortcut: "-m",
                    name: "--me-mode",
                    description: "shows only tasks that was your assignee",
                    default: false,
                },
                {
                    shortcut: "-i",
                    name: "--include-subtasks",
                    description: "also shows subtasks",
                    default: false,
                },
            ],
        };
    }
}
