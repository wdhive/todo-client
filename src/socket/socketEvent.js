export default {
  connect: function (msg) {
    console.log(msg.id)
  },
  disconnect: function () {
    console.log('Socket disconnect')
  },
}
