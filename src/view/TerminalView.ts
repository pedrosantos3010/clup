import chalk from "chalk";
import { terminal } from "terminal-kit";
import { Color } from "./Colors";
import { displayLogo } from "./displayLogo";
import { Spinner } from "./Spinner";

interface ShowTextOptions {
  inline?: boolean;
  colorHex?: Color;
}

export class TerminalView {
  public constructor(private spinner: Spinner = new Spinner()) {}

  public displayLogo(): void {
    displayLogo();
  }

  public showText(
    text: string,
    { inline, colorHex }: ShowTextOptions = {}
  ): void {
    text = `${inline ? "" : "\n"}${text}`;

    if (colorHex) {
      terminal(chalk.hex(colorHex)(text));
    } else {
      terminal(text);
    }
  }

  public async getInput(params?: {
    successMessage?: string;
    errorMessage?: string;
  }): Promise<string> {
    const input = await terminal.inputField({ cancelable: true }).promise;

    if (!input) {
      const msg = params?.errorMessage || "\nAn error occur\n";
      terminal.red.bold(msg);
      this.end();
      return "";
    }

    if (input) {
      const msg = params?.successMessage || "";
      terminal.green("\n" + msg, input);
      return input;
    }

    return input;
  }

  public async selectItem(
    items: string[],
    { header }: { header?: string }
  ): Promise<{ index: number; item: string }> {
    if (header) {
      this.showText("Select " + header + ": ");
    }

    const selection = await terminal.singleColumnMenu(items, {
      cancelable: true,
    }).promise;

    return {
      index: selection.selectedIndex,
      item: selection.selectedText,
    };
  }

  public async waitAction<T>(action: Promise<T>): Promise<T> {
    await this.startSpinner();
    const result = await action;
    await this.stopSpinner();
    return result;
  }
  public async startSpinner(): Promise<void> {
    await this.spinner.start();
  }

  public async stopSpinner(): Promise<void> {
    await this.spinner.stop();
  }

  public end(): void {
    terminal.processExit(0);
  }
}
