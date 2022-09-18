export class FeatureFlagService {
    public static async get(flag: FeatureFlag): Promise<boolean> {
        return flags[flag];
    }
}

export enum FeatureFlag {
    USE_CHALK_TABLE = "USE_CHALK_TABLE",
    ALLOW_TERMINAL_KIT_TABLE_COLORS = "ALLOW_TERMINAL_KIT_TABLE_COLORS",
}

const flags = {
    [FeatureFlag.USE_CHALK_TABLE]: true,
    [FeatureFlag.ALLOW_TERMINAL_KIT_TABLE_COLORS]: false,
};
