import { ListInfo } from "../types";
import { CLICKUP_BASE_URL } from "../ClickupConfig";
import { request } from "./fetch";

export const fetchLists = async (
  apiKey: string,
  folderId: string
): Promise<ListInfo[] | null> => {
  const url = `${CLICKUP_BASE_URL}/folder/${folderId}/list`;
  const result = await request(url, apiKey);

  return result?.data?.lists?.map((item, index) => ({
    index: index,
    id: item.id,
    name: item.name,
    lists: item.lists?.map((list) => ({ id: list.id, name: list.name })),
  }));
};
