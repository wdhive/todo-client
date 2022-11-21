export default {
  connect: function (socket) {
    console.log(socket.id)
  },
  disconnect: function () {
    console.log('Socket disconnect')
  },
}
