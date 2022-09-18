import { ConfigService } from "../framework/ConfigService";
import { fetchAndSelectOne } from "../framework/selectOne";
import { Config } from "../types";
import { fetchFolders } from "../utils/fetchFolders";
import { fetchLists } from "../utils/fetchLists";
import { fetchSpaces } from "../utils/fetchSpaces";
import { fetchWorkSpaces } from "../utils/fetchWorkSpaces";
import { Color } from "../view/Colors";
import { TerminalView } from "../view/TerminalView";

const API_MESSAGE = `
Before using the clickup CLI, you'll need an API key from clickup.
Go to https://clickup.com/
Once you have your API key, enter it below.`;

export class ConfigUseCase {
    public constructor(private _terminal: TerminalView) {}

    public async exec(): Promise<void> {
        this._terminal.displayLogo();

        this._terminal.showText(API_MESSAGE);
        this._terminal.showText("API_KEY> ", { colorHex: Color.PURPLE });
        const apiKey = await this._terminal.getInput();

        const space = await fetchAndSelectOne(
            async () => await fetchSpaces(apiKey),
            this._terminal,
            "space"
        );

        const workspace = await fetchAndSelectOne(
            async () => await fetchWorkSpaces(apiKey, space.id),
            this._terminal,
            "workspace"
        );

        const folder = await fetchAndSelectOne(
            async () => await fetchFolders(apiKey, workspace.id),
            this._terminal,
            "folder"
        );

        const list = await fetchAndSelectOne(
            async () => await fetchLists(apiKey, folder.id),
            this._terminal,
            "list"
        );
        const config: Config = {
            apiKey,
            workspace,
            space,
            folder,
            list,
        };
        const configService = new ConfigService();
        configService.saveConfigFile(config);

        this._terminal.end();
    }
}
