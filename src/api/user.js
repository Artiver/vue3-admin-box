import request from '@/utils/system/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

export function logout() {
  return request({
    url: '/user/out',
    method: 'post',
    baseURL: '/mock'
  })
}
