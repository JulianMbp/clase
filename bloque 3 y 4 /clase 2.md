## Clase 2 (Sesión Asíncrona – 3 horas)

**Tema general:** Identidad, Acceso, Gobernanza, Máquinas Virtuales y Almacenamiento en la Nube  
**Formato:** Sesión virtual (grabada o en vivo), pensada para que funcione igual con mucha o poca participación.  
**Objetivo:** Que el estudiante entienda de forma práctica cómo se conectan IAM, cómputo (VMs) y almacenamiento en la nube, y pueda razonar decisiones de costo, seguridad y uso de recursos.

---

## 1. Apertura y encuadre (0:00 – 0:15)

- **Objetivo:** Conectar con la clase anterior y alinear expectativas.
- **Puntos clave a decir:**
  - Recordar que en la clase anterior se vio la importancia del cloud, seguridad y gobernanza.
  - Explicar que hoy se va a “juntar todo” con ejemplos: identidades, acceso, VMs y almacenamiento.
  - Aclarar que la meta no es memorizar, sino **aprender a pensar como arquitecto/ingeniero cloud**.

- **Pregunta rápida para activar al grupo (puedes leer respuestas del chat si las hay):**
  - **Pregunta 1:** “Piensa en una app que uses todos los días (banco, streaming, redes). ¿Qué crees que pasa en la nube cuando tú solo ‘abres la app’? (¿qué cosas deberían existir detrás?)”

Sugiere escuchar 2–3 respuestas (si las hay) y luego conectar con: *“detrás hay usuarios (identidades), permisos (acceso), servidores (VMs) y datos (almacenamiento)”*.

---

## 2. Bloque 1 – Identidad, Acceso y Gobernanza (0:15 – 1:00)

**Meta:** Que el estudiante entienda IAM, principio de menor privilegio y gobernanza como ideas prácticas, no solo definiciones.

### 2.1. Explicación conceptual (0:15 – 0:30)

- **Apóyate en `identida-acceso.md` e `identida-acceso2.md`:**
  - Identidad = “quién eres” (usuario, servicio, app).
  - Acceso = “a qué puedes entrar y con qué permisos”.
  - IAM = conjunto de usuarios, roles, políticas y grupos.
  - Principio de menor privilegio: solo lo necesario, nada más.
  - Gobernanza = ciclo: definir políticas → aplicar → auditar → mejorar.

- **Analogía para hacerlo más cercano:**
  - Teléfono con PIN, huella o cara: no cualquiera entra.
  - Dentro del teléfono, no cualquier app puede leer todo (ejemplo: permisos de cámara, contactos, ubicación).

- **Mini-pausa reflexiva (puedes dejarla como pregunta retórica si nadie responde):**
  - **Pregunta 2:** “Si tu banco te dejara entrar solo con el número de documento, sin clave ni nada más, ¿confiarías en ese banco?”

### 2.2. Mini actividad teórico–práctica con preguntas guiadas (0:30 – 0:45)

Usa los ejercicios de **`pdf2.md` (Módulo 2 – IAM)** como base.  
La idea es que los leas y comentes las respuestas, explicando el *por qué*.

- **Secuencia sugerida:**
  1. **Ejercicio 1:** Fundamentos de IAM (autenticación, políticas, roles).
     - Leer el enunciado.
     - Pedir que piensen la respuesta (pausa de 10–15 segundos).
     - Mostrar/explicar la respuesta correcta y el razonamiento.
  2. **Ejercicio 2:** Principio de menor privilegio.
  3. **Ejercicio 3–4:** Factores de autenticación y MFA.
  4. **Ejercicio 5 ó 8:** Gobernanza y riesgos si no se aplica bien.

- **Enfoque:** No solo leer la respuesta, sino comentar:
  - Qué pasaría si se viola el menor privilegio.
  - Por qué MFA es tan usado en bancos, correo, redes, etc.

### 2.3. Cierre del bloque IAM (0:45 – 1:00)

- **Mensaje clave de cierre:**
  - Sin IAM bien diseñado, **cualquier solución en la nube es insegura**.
  - IAM se repite en todas las nubes: usuarios, roles, políticas, MFA, logs, revisiones periódicas.

- **Pregunta de conexión al siguiente bloque:**
  - **Pregunta 3:** “Ya sabemos ‘quién entra’ y ‘a qué’… ahora, ¿a qué tipo de máquina o servidor en la nube entra esa identidad? Eso lo vemos con máquinas virtuales.”

---

## 3. Bloque 2 – Máquinas Virtuales y Cómputo en la Nube (1:00 – 1:45)

**Meta:** Que el estudiante entienda qué es una VM, cómo se dimensiona y cómo se relaciona con costo y disponibilidad.

### 3.1. Explicación conceptual con analogías (1:00 – 1:15)

Apóyate en `maquinas-virtuales.md` y `maquinas-virtuales2.md`:

- Máquinas virtuales = servidores remotos en centros de datos.
- Otros nombres: instancias, recursos de cómputo.
- Conceptos:
  - Regiones y zonas de disponibilidad.
  - Bare metal vs VMs compartidas.
  - Componentes clave: CPU, RAM, disco, sistema operativo.
- **Idea de costo:** en cloud se paga por lo que se usa → no sobredimensionar.

- **Analogía práctica:**
  - Antes: comprar un servidor físico que quedaba “sobrado”.
  - Ahora: “alquilar” potencia (CPU/RAM) por horas, minutos o segundos.

### 3.2. Ejercicio práctico guiado (sin tocar consola) – Dimensionamiento y costo (1:15 – 1:35)

Usa los ejercicios de **`pdf3.md` (Módulo 3 – VMs)**:

- **Ruta sugerida:**
  1. **Ejercicio 1:** Selección de instancias (picos de tráfico).
  2. **Ejercicio 2:** Dimensionamiento y autoescalado.
  3. **Ejercicio 3:** Costo vs rendimiento.
  4. **Ejercicio 8:** Cálculo de eficiencia (desperdicio de recursos).

- Para cada ejercicio:
  - Leer situación.
  - Dar unos segundos para pensar la respuesta.
  - Mostrar la opción correcta y explicar el razonamiento en términos de:
    - Costo.
    - Demanda variable.
    - Escalado automático.

- **Pequeña reflexión numérica (hablando en voz alta):**
  - Reforzar el concepto de “desperdicio” cuando una VM está sobredimensionada.

### 3.3. Actividad práctica sugerida (para que el estudiante haga luego con su cuenta cloud) (1:35 – 1:45)

Aquí no necesitas abrir la consola, solo **describir el laboratorio** que harán usando cualquiera de los proveedores (en especial AWS o Azure, según tu enfoque del curso).

**Laboratorio sugerido (inspirado en buenas prácticas actuales):**

- Crear una máquina virtual pequeña (free tier si es posible):
  - Elegir región cercana.
  - Elegir sistema operativo (por ejemplo, Linux).
  - Elegir tamaño mínimo de CPU y RAM.
- Configurar reglas de acceso:
  - Abrir solo el puerto necesario (ej. 22 para SSH o 3389 para RDP).
  - Comentar que no se debe abrir “todo a todos”.
- Conectar, instalar algo simple (ejemplo: un servidor web básico).
- Detenerla y/o eliminarla al final para evitar costos.

**Mensaje:** Este laboratorio refuerza:
- Cómo elegir tamaño de VM.
- Cómo limitar accesos de red.
- Cómo relacionar esto con IAM (quién puede crear, detener, borrar la VM).

---

## 4. Bloque 3 – Almacenamiento en la Nube (1:45 – 2:30)

**Meta:** Que el estudiante distinga entre tipos de almacenamiento (bloques, archivos, objetos), comprenda la relación costo/uso y entienda políticas de ciclo de vida.

### 4.1. Explicación conceptual (1:45 – 2:05)

Apóyate en `almacenamiento.md` y en la tabla de equivalencias de servicios:

- Recordar:
  - Capas gratuitas (free tier) de AWS, Azure, GCP.
  - Importancia de borrar recursos después de practicar.
  - Tarjetas recargables y manejo responsable de costos.

- **Tipos de almacenamiento (conectando con `pdf4.md`):**
  - Bloques → discos para VMs, bases de datos, bajo tiempo de respuesta.
  - Archivos → compartido entre muchos usuarios/servidores.
  - Objetos → S3, Blob Storage, Cloud Storage; ideal para backups, imágenes, videos, logs, big data.

- **Conexión con proveedores:**
  - AWS: S3, EBS, EFS.
  - Azure: Blob, Disk, Files.
  - GCP: Cloud Storage, Persistent Disks, Filestore.

- **Pregunta breve para enganchar:**
  - **Pregunta 4:** “Si tuvieras que guardar fotos y videos de un sistema de cámaras de seguridad por 1 año, ¿qué tipo de almacenamiento usarías y por qué?”

### 4.2. Ejercicios guiados de almacenamiento y costos (2:05 – 2:25)

Usa los ejercicios de **`pdf4.md` (Módulo 4 – Almacenamiento)**:

- **Ruta sugerida:**
  1. Ejercicio 1–3: Comprender bloques/archivos/objetos y usos típicos.
  2. Ejercicio 4 y 7: Políticas de ciclo de vida de datos.
  3. Ejercicio 5: Cálculo de ahorro moviendo datos a almacenamiento frío.

- Para cada uno:
  - Leer caso.
  - Dejar unos segundos para pensar.
  - Explicar la respuesta correcta y el razonamiento:
    - Tipo de almacenamiento según necesidad.
    - Cómo reducir costos con ciclo de vida.
    - Por qué no todo debe estar en almacenamiento “caro”.

### 4.3. Actividad práctica sugerida (para la cuenta del estudiante) (2:25 – 2:30)

**Laboratorio conceptual:**

- Crear un bucket (S3 / Blob / Cloud Storage) en la capa gratuita.
- Subir uno o dos archivos (ej. imagen o documento).
- Activar una política de ciclo de vida simple (cuando el proveedor lo permita en free tier), por ejemplo:
  - Mover a “almacenamiento frío” después de X días.
  - O marcar para eliminación después de cierto tiempo (si aplica).

**Conexión con otros bloques:**
- IAM define quién puede leer/escribir en ese bucket.
- La VM puede consumir o guardar datos en ese almacenamiento.

---

## 5. Integración de todo: mini caso de arquitectura (2:30 – 2:50)

**Meta:** Que el estudiante vea cómo IAM, VMs y almacenamiento se conectan en un caso sencillo, simulando el pensamiento de un arquitecto cloud.

### 5.1. Presentar un caso sencillo (2:30 – 2:35)

Caso:  
“Una pequeña tienda online quiere montar un e-commerce en la nube.  
Necesita:
- Usuarios autenticados.
- Una aplicación web.
- Una base de datos.
- Almacenamiento para imágenes de productos.
- Mantener costos bajos y seguridad razonable.”

### 5.2. Preguntas guiadas (para que el estudiante piense, aunque no responda en vivo) (2:35 – 2:45)

- **Identidad y acceso (IAM):**
  - ¿Qué roles mínimos definirías? (ej. admin, operador, solo-lectura).
  - ¿Dónde aplicarías MFA?
  - ¿Cómo aplicarías el principio de menor privilegio?

- **Cómputo (VMs):**
  - ¿Usarías una VM general o algo más especializado?
  - ¿Qué tamaño aproximado de CPU/RAM elegirías al inicio?
  - ¿Configurarías autoescalado desde el principio o más adelante?

- **Almacenamiento:**
  - ¿Dónde guardarías:
    - la base de datos transaccional?
    - las imágenes de productos?
  - ¿Aplicarías políticas de ciclo de vida (por ejemplo, para logs)?

Comenta en voz alta un diseño sencillo (sin atarte a un proveedor), reforzando:
- IAM controla quién toca qué.
- La VM corre la app.
- El almacenamiento se elige según tipo de dato y costo.

### 5.3. Conexión con el mundo real (2:45 – 2:50)

- Menciona que este tipo de razonamiento es el que hace:
  - Un arquitecto cloud.
  - Un ingeniero de infraestructura.
  - Un especialista en seguridad.
- Refuerza la importancia de formar criterio y no solo “seguir recetas”.

---

## 6. Cierre y tareas recomendadas (2:50 – 3:00)

### 6.1. Resumen verbal

Reforzar en 3–5 puntos:
- IAM y gobernanza → quién entra, con qué permisos y bajo qué reglas.
- Máquinas virtuales → cómputo flexible, pero sensible a costo y dimensionamiento.
- Almacenamiento → distintos tipos (bloques, archivos, objetos) según uso.
- Todo se conecta: una mala decisión en cualquiera de los tres impacta seguridad, costo o rendimiento.

### 6.2. Tareas/prácticas para después de la clase

Proponer como **tareas asíncronas**:

- **Tarea 1 (IAM):**
  - Resolver todos los ejercicios de `pdf2.md` de forma individual (si en clase solo se vieron algunos).
  - Escribir en pocas líneas un ejemplo propio donde apliquen:
    - Principio de menor privilegio.
    - MFA.

- **Tarea 2 (VMs):**
  - Revisar de nuevo `pdf3.md` y hacer los ejercicios que falten.
  - Investigar en la documentación de un proveedor (AWS, Azure o GCP) un tipo de instancia y explicar:
    - Para qué tipo de carga sirve.
    - Qué recursos (CPU/RAM) ofrece.

- **Tarea 3 (Almacenamiento):**
  - Completar los ejercicios de `pdf4.md`.
  - Investigar al menos **dos tipos de almacenamiento** (uno de alto rendimiento y uno frío) en un proveedor y comparar sus precios y casos de uso.

### 6.3. Pregunta final de reflexión

Dejar una pregunta abierta para que piensen después:

- **Pregunta 5:** “Si mañana tuvieras que diseñar la infraestructura cloud básica de una startup, ¿qué es lo primero que revisarías: IAM, cómputo o almacenamiento? ¿Por qué?”

Esta pregunta ayuda a consolidar el criterio técnico que quieres que desarrollen a lo largo del curso.

