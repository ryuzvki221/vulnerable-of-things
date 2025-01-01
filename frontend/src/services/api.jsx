//fetch data
const get = async (url) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await fetch(`${url}`, requestOptions).then(handleResponse);
};

// helper functions
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (response.status === 401) {
      console.log("Unauthorized access");
      signOut();
    } 
    
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}


export const api = {
  get,
};