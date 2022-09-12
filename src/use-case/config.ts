import { fetchWorkspaces } from "../utils/fetchWorkspaces";
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

    const workspaces = await terminal.waitAction(fetchWorkspaces(apiKey));

    if (!workspaces) {
      return terminal.end();
    }

    const selection = await terminal.selectItem(
      workspaces.map((w) => w.name),
      { header: "workspace" }
    );

    console.log("finalizou", workspaces[selection.index]);

    terminal.end();
  };
}

//     spinner.start('Fetching spaces')
//     const spaces = await fetchSpaces(apiKey, workspace.id)
//     spinner.stop()
//     const space = await selectItem(spaces, 'space', toolbox)

//     spinner.start('Fetching folders...')
//     const folders = await fetchFolders(apiKey, space.id)
//     spinner.stop()
//     const folder = await selectItem(folders, 'folder', toolbox)

//     const { listOrFolder } = await prompt.ask({
//       type: 'select',
//       name: 'listOrFolder',
//       message: [
//         'Do you want to filter all tasks by list or by folder?',
//         '*If you choose folders commands can be a bit slower than using lists',
//       ].join('\n'),
//       choices: ['list', 'folder'],
//     })

//     let selectedLists: ListInfo[] | null = null
//     if (listOrFolder === 'list') {
//       spinner.start('Fetching lists...')
//       const lists = await fetchLists(apiKey, folder.id)
//       spinner.stop()
//       selectedLists = await multiSelectItem(lists, 'lists', toolbox)
//     }

//     const config: Config = {
//       apiKey,
//       workspace,
//       space,
//       folder,
//       lists: selectedLists,
//     }

//     clickup.saveApiKey(config)
//     print.success('You are ready to use the clickup CLI')
//   },
// }

// export default command

// const multiSelectItem = async <T extends { name: string }>(
//   itens: Array<T> | null,
//   itemLabel: string,
//   { print, prompt }: GluegunToolbox
// ) => {
//   if (!itens) {
//     print.error(`Could not fetch ${itemLabel}`)
//     exit(-1)
//   }

//   const { selection } = await prompt.ask({
//     type: 'multiselect',
//     name: 'selection',
//     message: `Select a ${itemLabel}`,
//     choices: itens.map((space) => space.name),
//   })

//   if (!selection) {
//     print.error(`You need to select a ${itemLabel}`)
//     exit(-1)
//   }

//   return itens.filter((item) => selection.includes(item.name))
// }
