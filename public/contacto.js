document.getElementById("form-contacto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerText = "Enviando mensaje...";
  resultadoDiv.style.color = "black";

  const data = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    mensaje: document.getElementById("mensaje").value
  };

  try {
    const respuesta = await fetch("https://n8n.comercialsl.com/webhook/formulario-hellomendoza", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await respuesta.json();

    if (json.ok) {
      resultadoDiv.innerText = "✅ Mensaje enviado correctamente.";
      resultadoDiv.style.color = "green";
      document.getElementById("form-contacto").reset();
    } else {
      resultadoDiv.innerText = "❌ Error al enviar mensaje.";
      resultadoDiv.style.color = "red";
    }

  } catch (error) {
    resultadoDiv.innerText = "❌ Error de conexión con el servidor.";
    resultadoDiv.style.color = "red";
  }
});

