#!/usr/bin/env node

import { Cli } from "./cli";
import { FeatureFlag, FeatureFlagService } from "./FeatureFlagService";
import { ChangeListUseCase } from "./use-case/changeList";
import { config } from "./use-case/config";
import { listTasks } from "./use-case/listTasks";
import { Spinner } from "./view/Spinner";
import { ChalkTable } from "./view/Table/ChalkTable";
import { TableView } from "./view/Table/TableView";
import { TerminalKitTable } from "./view/Table/TerminalKitTable";
import { TerminalView } from "./view/TerminalView";

const cli = new Cli("clup", "A Clickup cli for productivity", "0.0.1");

const exec = async (): Promise<void> => {
    const useChalkTable = await FeatureFlagService.get(
        FeatureFlag.USE_CHALK_TABLE
    );

    let tableView: TableView;
    if (useChalkTable) {
        tableView = new ChalkTable();
    } else {
        const allowTermKitColors = await FeatureFlagService.get(
            FeatureFlag.ALLOW_TERMINAL_KIT_TABLE_COLORS
        );
        tableView = new TerminalKitTable(allowTermKitColors);
    }

    const spinner = new Spinner();
    const terminal = new TerminalView(tableView, spinner);

    cli.addCommand({
        name: "config",
        description: "Configure clup cli with your account",
        action: { exec: async () => await config(terminal)() },
    });

    cli.addCommand({
        name: "ls",
        description: "list tasks in the current list",
        action: { exec: async () => await listTasks(terminal)() },
    });

    cli.addCommand({
        name: "cd",
        description: "change current folder and list",
        action: new ChangeListUseCase(terminal),
        options: [
            {
                shortcut: "-f",
                name: "--folder",
                description: "Change folder and list",
                default: false,
            },
            {
                shortcut: "-w",
                name: "--workspace",
                description: "Change workspace, folder and list",
                default: false,
            },
            {
                shortcut: "-s",
                name: "--space",
                description: "Change space, workspace, folder and list",
                default: false,
            },
        ],
    });

    cli.start();
};
exec();
