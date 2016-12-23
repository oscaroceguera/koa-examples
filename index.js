var koa = require('koa')
var router = require('koa-router')
var mongoose = require('mongoose')
var parse = require('co-body')

// define the user schema
var userSchema = new mongoose.Schema({
  'firstname': {
    type: String,
    required: true
  },
  'lastname': {
    type: String,
    required: true
  }
})

// turn schema into a mongoose model
var User = mongoose.model('User', userSchema)

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
      try {
        var users = []
        this.body = users
      } catch(e) {
        this.trhow(500, e)
      }
      break;
    case 'POST':
      // parse the request body
      var body = yield parse(this)

      // create the user which we want to save
      var userToSave = new User({
        firstname: body.firstname,
        lastname: body.lastname
      })

      // try to save it, catch errors
      try {
        yield userToSave.save()
        this.body = 'Success!'
      } catch(e) {
        this.throw(500, e)
      }
      break
  }
})

app.listen(3000)
