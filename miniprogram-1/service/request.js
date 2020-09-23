export default function request(options){
  return new Promise((resolve,reject) => {
    wx.request({
      url: 'http://134.175.246.52:8080/' + options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: options.header || {
        'content-type': 'application/json'
      },
      success: function(res){
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
      //success: resolve
    })
  })
}