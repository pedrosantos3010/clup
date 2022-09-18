import { Command } from "../cli";
import { ConfigUseCase } from "../use-case/ConfigUseCase";
import { TerminalView } from "../view/TerminalView";

export class ConfigCommand {
    public static createConfigCommand(
        terminal: TerminalView
    ): Command<undefined> {
        return {
            name: "config",
            description: "Configure clup cli with your account",
            action: new ConfigUseCase(terminal),
        };
    }
}
