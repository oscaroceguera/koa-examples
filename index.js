var koa = require('koa')
var router = require('koa-router')

var app = koa()

app.use(router(app))

app.use(function* (next) {
  // before
  var timestampBefore = new Date().getTime()
  yield next

  // after
  var timestampAfter = new Date().getTime()
  var difference = timestampAfter - timestampBefore
  console.log('Process took ' + difference + 'ms');

})

app.use(function* () {
  this.body = 'hello word!'
})

app.all('/users', function* (next) {
  switch (this.request.method) {
    case 'GET':
      var users = []
      this.body = users
      break;
    case 'POST':
      this.body = "Not implemented yet"
  }
})

app.listen(3000)
