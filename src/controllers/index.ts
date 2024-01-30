// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata'

import { Context } from 'koa'
import Router from 'koa-router'
import { Service } from 'typedi'
import { PostController } from './post.ctrl'
import { AuthController } from './auth.ctrl'

@Service()
export class Routes {
  private router: Router

  constructor(
    // eslint-disable-next-line no-unused-vars
    private postController: PostController,
    // eslint-disable-next-line no-unused-vars
    private authController: AuthController
  ) {
    this.router = new Router()
    this.setRoutes()
  }

  private setRoutes() {
    this.router.get('/posts', this.postController.getPosts)
    this.router.get('/posts/:id', this.postController.getPost)
    this.router.post('/auth/signup', this.authController.signup)

    this.router.all('*', (ctx: Context) => {
      ctx.status = 404
      ctx.body = '존재하지 않는 API 입니다'
    })
  }

  public getRoutes() {
    return this.router.routes()
  }
}
