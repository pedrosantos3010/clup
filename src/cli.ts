import { program } from "commander";

interface CommandOptions {
    shortcut: string;
    name: string;
    description: string;
    default: string | boolean;
}

type CommandOption = Record<string, string | boolean>;

interface Command {
    name: string;
    description: string;
    action: {
        exec: (options: CommandOption) => Promise<void>;
    };
    options?: Array<CommandOptions>;
}

export class Cli {
    public constructor(name: string, description: string, version: string) {
        program.name(name).description(description).version(version);
    }

    public addCommand({ name, description, action, options }: Command): void {
        const command = program.command(name).description(description);

        if (options) {
            options.forEach((opt) => {
                command.option(
                    `${opt.shortcut}|${opt.name}`,
                    opt.description,
                    opt.default
                );
            });
        }

        command.action(
            async (options: CommandOption = {}) => await action.exec(options)
        );
    }

    public start(): void {
        program.parse(process.argv);
    }
}
