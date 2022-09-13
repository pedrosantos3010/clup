#!/usr/bin/env node

import { program } from "commander";
import { config } from "./use-case/config";
import { listTasks } from "./use-case/listTasks";
import { TerminalView } from "./view/TerminalView";

const terminal = new TerminalView();

program
  .name("Clup")
  .description("A Clickup cli for productivity")
  .version("0.0.1");

program
  .command("config")
  .description("Configure clup cli with your account")
  .action(config(terminal));

program
  .command("ls")
  .description("list tasks in the current list")
  .action(listTasks(terminal));

program.parse();
