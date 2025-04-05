type Environment = "development" | "production";

interface Config {
  api_uri: string;
  next_auth_url: string;
  environment: Environment;
}

const defaultConfig: Config = {
  api_uri: "http://localhost:8080/api",
  next_auth_url: "http://localhost:3000",
  environment: "development",
};

const config: Config = Object.assign({}, defaultConfig, {
  api_uri: process.env.API_URI,
  next_auth_url: process.env.NEXTAUTH_URL,
  environment: process.env.ENVIRONMENT as Environment,
});

export default config;
