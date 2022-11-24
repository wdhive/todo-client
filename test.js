fetch(url, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({
    hello: 'world!',
  }),
})

axios.post(url, {
  hello: 'world!',
})




