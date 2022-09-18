import { TableOptions } from "./TableOptions";

export interface TableView {
    displayTable(
        headers: string[],
        tableData: Record<string, TableOptions>[]
    ): string;
}
