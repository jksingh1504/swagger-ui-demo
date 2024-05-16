"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_output_json_1 = __importDefault(require("../../src/swagger-output.json"));
const router = (0, express_1.default)();
// Serve Swagger JSON
router.get("/swagger.json", (req, res) => {
    // Logic to generate or read the Swagger JSON file
    const swaggerJson = swagger_output_json_1.default; // Replace with your Swagger JSON data
    res.json(swaggerJson);
});
router.get("/api-documentation", (req, res) => {
    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="SwaggerUI" />
    <title>SwaggerUI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  </head>
  <body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/swagger.json',
        dom_id: '#swagger-ui',
      });
    };
    </script>
    </body>
    </html>
  `;
    res.send(html);
});
exports.default = router;
// url: '/.netlify/functions/index/swagger.json',
