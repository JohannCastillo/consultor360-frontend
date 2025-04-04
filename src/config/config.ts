interface Config {
  api_uri: string;
}

const config: Config = {
  api_uri: process.env.API_URI || "http://localhost:8080/api",
};

export default config;
