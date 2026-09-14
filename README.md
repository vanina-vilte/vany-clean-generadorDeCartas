# vany-clean-generadorDeCartas

Generador de cartas de presentación de Vany Clean. Es una app web local (no necesita instalación ni internet para funcionar) que mantiene el formato institucional (tipografía, colores, logos y estructura) y permite completar solo lo que cambia en cada carta.

## Cómo usarlo

1. Abrí `index.html` haciendo doble clic (se abre en el navegador).
2. Completá:
   - **Fecha** y **saludo** (a quien corresponda).
   - **Primer párrafo**: la presentación adaptada a la empresa a la que le escribís.
   - **Párrafo de cierre**: la invitación a la visita de diagnóstico, adaptando el lugar (oficinas, instituto, local, etc.).
3. El resto del texto (los tres párrafos institucionales de "De eso se ocupa Vany Clean...", el cierre de agradecimiento y la firma) queda fijo y no se edita, para mantener siempre el mismo mensaje.
4. Usá **Vista previa** para ver la carta actualizada.
5. Usá **Descargar PDF** para guardar la carta lista para enviar por mail (el nombre del archivo se genera solo, tipo "VanyClean - Carta Empresa Contacto.pdf").

## Estructura del proyecto

- `index.html` — formulario + vista previa.
- `app.js` — lógica: textos fijos, armado de la carta y exportación a PDF.
- `assets/styles.css` — estilos de la carta (tipografías Baloo 2 / Nunito Sans y logos embebidos, para que funcione sin conexión).
- `assets/logos.js` — logos de Vany Clean en base64.
- `vendor/html2pdf.bundle.min.js` — librería usada para exportar a PDF (incluida localmente, no requiere internet).

## Notas

- Todo funciona sin conexión a internet una vez descargado el proyecto.
- Si el botón "Descargar PDF" no funciona en tu navegador, como alternativa podés usar Ctrl+P (Imprimir) y elegir "Guardar como PDF".
