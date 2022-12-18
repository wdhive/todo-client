// A function that wraps a Promise with a Suspense-compatible
// interface.
//
// The Promise can be unwrapped using the return value's
// `read()` method.
export function suspensify(promise) {
  let status = 'pending'

  // 1. Keep track of the Promise's state. The `status`
  //    variable will update as the Promise moves from
  //    pending to success or error.
  let result
  let suspender = promise.then(
    (res) => {
      // On success, update the status to "success"
      status = 'success'
      result = res
    },
    (error) => {
      // On error, update the status to "error"
      status = 'error'
      result = error
    }
  )

  // 2. Return an object with a `read()` method that does one
  //    of the following:
  //
  //    a) Returns the Promise's resolved value if it's resolved.
  //    b) Sends a signal to a Suspense Boundary if the Promise is pending.
  //    c) Sends a signal to an Error Boundary if the Promise failed.
  return {
    read() {
      if (status === 'pending') {
        // Pending promises are thrown and caught by <Suspense />.
        // FYI: Anything can be thrown in JavaScript, not just Errors.
        throw suspender
      } else if (status === 'error') {
        // Errors are thrown too, but are caught by an Error Boundary.
        throw result
      } else if (status === 'success') {
        // Finally, the Promise result is returned once it's resolved.
        return result
      }
    },
  }
}
