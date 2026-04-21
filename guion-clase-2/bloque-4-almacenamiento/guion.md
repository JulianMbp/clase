## Bloque 4 – Almacenamiento en la Nube (1:45 – 2:30)

> Objetivo: que distingan tipos de almacenamiento y relacionen uso ↔ costo ↔ ciclo de vida.

### 4.1. Recordatorio rápido del contexto (2–3 min)

Texto breve:

- “Ya tenemos identidades y accesos, ya tenemos máquinas donde corre la app. Ahora necesitamos un hogar para los datos.”
- “No existe un solo tipo de almacenamiento en la nube; hay varios, cada uno pensado para un uso distinto.”

<!-- Sugerencia visual:
Diapositiva con el título "¿Dónde viven los datos?" y tres íconos:
  - Bloques
  - Archivos
  - Objetos
Sin explicaciones aún, solo mostrar que hay varias opciones.
-->

### 4.2. Tipos de almacenamiento (10–12 min)

Explica uno por uno, conectando con `almacenamiento.md` y `pdf4.md`:

1. **Almacenamiento por bloques**
   - “Piensen en un disco duro virtual. Lo conectas a una VM como si fuera un disco físico.”
   - “Ideal para bases de datos y sistemas que necesitan baja latencia y alta velocidad de lectura/escritura.”

2. **Almacenamiento de archivos**
   - “Es como un compartido de red: una carpeta a la que muchos servidores o usuarios pueden acceder.”
   - “Útil cuando varios servidores necesitan leer y escribir los mismos archivos.”

3. **Almacenamiento de objetos**
   - “Cada archivo se guarda como un objeto con un identificador único y metadatos.”
   - “Servicios típicos: S3, Blob Storage, Cloud Storage.”
   - “Ideal para contenido estático, backups, multimedia, grandes volúmenes de datos.”

Remarca:

- “No es que uno sea mejor que otro, es que cada uno es para un caso distinto.”

<!-- Sugerencia visual:
Tabla comparativa simple:
  - Columnas: Tipo | Ejemplo de uso | Ejemplos de servicios.
  - Filas:
      - Bloques | Bases de datos | EBS, Managed Disks, Persistent Disks
      - Archivos | Carpeta compartida | EFS, Azure Files, Filestore
      - Objetos | Imágenes, backups | S3, Blob, Cloud Storage
-->

### 4.3. Free tier y responsabilidad de costos (5–7 min)

Retoma ideas de `almacenamiento.md`:

- “La mayoría de nubes tienen una capa gratuita, pero no todo es gratis ni para siempre.”
- “Algunos servicios son gratis solo 12 meses, otros con límites mensuales.”
- “Por eso recomendamos usar tarjetas recargables o de bajo saldo y borrar recursos después de practicar.”

Frase clara:

- “En cloud puedes aprender mucho gratis, pero si te olvidas de borrar cosas, también puedes aprender la lección de la factura.”

<!-- Sugerencia visual:
Diapositiva con dos bloques:
  - "Free tier" con ícono de ticket gratuito.
  - "Responsabilidad" con ícono de billetera.
Una nota pequeña: "Borrar recursos después de cada práctica".
-->

### 4.4. Mini-ejercicios de tipos y costos (basados en `pdf4.md`) (10–12 min)

Escoge 3–4 ejercicios representativos:

1. **Ejercicio 1 – Almacenamiento por bloques para bases de datos**
   - Lees el caso de bases de datos transaccionales.
   - Refuerzas por qué bloques es la mejor opción.

2. **Ejercicio 2 – Descripción de almacenamiento de objetos**
   - Lees las opciones.
   - Recalcas el tema de metadatos e identificador único.

3. **Ejercicio 3 – Almacenamiento de archivos para documentos compartidos**
   - Conectas con escenarios de muchas personas accediendo a la misma carpeta.

4. **Ejercicio 5 – Cálculo de ahorro con almacenamiento frío**
   - Haces el cálculo en voz alta:
     - 500 GB × 0.10 = 50 USD.
     - 500 GB × 0.02 = 10 USD.
     - Ahorro = 40 USD/mes.
   - Explicas por qué mover datos poco usados a almacenamiento frío tiene sentido.

5. (Opcional) **Ejercicio 7 – Logs que se consultan poco**
   - Explicas la política de ciclo de vida que los mueve a almacenamiento más barato después de cierto tiempo.

<!-- Sugerencia visual:
Diapositiva "Casos rápidos de uso":
  - Viñeta 1: "DB transaccional → Bloques".
  - Viñeta 2: "Documentos compartidos → Archivos".
  - Viñeta 3: "Fotos/videos/backups → Objetos".
  - Viñeta 4: "Datos poco usados → Almacenamiento frío (ciclo de vida)".
-->

### 4.5. Políticas de ciclo de vida de datos (5–7 min)

Explica la idea:

- “No todos los datos tienen el mismo valor todo el tiempo.”
- “Al principio tal vez consultes un log todos los días, pero después de una semana casi nunca.”
- “Las políticas de ciclo de vida automatizan el movimiento de datos entre niveles de almacenamiento.”

Pasos típicos:

1. Definir cuándo un dato se considera ‘frío’ (ej. más de 30 días sin acceso).
2. Moverlo a un nivel más barato automáticamente.
3. Eventualmente, configurarlo para eliminación si ya no tiene valor.

Conecta con sostenibilidad:

- “Esto no solo ahorra dinero, también reduce el consumo de energía de la infraestructura.”

<!-- Sugerencia visual:
Diagrama de tres cajas en línea:
  - "Almacenamiento caliente" → "Almacenamiento frío" → "Archivo / Eliminación".
Flechas con texto pequeño: "Uso frecuente" → "Uso ocasional" → "Histórico".
-->

### 4.6. Laboratorio conceptual de almacenamiento (5 min)

Describe el laboratorio:

- “Con su cuenta en la nube, la idea es que:”
  1. Creen un bucket (S3 / Blob / Cloud Storage).
  2. Suban algunos archivos simples (imagen, PDF).
  3. Configuren una regla de ciclo de vida:
     - Mover a clase de almacenamiento más barata después de X días, o
     - Marcar para eliminación después de cierto tiempo (según lo que soporte el proveedor en free tier).

Conexión con IAM y VMs:

- “¿Quién puede leer y escribir en ese bucket? Lo define IAM.”
- “¿Quién escribe ahí? Puede ser una VM que genera logs o sube archivos.”

<!-- Sugerencia visual:
Checklist breve en la diapositiva:
  1. Crear bucket.
  2. Subir archivos.
  3. Configurar ciclo de vida.
Debajo, una línea: "Revisar quién tiene acceso (IAM) y desde dónde (VMs)".
-->

### 4.7. Transición al mini caso de arquitectura (2–3 min)

Frase de cierre:

- “Ya sabemos quién entra (IAM), en qué máquina corre (VMs) y dónde viven los datos (almacenamiento).”
- “Ahora vamos a juntar todo en un mini caso que se parezca más a lo que veríamos en un proyecto real.”

<!-- Sugerencia visual:
Diapositiva de integración con tres íconos conectados:
  - IAM
  - VM
  - Storage
Título: "Listos para armar la arquitectura".
-->

