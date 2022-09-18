import chalk from "chalk";
import chalkTable from "chalk-table"; // do not have types
import { TableView } from "./TableView";
import { TableOptions } from "./TableOptions";

export class ChalkTable implements TableView {
    public displayTable(
        headers: string[],
        tableData: Record<string, TableOptions>[]
    ): string {
        const options = {
            leftPad: 2,
            columns: headers.map((h) => ({ field: h, name: h })),
        };

        const tableInfo = tableData.map((data) => {
            Object.keys(data).forEach((key) => {
                let content = data[key].content;
                const color = data[key].color;
                if (color) {
                    content = chalk.bgHex(color)(data[key].content);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (<any>data[key]) = content;
            });
            return data;
        });

        return chalkTable(options, tableInfo);
    }
}
