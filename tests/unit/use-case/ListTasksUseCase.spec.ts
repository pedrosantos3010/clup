import { ListTasksUseCase } from "../../../src/use-case/ListTasksUseCase";
import { TerminalView } from "../../../src/view/TerminalView";

describe("ListTasksUseCase", () => {
    it("should end with error if there is no tasks", async () => {
        const fakeTerminalView = {
            waitAction: jest.fn(),
            endWithError: jest.fn(),
        } as unknown as jest.Mocked<TerminalView>;
        const fakeConfigService = {
            getConfig: () => ({
                list: { id: 0 },
                folder: { name: "list example" },
            }),
        } as any;

        fakeTerminalView.waitAction.mockResolvedValueOnce(null);

        const sut = new ListTasksUseCase(fakeTerminalView, fakeConfigService);

        await sut.exec({});

        expect(fakeTerminalView.endWithError).toHaveBeenCalledWith(
            "There is no tasks at list example"
        );
    });
});
