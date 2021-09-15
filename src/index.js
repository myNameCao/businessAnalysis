getUserData = uid => {
  //return axios.get('/api/user/' + uid);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        data: {
          errcode: 0,
          data: {
            uid: 1,
            username: 'tom'
          }
        }
      })
    }, 100)
  })
}
