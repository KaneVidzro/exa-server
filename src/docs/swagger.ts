import { authPaths } from "./auth.docs";
import { userPaths } from "./user.docs";

export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "Sendexa API",
    description: "API documentation for Sendexa",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:4000/",
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "sendexa-v1",
      },
    },
  },
  security: [{ cookieAuth: [] }],
  paths: {
    ...authPaths,
    ...userPaths,
  },
};
