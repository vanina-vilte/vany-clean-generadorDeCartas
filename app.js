// Generador de cartas de presentación — Vany Clean
// Bloques fijos institucionales: no se exponen como campos editables.

const FIXED_PARA_1 =
  'De eso se ocupa <strong>Vany Clean</strong>. Brindamos servicios profesionales de limpieza y mantenimiento ' +
  'para empresas e instituciones en CABA y AMBA, respaldados por <strong>más de 25 años de trayectoria</strong> ' +
  'en el sector de la limpieza y maestranza.';

const FIXED_PARA_2 =
  'Trabajamos con colaboradores registrados, con <strong>ART y seguro de responsabilidad civil vigentes</strong>, ' +
  'un <strong>supervisor asignado a cada servicio</strong> que realiza recorridos periódicos, y ' +
  '<strong>cobertura garantizada ante ausencias</strong>. Si un colaborador falta, cubrimos el servicio el mismo día, ' +
  'sin que eso implique gestión adicional de su lado.';

const FIXED_PARA_3 =
  'Le adjuntamos nuestra carpeta de servicios, donde encontrará el detalle de nuestro trabajo en limpieza de oficinas, ' +
  'áreas de salud, consorcios, concesionarias y estacionamientos.';

const FIXED_CLOSING =
  'Desde ya, agradecemos la oportunidad y quedamos a disposición.';

const SIGN_NAME = 'Vanina Solange Vilte';
const SIGN_ROLE = 'Directora General — Vany Clean';
const SIGN_META_HTML =
  '<a href="https://wa.me/+5491168657063">11 6865-7063</a> &nbsp;·&nbsp; vvilte@vanyclean.com.ar &nbsp;·&nbsp; CABA y AMBA';

const FOOTER_LEFT = 'Vany Clean · Servicios de limpieza';
const FOOTER_RIGHT = 'www.vanyclean.com.ar';

const DEFAULT_INTRO =
  'En [Empresa], el estado de las oficinas y los espacios comunes dice mucho de cómo funciona la organización ' +
  'puertas adentro. Sostener ese nivel todos los días, sin que nadie tenga que estar pendiente, requiere ' +
  'organización, personal capacitado y seguimiento real.';

const DEFAULT_CIERRE =
  'Nos gustaría coordinar una visita de diagnóstico sin cargo en sus oficinas, para conocer el espacio y armar ' +
  'una propuesta a medida. Quedamos atentos a su respuesta, o puede escribirnos directamente al 11 6865-7063 o a ' +
  'vvilte@vanyclean.com.ar.';

const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

const PAGE_W_PX = 794;
const PAGE_H_PX = 1123;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Convierte texto plano (con salto de línea = nuevo párrafo) en párrafos <p> escapados,
// preservando saltos simples dentro de un párrafo como <br>.
function textToParagraphsHtml(text) {
  const blocks = String(text || '').split(/\n\s*\n/);
  return blocks
    .map(b => b.trim())
    .filter(b => b.length > 0)
    .map(b => `<p>${escapeHtml(b).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

function formatFechaLarga(dateValue) {
  if (!dateValue) return 'Buenos Aires, <span class="ph">[fecha]</span>';
  const [y, m, d] = dateValue.split('-').map(Number);
  if (!y || !m || !d) return 'Buenos Aires, <span class="ph">[fecha]</span>';
  return `Buenos Aires, ${d} de ${MESES[m - 1]} de ${y}`;
}

function todayInputValue() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function el(id) { return document.getElementById(id); }

function currentValues() {
  return {
    fecha: el('f-fecha').value,
    saludoPrefijo: el('f-saludo-prefijo').value,
    nombreContacto: el('f-nombre-contacto').value.trim(),
    intro: el('f-intro').value,
    cierre: el('f-cierre').value,
  };
}

function renderFixedBlockPreview() {
  el('fixed-block-preview').innerHTML =
    `<p style="margin-bottom:8px">${FIXED_PARA_1}</p>` +
    `<p style="margin-bottom:8px">${FIXED_PARA_2}</p>` +
    `<p style="margin-bottom:8px">${FIXED_PARA_3}</p>` +
    `<p style="margin-bottom:0"><em>… (párrafo de cierre editable) …</em></p>` +
    `<p style="margin-bottom:0">${FIXED_CLOSING}</p>`;
}

function render() {
  const v = currentValues();
  const nombre = v.nombreContacto ? escapeHtml(v.nombreContacto) : '<span class="ph">[Nombre del contacto]</span>';
  const introHtml = v.intro.trim()
    ? textToParagraphsHtml(v.intro)
    : '<p><span class="ph">[Escribí el primer párrafo, personalizado para esta empresa]</span></p>';
  const cierreHtml = v.cierre.trim()
    ? textToParagraphsHtml(v.cierre)
    : '<p><span class="ph">[Escribí el párrafo de cierre / visita de diagnóstico]</span></p>';

  const html = `
    <div class="carta-header">
      <img src="${LOGO_MARK}" style="height:46px; width:auto;" alt="Vany Clean">
      <img src="${LOGO_WORDMARK}" style="height:34px; width:auto;" alt="Vany Clean">
    </div>
    <div class="carta-bar"></div>

    <div class="carta-body">
      <div class="carta-date">${formatFechaLarga(v.fecha)}</div>

      <h1 class="carta-h1">${escapeHtml(v.saludoPrefijo)} ${nombre},</h1>

      ${introHtml}

      <p>${FIXED_PARA_1}</p>
      <p>${FIXED_PARA_2}</p>
      <p>${FIXED_PARA_3}</p>

      ${cierreHtml}

      <p>${FIXED_CLOSING}</p>

      <div class="carta-signblock">
        <div class="name">${SIGN_NAME}</div>
        <div class="role">${SIGN_ROLE}</div>
        <div class="meta">${SIGN_META_HTML}</div>
      </div>
    </div>

    <div class="footer">
      <span>${FOOTER_LEFT}</span>
      <span>${FOOTER_RIGHT}</span>
    </div>
  `;

  el('preview-page').innerHTML = html;
}

function scrollToPreview() {
  if (window.matchMedia('(max-width: 980px)').matches) {
    el('preview-page').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Achica visualmente la vista previa (transform: scale) para que entre en pantallas chicas,
// sin tocar el tamaño real de #preview-page (que tiene que quedar en 794x1123px, A4 exacto,
// para que la exportación a PDF no se vea afectada).
function fitPreview() {
  const col = document.querySelector('.app-preview-col');
  const shell = document.querySelector('.app-preview-shell');
  const sizer = el('preview-sizer');
  const wrap = el('preview-scale-wrap');
  if (!col || !shell || !sizer || !wrap) return;

  const shellPaddingX = parseFloat(getComputedStyle(shell).paddingLeft) * 2;
  const available = col.clientWidth - shellPaddingX;
  const scale = Math.min(1, available / PAGE_W_PX);

  wrap.style.transform = `scale(${scale})`;
  sizer.style.width = `${Math.round(PAGE_W_PX * scale)}px`;
  sizer.style.height = `${Math.round(PAGE_H_PX * scale)}px`;
}

let fitPreviewRaf = null;
function scheduleFitPreview() {
  if (fitPreviewRaf) return;
  fitPreviewRaf = requestAnimationFrame(() => {
    fitPreviewRaf = null;
    fitPreview();
  });
}

function sanitizeFilenamePart(s) {
  return String(s || '')
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '')
    .replace(/\s+/g, ' ');
}

function buildFilename() {
  const empresa = sanitizeFilenamePart(el('f-empresa-archivo').value);
  const contacto = sanitizeFilenamePart(el('f-nombre-contacto').value);
  let name = 'VanyClean - Carta';
  if (empresa) name += ` ${empresa}`;
  if (contacto) name += ` ${contacto}`;
  return `${name}.pdf`;
}

async function downloadPdf() {
  render();
  window.scrollTo(0, 0);
  const pageNode = el('preview-page');
  const wrap = el('preview-scale-wrap');
  const sizer = el('preview-sizer');
  const btn = el('btn-pdf');
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Generando PDF…';

  // En pantallas chicas la vista previa está achicada (transform: scale, dentro de un
  // contenedor recortado a ese tamaño) para que entre en el celular/tablet. La restauramos
  // momentáneamente a su tamaño real (794x1123px, A4) para exportar siempre igual, sin
  // importar el tamaño de pantalla desde donde se descarga.
  const previousTransform = wrap.style.transform;
  const previousSizerWidth = sizer.style.width;
  const previousSizerHeight = sizer.style.height;
  wrap.style.transform = 'none';
  sizer.style.width = `${PAGE_W_PX}px`;
  sizer.style.height = `${PAGE_H_PX}px`;

  try {
    const canvasOpts = { scale: 2, useCORS: true, backgroundColor: '#ffffff', scrollX: 0, scrollY: 0 };

    const canvas = await html2pdf().set({ html2canvas: canvasOpts }).from(pageNode).toCanvas().get('canvas');
    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = await html2pdf().set({
      margin: 0,
      html2canvas: canvasOpts,
      jsPDF: { unit: 'px', format: [PAGE_W_PX, PAGE_H_PX], orientation: 'portrait', hotfixes: ['px_scaling'] },
    }).from(pageNode).toPdf().get('pdf');

    // html2pdf calcula mal el tamaño de la imagen cuando la pantalla tiene un escalado (DPI)
    // distinto de 100%, y la deja más chica que la hoja (de ahí el espacio en blanco a la
    // derecha). Forzamos manualmente que ocupe el 100% de la página, sin depender de ese
    // cálculo automático.
    pdf.addImage(imgData, 'JPEG', 0, 0, PAGE_W_PX, PAGE_H_PX, undefined, 'FAST');
    pdf.save(buildFilename());

    btn.disabled = false;
    btn.textContent = originalLabel;
  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.textContent = originalLabel;
    alert('No se pudo generar el PDF. Probá de nuevo o usá "Imprimir" (Ctrl+P) como alternativa.');
  } finally {
    wrap.style.transform = previousTransform;
    sizer.style.width = previousSizerWidth;
    sizer.style.height = previousSizerHeight;
  }
}

function resetForm() {
  el('f-fecha').value = todayInputValue();
  el('f-saludo-prefijo').value = 'Estimado/a';
  el('f-nombre-contacto').value = '';
  el('f-empresa-archivo').value = '';
  el('f-intro').value = DEFAULT_INTRO;
  el('f-cierre').value = DEFAULT_CIERRE;
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  el('brand-logo').src = LOGO_WORDMARK;
  renderFixedBlockPreview();
  resetForm();
  fitPreview();

  ['f-fecha', 'f-saludo-prefijo', 'f-nombre-contacto', 'f-intro', 'f-cierre'].forEach((id) => {
    el(id).addEventListener('input', render);
    el(id).addEventListener('change', render);
  });

  el('btn-preview').addEventListener('click', () => { render(); scrollToPreview(); });
  el('btn-pdf').addEventListener('click', downloadPdf);
  el('btn-reset').addEventListener('click', () => {
    if (confirm('¿Reiniciar la carta a los valores por defecto?')) resetForm();
  });

  window.addEventListener('resize', scheduleFitPreview);
  window.addEventListener('orientationchange', scheduleFitPreview);
});
