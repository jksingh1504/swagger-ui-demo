import express, { Request, Response } from "express";
import swaggerDocument from "../../src/swagger-output.json";

const router = express();

// Serve Swagger JSON
router.get("/swagger.json", (req, res) => {
  // Logic to generate or read the Swagger JSON file
  const swaggerJson = swaggerDocument; // Replace with your Swagger JSON data
  res.json(swaggerJson);
});

router.get("/api-documentation", (req: Request, res: Response) => {
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

export default router;

// url: '/.netlify/functions/index/swagger.json',
