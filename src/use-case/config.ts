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

export function config(terminal: TerminalView) {
  return async () => {
    terminal.displayLogo();

    terminal.showText(API_MESSAGE);
    terminal.showText("API_KEY> ", { colorHex: Color.PURPLE });
    const apiKey = await terminal.getInput();

    const space = await fetchAndSelectOne(
      async () => await fetchSpaces(apiKey),
      terminal,
      "space"
    );

    const workspace = await fetchAndSelectOne(
      async () => await fetchWorkSpaces(apiKey, space.id),
      terminal,
      "workspace"
    );

    const folder = await fetchAndSelectOne(
      async () => await fetchFolders(apiKey, workspace.id),
      terminal,
      "folder"
    );

    const list = await fetchAndSelectOne(
      async () => await fetchLists(apiKey, folder.id),
      terminal,
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

    terminal.end();
  };
}
