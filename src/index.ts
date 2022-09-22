#!/usr/bin/env node

import { terminal } from "terminal-kit";
import { Cli } from "./cli";
import { ChangeListCommand } from "./commands/ChangeListCommand";
import { ConfigCommand } from "./commands/ConfigCommand";
import { ListTaskCommand } from "./commands/ListTaskCommand";
import { FeatureFlag, FeatureFlagService } from "./FeatureFlagService";
import { TerminalKitSpinner } from "./view/Spinner/TerminalKitSpinner";
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

    const spinner = new TerminalKitSpinner();
    const terminal = new TerminalView(tableView, spinner);

    cli.addCommand(ConfigCommand.createConfigCommand(terminal));
    cli.addCommand(ListTaskCommand.createListTaskCommand(terminal));
    cli.addCommand(ChangeListCommand.createChangeListCommand(terminal));

    cli.start();
};
exec();

const handleErrors = (error: unknown): void => {
    terminal.red("process finished unexpectedly");
    if (process.env.VERBOSE) {
        console.error(error);
    }
    terminal.processExit(-1);
    process.exit(-1);
};
process.on("uncaughtException", handleErrors);
process.on("uncaughtException", handleErrors);
