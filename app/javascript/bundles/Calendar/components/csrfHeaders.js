const token       = document
                      .querySelector('meta[name="csrf-token"]')
                      .getAttribute('content')

const csrfHeaders = {
                      'X-Requested-With': 'XMLHttpRequest',
                      'X-CSRF-TOKEN':     token
                    }

export { csrfHeaders }
