const users = [
  {
    username: 'admin', password: '12345', token: 'admin'
  },
]
export default [
  {
    url: `/mock/user/login`,
    method: 'post',
    response: ({body}) => {
      const user = users.find(user => {
        return body.username === user.username && body.password === user.password
      })
      if (user) {
        return {
          code: 200,
          data: {
            token: user.token,
          },
        };
      } else {
        return {
          code: 401,
          data: {},
          msg: '用户名或密码错误'
        };
      }
    }
  },
  {
    url: `/mock/user/out`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {},
        msg: 'success'
      };
    }
  }
]