import chalk from "chalk";
import figlet from "figlet";
import { Color } from "./Colors";

export const createBanner = (): string => {
    let spaces = " ".repeat(6);
    const name = "clup";

    const banner = figlet.textSync(`${spaces}${name}${spaces}`, {
        horizontalLayout: "full",
    });

    spaces = " ".repeat(5);
    const slogan = "A useful cli for handling clickup's tasks";

    return chalk.bgHex(Color.PURPLE)(banner + `\n${spaces}${slogan}${spaces}`);
};
