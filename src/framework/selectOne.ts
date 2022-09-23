import { TerminalView } from "../view/TerminalView";

type SelectableItem = {
    index: number;
    id: string;
    name: string;
};

export async function fetchAndSelectOne<T extends SelectableItem>(
    fetch: () => Promise<T[] | undefined>,
    terminal: TerminalView,
    label: string
): Promise<T> {
    const item = await terminal.waitAction(fetch());

    if (!item) {
        terminal.endWithError(`no ${label} was found`);
        throw new Error("Failed to end!");
    }

    const selectedSpace = await terminal.selectItem(
        [...item.map((s) => s.name), "go back"],
        { header: label }
    );

    if (selectedSpace.index === item.length) {
        // TODO: improve go back function
        throw new Error("Need go back");
    }

    return item[selectedSpace.index];
}
