import { CLICKUP_BASE_URL } from '../ClickupConfig'
import { request } from './fetch'

export const fetchWorkspaces = async (
  apiKey: string
): Promise<Array<{
  index: number
  id: string
  name: string
}> | null> => {
  const result = await request(`${CLICKUP_BASE_URL}/team`, apiKey)

  return result?.data?.teams?.map((item, index) => ({
    index: index,
    id: item.id,
    name: item.name,
  }))
}
