export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrls = (input) => {
  return fetch("http://localhost:3001/api/v1/urls", {
    method:'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...input, id:Date.now()})
  })
  .then(response => response.json())
}
