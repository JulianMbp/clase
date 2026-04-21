import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

dotenv.config();

const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 3000;

// Pool de conexión a Postgres (RDS)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint de salud
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

// Obtener todos los TODOs
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, completed, created_at FROM todos ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error GET /todos", err);
    res.status(500).json({ error: "Error obteniendo todos" });
  }
});

// Crear un TODO
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "title es requerido" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed, created_at",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error POST /todos", err);
    res.status(500).json({ error: "Error creando todo" });
  }
});

// Actualizar un TODO
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const result = await pool.query(
      `UPDATE todos
       SET title = COALESCE($1, title),
           completed = COALESCE($2, completed)
       WHERE id = $3
       RETURNING id, title, completed, created_at`,
      [title ?? null, completed ?? null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error PUT /todos/:id", err);
    res.status(500).json({ error: "Error actualizando todo" });
  }
});

// Borrar un TODO
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo no encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error DELETE /todos/:id", err);
    res.status(500).json({ error: "Error borrando todo" });
  }
});

app.listen(port, () => {
  console.log(`TODO API escuchando en http://0.0.0.0:${port}`);
});

