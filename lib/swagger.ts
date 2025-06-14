// lib/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Next.js 15",
      version: "1.0.0",
    },
  },
  apis: ["app/api/**/*.ts"], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
