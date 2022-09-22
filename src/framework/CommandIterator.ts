type Command = () => Promise<unknown>;

export class CommandIterator {
    private _currentCommandIndex = 0;

    public get currentCommandIndex(): number {
        return this._currentCommandIndex;
    }

    public constructor(private _commands: Command[]) {}

    public isEnded(): boolean {
        return this._currentCommandIndex === this._commands.length;
    }

    public goToNext(): void {
        if (this._currentCommandIndex < this._commands.length) {
            this._currentCommandIndex += 1;
        }
    }

    public goToPrevious(): void {
        if (this._currentCommandIndex > 0) {
            this._currentCommandIndex -= 1;
        }
    }

    public async executeCurrent(): Promise<unknown> {
        if (this.isEnded()) {
            return;
        }
        return await this._commands[this._currentCommandIndex]();
    }

    // public async *executeAll() {
    //     while (this._currentCommandIndex < this._commands.length - 1) {
    //         yield await this.executeCurrent();
    //         this.goToNext();
    //     }
    // }
}
