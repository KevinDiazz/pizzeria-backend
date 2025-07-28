const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => res.send(`Running in ${PORT}`));

let pizzas = [
  {
    ingredientes: ["Aqui veras las pizzas que añadas"],
    cantidad: 0,
    precio: 0,
    id: 0,
  },
];

app.get("/api/pizzas", (req, res) => {
  console.log("Pizzas:", pizzas);
  res.json(pizzas);
});

let pizzaIdCounter = 0;

app.post("/api/pizzas", express.json(), (req, res) => {
  const nuevaPizza = { id: pizzaIdCounter++, ...req.body };
  if (
    pizzas.length === 1 &&
    pizzas[0].ingredientes.length === 1 &&
    pizzas[0].ingredientes[0] === "Aqui veras las pizzas que añadas" &&
    pizzas[0].cantidad === 0 &&
    pizzas[0].precio === 0
  ) {
    pizzas = [nuevaPizza];
  } else {
    pizzas.push(nuevaPizza);
  }
  res.status(201).json(nuevaPizza);
  console.log(pizzas);
});

app.delete("/api/pizzas/:id", (req, res) => {
  console.log(req.params.id); // ahora sí existe
  const id = parseInt(req.params.id, 10);
  const index = pizzas.findIndex((p) => p.id === id);
  if (index === -1) {
    console.error("Pizza no encontrada para eliminar:", id);
    return res.status(404).json({ error: "Pizza no encontrada" });
  }
  pizzas.splice(index, 1);
  res.status(200).json({ message: "pizza eliminada" });
});

app.listen({PORT}, "0.0.0.0", () => console.log(`Server on ${PORT}`));
