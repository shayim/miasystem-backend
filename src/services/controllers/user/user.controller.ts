import { JsonController, Post, Body, Get, Param } from 'routing-controllers'

@JsonController('/api/users')
export class UserController {
  @Get()
  async GetAll() {
    return [{ id: 1, name: 'howard' }]
  }
  @Get('/:id')
  async GetById(@Param('id') id: string) {
    return [{ id: 1, name: 'howard' }].find(p => p.id === +id)
  }
  @Post('/register')
  async register(@Body() body) {
    // TODO: Register user with email & password
    return { email: body.email }
  }

  @Post('/login')
  async login(@Body() body) {
    // TODO: Login user with email & password
    return { email: body.email, message: 'success' }
  }
}
