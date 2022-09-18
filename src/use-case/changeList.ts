import { ConfigService } from "../framework/ConfigService";
import { fetchAndSelectOne } from "../framework/selectOne";
import { fetchFolders } from "../utils/fetchFolders";
import { fetchLists } from "../utils/fetchLists";
import { fetchSpaces } from "../utils/fetchSpaces";
import { fetchWorkSpaces } from "../utils/fetchWorkSpaces";
import { TerminalView } from "../view/TerminalView";

interface Options {
    folder?: boolean;
    workspace?: boolean;
    space?: boolean;
}

export class ChangeListUseCase {
    public constructor(private _terminal: TerminalView) {}

    public async exec(options: Options): Promise<void> {
        const configService = new ConfigService();
        const config = await configService.getConfig();

        console.log("options: ", options);

        const { folder, workspace, space } = options;

        if (space) {
            config.space = await fetchAndSelectOne(
                async () => await fetchSpaces(config.apiKey),
                this._terminal,
                "space"
            );
        }

        if (space || workspace) {
            config.workspace = await fetchAndSelectOne(
                async () =>
                    await fetchWorkSpaces(config.apiKey, config.space.id),
                this._terminal,
                "workspace"
            );
        }

        if (folder || space || workspace) {
            config.folder = await fetchAndSelectOne(
                async () =>
                    await fetchFolders(config.apiKey, config.workspace.id),
                this._terminal,
                "folder"
            );
        }

        config.list = await fetchAndSelectOne(
            async () => await fetchLists(config.apiKey, config.folder.id),
            this._terminal,
            "list"
        );

        configService.saveConfigFile(config);

        this._terminal.end();
    }
}
