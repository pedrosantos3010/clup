import { CommandIterator } from "../../../src/framework/CommandIterator";

describe("CommandIterator", () => {
    it("should be able to go to the next command", async () => {
        const command1 = async (): Promise<number> => 1 + 1;
        const command2 = async (): Promise<string> => "secondCommand";

        const sut = new CommandIterator([command1, command2]);

        expect(sut.currentCommandIndex).toBe(0);

        sut.goToNext();
        expect(sut.currentCommandIndex).toBe(1);

        sut.goToNext();
        expect(sut.currentCommandIndex).toBe(1);
    });

    it("should be able to go to the previous command", async () => {
        const command1 = async (): Promise<number> => 1 + 1;
        const command2 = async (): Promise<string> => "secondCommand";

        const sut = new CommandIterator([command1, command2]);

        sut.goToNext();
        sut.goToNext();

        expect(sut.currentCommandIndex).toBe(1);

        sut.goToPrevious();
        expect(sut.currentCommandIndex).toBe(0);

        sut.goToPrevious();
        expect(sut.currentCommandIndex).toBe(0);
    });

    it("should be able to execute current command", async () => {
        const command1 = async (): Promise<number> => 1 + 1;
        const command2 = async (): Promise<string> => "secondCommand";

        const sut = new CommandIterator([command1, command2]);

        expect(await sut.executeCurrent()).toBe(2);
        sut.goToNext();
        expect(await sut.executeCurrent()).toBe("secondCommand");
        sut.goToNext();
        expect(await sut.executeCurrent()).toBe("secondCommand");
    });

    // it("should be able to execute all commands until the end", async () => {
    //     const command1 = async (): Promise<number> => 1 + 1;
    //     const command2 = async (): Promise<string> => "secondCommand";

    //     const sut = new CommandIterator([command1, command2]);

    //     const results = [2, "secondCommand"];
    //     let index = 0;
    //     for await (const fun of sut.executeAll()) {
    //         expect(fun).toBe(results[index]);
    //         index += 1;
    //     }
    // });

    // it("should be able to execute all commands until the end", async () => {
    //     const command1 = async (): Promise<number> => 1 + 1;
    //     const command2 = async (): Promise<string> => "secondCommand";
    //     const command3 = async (): Promise<null> => null;
    //     const command4 = async (): Promise<number> => 4;

    //     const sut = new CommandIterator([
    //         command1,
    //         command2,
    //         command3,
    //         command4,
    //     ]);

    //     const results = [2, "secondCommand", null, 4];
    //     let index = 0;
    //     for await (const fun of sut.executeAll()) {
    //         expect(fun).toBe(results[index]);
    //         index += 1;
    //     }
    // });

    // it("should be able to go back to a command while executing all", async () => {
    //     const command1 = jest.fn();
    //     const command2 = jest.fn();
    //     const command3 = jest.fn();

    //     const sut = new CommandIterator([command1, command2, command3]);

    //     command1.mockResolvedValueOnce(1);
    //     command2.mockResolvedValueOnce(2);
    //     command2.mockResolvedValueOnce(3);
    //     command3.mockResolvedValueOnce(4);

    //     let goBackOn2 = true;

    //     let index = 0;
    //     for await (const fun of sut.executeAll()) {
    //         console.log(fun);
    //         index += 1;
    //         if (goBackOn2 && index === 2) {
    //             sut.goToPrevious();
    //             goBackOn2 = false;
    //         }
    //     }

    //     expect(command1).toHaveBeenCalledTimes(1);
    //     expect(command2).toHaveBeenCalledTimes(2);
    //     expect(command3).toHaveBeenCalledTimes(1);
    // });
});
