interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code?: number

  /**
   * 数据
   * @type { T }
   */
  data: T

  status: boolean

  /**
   * 消息
   * @type { string }
   */
  message?: string
}

import axios from 'axios'

export function getUser<T>() {
  return axios
    .get<ResponseData<T>>('/somepath')
    .then(res => res.data)
    .catch(err => console.error(err))
}

interface User {
  name: string
  age: number
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>()

  if (typeof user !== 'undefined') {
    user.data.age
  }
}
