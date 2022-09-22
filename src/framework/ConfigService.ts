import path from "path";
import fs from "fs";

import { Config } from "../types";

export class ConfigService {
    public clickupConfig: Config | null = null;
    private configPath = path.join(__dirname, "..", "..", ".clickup");

    public saveConfigFile(config: Config): void {
        this.clickupConfig = config;
        fs.writeFileSync(this.configPath, JSON.stringify(this.clickupConfig));
    }

    public async getConfig(): Promise<Config> {
        if (this.clickupConfig) {
            return this.clickupConfig;
        }

        this.clickupConfig = await this.loadConfig();

        if (!this.clickupConfig) {
            throw new Error("You need to run the config command first");
        }

        return this.clickupConfig;
    }

    private async loadConfig(): Promise<Config | null> {
        if (!fs.existsSync(this.configPath)) {
            return null;
        }

        try {
            const fileContent = fs.readFileSync(this.configPath);
            return JSON.parse(fileContent.toString());
        } catch (e) {
            return null;
        }
    }
}
