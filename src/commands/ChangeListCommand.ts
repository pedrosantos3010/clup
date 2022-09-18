import { Command } from "../cli";
import { ChangeListOptions, ChangeListUseCase } from "../use-case/changeList";
import { TerminalView } from "../view/TerminalView";

export class ChangeListCommand {
    public static createChangeListCommand(
        terminal: TerminalView
    ): Command<ChangeListOptions> {
        return {
            name: "cd",
            description: "change current folder and list",
            action: new ChangeListUseCase(terminal),
            options: [
                {
                    shortcut: "-f",
                    name: "--folder",
                    description: "Change folder and list",
                    default: false,
                },
                {
                    shortcut: "-w",
                    name: "--workspace",
                    description: "Change workspace, folder and list",
                    default: false,
                },
                {
                    shortcut: "-s",
                    name: "--space",
                    description: "Change space, workspace, folder and list",
                    default: false,
                },
            ],
        };
    }
}
