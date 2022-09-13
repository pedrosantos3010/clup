import { FolderInfo } from "../types";
import { CLICKUP_BASE_URL } from "../ClickupConfig";
import { request } from "./fetch";

export const fetchFolders = async (
  apiKey: string,
  spaceId: string
): Promise<FolderInfo[] | null> => {
  const url = `${CLICKUP_BASE_URL}/space/${spaceId}/folder`;
  const result = await request(url, apiKey);

  return result?.data?.folders?.map((item, index) => ({
    index: index,
    id: item.id,
    name: item.name,
    lists: item.lists?.map((list) => ({ id: list.id, name: list.name })),
  }));
};
