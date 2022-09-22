import { FeatureFlag, FeatureFlagService } from "../FeatureFlagService";
import { ConfigService } from "../framework/ConfigService";
import { CommandIterator } from "../framework/CommandIterator";
import { fetchAndSelectOne } from "../framework/selectOne";
import { Config } from "../types";
import { fetchFolders } from "../utils/fetchFolders";
import { fetchLists } from "../utils/fetchLists";
import { fetchSpaces } from "../utils/fetchSpaces";
import { fetchWorkSpaces } from "../utils/fetchWorkSpaces";
import { TerminalView } from "../view/TerminalView";

export interface ChangeListOptions {
    folder?: boolean;
    workspace?: boolean;
    space?: boolean;
    verbose?: boolean;
}

export class ChangeListUseCase {
    public constructor(private _terminal: TerminalView) {}

    public async exec(options: ChangeListOptions): Promise<void> {
        if (options.verbose) {
            process.env.VERBOSE = "true";
        }
        const configService = new ConfigService();
        const config = await configService.getConfig();

        if (await FeatureFlagService.get(FeatureFlag.USE_OLD_CONFIG)) {
            return await this.previousVersion(options, config);
        }

        const { folder, workspace, space } = options;

        const commands: Array<() => Promise<void>> = [];

        if (space) {
            commands.push(async (): Promise<void> => {
                config.space = await fetchAndSelectOne(
                    async () => await fetchSpaces(config.apiKey),
                    this._terminal,
                    "space"
                );
            });
        }

        if (space || workspace) {
            commands.push(async (): Promise<void> => {
                config.workspace = await fetchAndSelectOne(
                    async () =>
                        await fetchWorkSpaces(config.apiKey, config.space.id),
                    this._terminal,
                    "workspace"
                );
            });
        }

        if (folder || space || workspace) {
            commands.push(async (): Promise<void> => {
                config.folder = await fetchAndSelectOne(
                    async () =>
                        await fetchFolders(config.apiKey, config.workspace.id),
                    this._terminal,
                    "folder"
                );
            });
        }

        commands.push(async (): Promise<void> => {
            config.list = await fetchAndSelectOne(
                async () => await fetchLists(config.apiKey, config.folder.id),
                this._terminal,
                "list"
            );
        });

        const commandIterator = new CommandIterator(commands);
        while (!commandIterator.isEnded()) {
            try {
                await commandIterator.executeCurrent();
                commandIterator.goToNext();
            } catch (e) {
                commandIterator.goToPrevious();
            }
        }

        configService.saveConfigFile(config);

        this._terminal.end();
    }

    private async previousVersion(
        options: ChangeListOptions,
        config: Config
    ): Promise<void> {
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
    }
}
