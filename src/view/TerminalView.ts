import chalk from "chalk";
import { terminal } from "terminal-kit";
import { Color } from "./Colors";
import { displayLogo } from "./displayLogo";
import { Spinner } from "./Spinner";
import { TableOptions } from "./Table/TableOptions";
import { TableView } from "./Table/TableView";

interface ShowTextOptions {
    inline?: boolean;
    colorHex?: Color;
}

export class TerminalView {
    public constructor(
        private _tableView: TableView,
        private _spinner: Spinner
    ) {}

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

    public async showTable(
        tableData: Record<string, TableOptions>[],
        headers?: string[],
        tableLabel?: string
    ): Promise<void> {
        if (!tableData.length) {
            this.showText(`No data for ${tableLabel}\n`, {
                colorHex: Color.RED,
            });
            return;
        }
        // explore this tables:
        // table> https://www.npmjs.com/package/table
        // cli-table> https://www.npmjs.com/package/cli-table

        if (tableLabel) {
            this.showText(tableLabel + "\n", { colorHex: Color.PURPLE });
        }

        if (!headers) {
            headers = Object.keys(tableData[0]);
        }
        this.showText(this._tableView.displayTable(headers, tableData));
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
        if (!items.length) {
            this.endWithError("No data for selection " + header);
            throw new Error("Failed to display selection");
        }

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
        await this._spinner.start();
    }

    public async stopSpinner(): Promise<void> {
        await this._spinner.stop();
    }

    public end(): void {
        terminal.processExit(0);
    }

    public endWithError(error: string): void {
        this.showText(error, { colorHex: Color.RED });
        terminal.processExit(-1);
    }
}
