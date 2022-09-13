import { CLICKUP_BASE_URL } from '../ClickupConfig'
import { TaskInfo, UserInfo } from '../types'
import { request } from './fetch'

interface FetchTasksOpstions {
  includesSubtasks: boolean
  assignee: string
}

export const fetchTasks = async (
  apiKey: string,
  listId: string,
  options?: FetchTasksOpstions
): Promise<TaskInfo[] | null> => {
  const params = getParams(options)
  const url = `${CLICKUP_BASE_URL}/list/${listId}/task?${params}`

  const result = await request(url, apiKey)

  const tasks = result?.data?.tasks?.map(
    (task): TaskInfo => ({
      id: task.id,
      customId: task.custom_id,
      name: task.name,
      status: {
        name: task.status?.status,
        color: task.status?.color,
        order: task.status?.orderindex,
      },
      assignees: task.assignees?.map(
        (assignee): UserInfo => ({
          username: assignee.username,
          color: assignee.color,
          id: assignee.id,
        })
      ),
    })
  )
  return tasks
}

function getParams(options?: FetchTasksOpstions) {
  let params = ''
  if (options?.includesSubtasks) {
    params += 'includesubtasks=true'
  }
  if (options?.assignee) {
    params += `assignees%5B%5D=${options?.assignee}`
  }
  return params
}
