const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const { swaggerOptions } = require('./openapi');

const swaggerSpec = swaggerJsdoc(swaggerOptions);
const outputFile = path.join(__dirname, 'swagger.json');

fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2));
console.log(`Documentacao OpenAPI gerada em ${outputFile}`);