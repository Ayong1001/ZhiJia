import http from '@/utils/request.js'

function add(data) {
  return http({
    url: '/worker/add',
    method: 'POST',
    data: data
  })
}
function worker(data) {
  return http({
    url: '/worker/id',
    method: 'GET',
    data: data
  })
}
function workers(data) {
  return http({
    url: '/worker',
    method: 'GET',
    data: data
  })
}

export { add, worker, workers }
