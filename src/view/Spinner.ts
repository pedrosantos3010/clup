import { terminal } from "terminal-kit";

export class Spinner {
  private spinner: any;

  public constructor() {}

  public async start(): Promise<void> {
    terminal.insertLine(1);
    const spinner = await terminal.spinner({
      animation: "impulse",
    });
    spinner.animate(2);
    this.spinner = spinner;
  }

  public async stop(): Promise<void> {
    this.spinner.animate(false);
    terminal.deleteLine(1);
  }
}
