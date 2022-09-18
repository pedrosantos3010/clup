import { terminal } from "terminal-kit";
import { TableView } from "./TableView";
import { TableOptions } from "./TableOptions";

export class TerminalKitTable implements TableView {
    public constructor(private _allowTableColors: boolean) {}

    public displayTable(
        headers: string[],
        tableData: Record<string, TableOptions>[]
    ): string {
        // TODO: search for how markup works in terminal (https://github.com/cronvel/terminal-kit/blob/master/doc/markup.md)
        const content = tableData.map((data) => {
            return Object.keys(data).map((key) => {
                const color = data[key].color;
                if (this._allowTableColors && color) {
                    return terminal.str
                        .bgColorRgbHex(color, data[key].content)
                        .toString();
                }
                return data[key].content;
            });
        }, []);

        return terminal.str.table([headers, ...content], {
            contentHasMarkup: true,
            cellContents: content,
        }) as unknown as string;
    }
}
