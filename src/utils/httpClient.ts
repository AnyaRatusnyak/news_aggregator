const BASE_URL = "http://localhost:8080/api";

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function getData<T>(url: string):Promise<T> {
  return fetch(BASE_URL + url)
  .then(handleResponse);
}

export function postData(url: string, data: any): Promise<T> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
   return fetch(BASE_URL + url, options)
   .then(handleResponse);
}

export function updateData(url: string, data: any): Promise<T> {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(BASE_URL + url, options).then(handleResponse);
}