export interface UserInfo {
  id: string;
  username: string;
  color: string;
}

export interface StatusInfo {
  name: string;
  color: string;
  order: number;
}

export interface TaskInfo {
  id: string;
  customId: string;
  name: string;
  status: StatusInfo;
  assignees?: Array<UserInfo>;
}

export interface Config {
  apiKey: string;
  workspace: { id: string; name: string };
  space: { id: string; name: string };
  folder: { id: string; name: string };
  list: { id: string; name: string }; //Array<{ id: string; name: string }> | null
}

export interface FolderInfo {
  index: number;
  id: string;
  name: string;
  lists: Array<{ id: string; name: string }>;
}

export interface ListInfo {
  index: number;
  id: string;
  name: string;
}
