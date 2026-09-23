const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const { apiReference } = require('@scalar/express-api-reference');
const { swaggerOptions } = require('./openapi');

const app = express();
const routes = require('./routes');
const swaggerSpec = swaggerJsdoc(swaggerOptions);

fs.writeFileSync(
	path.join(__dirname, 'swagger.json'),
	JSON.stringify(swaggerSpec, null, 2)
);

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use('/', routes);

app.use('/docs', apiReference({ spec: { content: swaggerSpec } }));

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).json({
		sucesso: false,
		mensagem: err.message || 'Erro interno do servidor'
	});
});

module.exports = app;