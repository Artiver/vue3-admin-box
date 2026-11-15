import request from "@/utils/system/request";

export interface LoginParams {
  username: string;
  password: string;
}

export function login(data: LoginParams) {
  return request({
    url: "/user/login",
    method: "post",
    data: data
  })
}

export function logout() {
  return request({
    url: "/user/out",
    method: "post",
  })
}
