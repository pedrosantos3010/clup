import { TerminalView } from "../view/TerminalView";

type SelectableItem = {
    index: number;
    id: string;
    name: string;
};

export async function fetchAndSelectOne<T extends SelectableItem>(
    fetch: () => Promise<T[] | null>,
    terminal: TerminalView,
    label: string
): Promise<T> {
    const item = await terminal.waitAction(fetch());

    if (!item) {
        terminal.endWithError(`no ${label} was found`);
        throw new Error("Failed to end!");
    }

    const selectedSpace = await terminal.selectItem(
        item.map((s) => s.name),
        { header: label }
    );

    return item[selectedSpace.index];
}
