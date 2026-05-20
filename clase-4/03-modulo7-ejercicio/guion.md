## Bloque 3 · Módulo 7 · Ejercicio práctico integrador (20 min)

### 3.1. Presentación del ejercicio

#### Guion hablado
- “Vamos a aterrizar todo lo que vimos de Docker en un ejercicio muy concreto.”
- “La idea es que tomen una app sencilla (idealmente la que les damos en el curso: una API o app web pequeña) y la pongan dentro de un contenedor.”
- “No necesitamos que todos lo hagan en vivo, pero quiero que al menos se vayan con el paso a paso claro para que puedan repetirlo cuando tengan tiempo.”

<!-- VISUAL:
  - Diapositiva con el título “Ejercicio: dockerizar una app sencilla”.
  - Lista resumida de pasos: Dockerfile → build → run → probar. -->

---

### 3.2. Pasos del ejercicio

#### Paso 1: elegir la app base
- “Primero, elegimos una app sencilla. Puede ser una API Node, una app en Python Flask, o lo que ya esté preparado en el repositorio del curso.”
- “Lo importante es que la app ya corra en local sin contenedor antes de meterla en Docker.”

#### Paso 2: escribir o revisar el Dockerfile
- “Tomamos un `Dockerfile` similar al que vimos antes.”
- “Elementos que no pueden faltar:”
  - “`FROM`: la imagen base (por ejemplo, `node:18` o `python:3.11`).”
  - “`WORKDIR`: carpeta de trabajo dentro del contenedor (ej. `/app`).”
  - “`COPY`: copiar el código dentro del contenedor.”
  - “`RUN`: instalar dependencias (`npm install`, `pip install -r requirements.txt`, etc.).”
  - “`CMD`: comando que arranca la app (`npm start`, `python app.py`, etc.).”
- “Mientras vas leyendo tu propio `Dockerfile`, piensa en cada línea como un paso de una receta de cocina.”

<!-- VISUAL:
  - Mostrar un `Dockerfile` de ejemplo anotado con comentarios cortos al lado de cada instrucción.
  - Resaltar con color FROM / COPY / RUN / CMD. -->

#### Paso 3: construir la imagen
- “Desde la carpeta del proyecto, ejecutar algo como:
  - `docker build -t mi-api .`”
- “`-t mi-api` pone nombre a la imagen, y el `.` indica que el contexto de construcción es la carpeta actual.”
- “Si hay errores, casi siempre es porque falta algún archivo en el contexto (`COPY` de algo que no existe) o porque hay un problema en la instalación de dependencias.”

<!-- VISUAL:
  - Captura o mock de una terminal con:
    - `docker build -t mi-api .`
    - Barra de progreso de las capas. -->

#### Paso 4: ejecutar el contenedor
- “Una vez construida la imagen, la corremos con:
  - `docker run -p 8080:8080 mi-api`”
- “Aquí adaptas el puerto a lo que use tu app. Lo importante es que el puerto interno del contenedor y el externo del host estén claros.”
- “Después puedes probar desde el navegador (`http://localhost:8080`) o con `curl` para asegurarte de que responde.”

<!-- VISUAL:
  - Diagrama donde se vea:
    - Contenedor escuchando en puerto 8080 interno.
    - Flecha a laptop/host con `localhost:8080`.
  - Texto corto: “Mapa de puertos: host 8080 → contenedor 8080”. -->

---

### 3.3. Indicaciones para la sesión en vivo

#### Guion hablado
- “Ahora voy a recorrer estos pasos en pantalla, como si estuviera haciéndolo en mi máquina.”
- “Si alguien está siguiendo en paralelo y le funciona, puede escribir en el chat ‘me funcionó’ o compartir qué puerto usó.”
- “Si no les funciona en este momento, no pasa nada; lo importante es que entiendan el flujo y luego puedan repetirlo.”

#### Puntos a enfatizar mientras lo muestras
- “Recalcar que el `Dockerfile` es reutilizable: una vez lo tienen, pueden reconstruir y redeplegar muchas veces.”
- “Insistir en el flujo mental: ‘código que ya funciona → Dockerfile → imagen → contenedor → prueba’.”
- “Mencionar que, en ambientes reales, este build suele ocurrir dentro de un pipeline de CI/CD.”

<!-- VISUAL:
  - Vista dividida:
    - A la izquierda, editor con el Dockerfile.
    - A la derecha, terminal con los comandos `docker build` y `docker run`.
  - Ir alternando zoom: primero leer Dockerfile, luego mostrar el build, luego la prueba en navegador o Postman. -->

