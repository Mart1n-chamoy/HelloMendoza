document.getElementById("form-contacto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const t = window.HM_I18N ? window.HM_I18N.t : (key) => key;

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerText = t("contact.sending");
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
      resultadoDiv.innerText = t("contact.success");
      resultadoDiv.style.color = "green";
      document.getElementById("form-contacto").reset();
    } else {
      resultadoDiv.innerText = t("contact.error_server");
      resultadoDiv.style.color = "red";
    }

  } catch (error) {
    resultadoDiv.innerText = t("contact.error_conn");
    resultadoDiv.style.color = "red";
  }
});
