import chalk from "chalk";
import figlet from "figlet";
import { terminal } from "terminal-kit";
import { Color } from "./Colors";

export function displayLogo(): void {
  let spaces = " ".repeat(6);
  const name = "clup";

  const banner = figlet.textSync(`${spaces}${name}${spaces}`, {
    horizontalLayout: "full",
  });

  terminal(chalk.bgHex(Color.PURPLE)(banner));

  spaces = " ".repeat(5);
  const slogan = "A useful cli for handling clickup's tasks";
  terminal(chalk.bgHex(Color.PURPLE)(`\n${spaces}${slogan}${spaces}`));
}
