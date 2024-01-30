/* eslint-disable no-unreachable */
import { Context } from 'koa'
import { Service } from 'typedi'
import { LogService } from '../services/logService'

@Service()
export class AuthController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(private logService: LogService) {}

  public signup = async (ctx: Context) => {
    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    const { userId, password, userName } = ctx.request.body

    try {
      throw new Error('Test Error')

      // ... 회원가입을 로직을 탄다. ( 생략 )

      ctx.status = 200
      ctx.body = {
        message: 'success',
        user: {
          id: userId,
          name: userName,
        },
      }
      return
    } catch (error) {
      const { method, url, header } = ctx.request

      this.logService.error({
        method,
        url,
        header,
        apiName: `[${method}]-${url}`,
        // @ts-ignore
        message: error.message,
      })

      ctx.status = 500
      ctx.body = {
        message: 'server-error',
      }
    }
  }
}
