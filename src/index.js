const invalid = {error: "Invalid basic auth token form"};

module.exports = (authenticate) => (req) => {
  let header = req.headers.authorization;

  if (!/^[b|B]asic [a-zA-Z0-9\=\+\/]+/.test(header)) {
    return Promise.reject(invalid);
  }

  const [type, token] = header.split(" ");

  if (type.toLowerCase() !== 'basic') {
    return Promise.reject(invalid);
  }

  const parts = Buffer.from(token, 'base64').toString().split(":")

  if (parts.length !== 2) {
    return Promise.reject(invalid);
  }

  let [username, password] = parts;

  return authenticate(username, password);
};

