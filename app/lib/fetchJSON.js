/* globals fetch */

// import { } from 'react-native'
import Logger from "../lib/Logger";

const fetchJSON = async function fetchJSON(
  url,
  {
    contentType = "application/json",
    method = "get",
    payload = null,
    timeout = 10000,
    tokenBasic,
    tokenBearer
  } = {}
) {
  try {
    Logger.debug(`fetchJSON(): ${method.toUpperCase()} ${url}`);

    // const connected = await NetInfo.isConnected.fetch();
    // if (!connected) {
    //   throw Error('Network connection is unavailable');
    // }

    const options = {
      method,
      headers: {
        Accept: "application/vnd.shiftcare.v1",
        // Accept: 'application/json',
        "Content-Type": contentType
      },
      timeout
    };

    if (payload) {
      Logger.debug("fetchJSON(): payload", payload);
      if (contentType === "application/json") {
        options.body = JSON.stringify(payload);
      } else {
        options.body = payload;
      }
    }

    if (tokenBasic) {
      options.headers["X-AUTHENTICATION-TOKEN"] = `${tokenBasic}`;
    } else if (tokenBearer) {
      options.headers.Authorization = `Bearer ${tokenBearer}`;
    }

    // const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", options)
    const response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
      const json = await response.json();
      Logger.debug(`fetchJSON(): response ${response.status}`, json);
      return json;
    }

    let errorMessage = `HTTP ${response.status}`;
    if (response.statusText) {
      errorMessage += `: ${response.statusText}`;
    }
    if (response._bodyText) {
      errorMessage += `: ${response._bodyText}`;
    }

    const error = new Error(errorMessage);
    error.response = response;
    error.body = await response.json();
    throw error;
  } catch (err) {
    Logger.info(
      `fetchJSON(): ${method.toUpperCase()} ${url} failed`,
      err.response,
      err
    );
    throw err;
  }
};

fetchJSON.get = async function getJSON(url, options) {
  return await fetchJSON(url, {
    ...options,
    method: "GET"
  });
};

fetchJSON.patch = async function patchJSON(url, options) {
  return await fetchJSON(url, {
    ...options,
    method: "PATCH"
  });
};

fetchJSON.post = async function postJSON(url, options) {
  return await fetchJSON(url, {
    ...options,
    method: "POST"
  });
};

fetchJSON.put = async function putJSON(url, options) {
  return await fetchJSON(url, {
    ...options,
    method: "PUT"
  });
};

export default fetchJSON;
