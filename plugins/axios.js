export default function ({ $axios }) {
  $axios.onError((error) => {
    // const code = parseInt(error.response && error.response.status)
    console.error(error)
  })
}
