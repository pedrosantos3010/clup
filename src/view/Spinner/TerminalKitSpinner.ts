import { terminal, Terminal } from "terminal-kit";

export class TerminalKitSpinner {
    private spinner?: Terminal.AnimatedText;

    public async start(): Promise<void> {
        terminal.insertLine(1);
        const spinner = await terminal.spinner({
            animation: "impulse",
        });
        spinner.animate(2);
        this.spinner = spinner;
    }

    public async stop(): Promise<void> {
        if (!this.spinner) {
            return;
        }
        this.spinner.animate(false);
        terminal.deleteLine(1);
    }
}
