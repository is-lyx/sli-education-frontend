import request from '@/utils/request'
/* 连接接口登录端
export function login(data) {
  return request({
    url: '/qizhi/user/login',
    method: 'post',
    params: data
  })
}*/
// 未连接接口登录端
export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 修改密码（为连接接口新增）
export function updatePassword(data) {
  return request({
    url: '/user/editUserPassword',
    method: 'post',
    data
  })
}
