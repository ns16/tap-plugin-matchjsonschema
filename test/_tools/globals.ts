export const describe = (description, t, cb) => {
  t.test(description, t => {
    cb(t)
    t.end()
  })
}
