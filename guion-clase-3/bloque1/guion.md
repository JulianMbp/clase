## Bloque 0 – Recordatorio Clase 2 y puente hacia redes + BD (0:00 – 0:10)

### 0.1. Conectar con lo visto en la Clase 2 (5 min)

Texto sugerido:

- “Antes de meternos de lleno en redes y bases de datos, hagamos un **recordatorio rápido** de lo que vimos en la clase anterior.”
- “En la **Clase 2** estuvimos trabajando tres piezas:
  1. **Identidad y acceso (IAM y gobernanza):** quién entra a la nube, con qué permisos y bajo qué reglas.  
  2. **Máquinas virtuales y cómputo:** en qué ‘máquina’ corre realmente nuestra aplicación, cómo se dimensiona y cuánto cuesta.  
  3. **Almacenamiento:** dónde viven los datos (bloques, archivos, objetos) y cómo gestionamos costos y ciclo de vida.”
- “Vimos que:
  - Sin IAM bien diseñado, cualquier solución en la nube es insegura.  
  - Una VM mal dimensionada se traduce en **dinero perdido** o en una app que se cae.  
  - No todo debe ir al almacenamiento más caro: hay estrategias como el **ciclo de vida** para mover datos a capas más baratas.”

Pregunta activadora:

- “Si piensas en una app que usas todos los días (banco, streaming, redes sociales), ¿qué crees que ya tenemos cubierto con la Clase 2?  
  → Identidades, permisos, servidores donde corre el código y dónde se guardan los datos.”

> [Visual sugerido: Slide con cuatro íconos alineados: `IAM`, `VMs`, `Almacenamiento`, y al centro el título “Clase 2 – Quién entra, dónde corre y dónde se guarda”.]

### 0.2. Puente hacia la Clase 3 (5 min)

Guion:

- “Hoy vamos a **sumar dos capas más** encima de lo que ya sabemos:
  - La capa de **red**: cómo se **conectan** todas esas piezas dentro de una VPC, qué es público, qué es privado, cómo protegemos el tráfico.  
  - La capa de **bases de datos gestionadas y serverless**: cómo dejamos en manos de AWS la operación pesada de la base de datos (parches, backups, alta disponibilidad) y nos enfocamos en el modelo de datos.”
- “Si la Clase 2 respondía a:
  - ‘¿Quién eres para la nube?’,  
  - ‘¿En qué máquina corre tu app?’ y  
  - ‘¿En qué tipo de almacenamiento se guardan tus cosas?’…
  Hoy vamos a responder:
  - ‘¿En qué **red** vive todo esto y cómo viaja la información?’  
  - ‘¿Qué **tipo de base de datos** conviene usar para cada caso y cómo la hacemos escalar y ser resiliente?’”

Frase de transición hacia el Bloque 1:

- “Con ese mapa en mente, arrancamos con el **Bloque 1** de hoy: una apertura rápida para entender por qué redes y bases de datos son la base de cualquier solución en la nube.”

> [Visual sugerido: Slide tipo “mapa del curso” con dos columnas:  
> - Columna izquierda: `Clase 2` con bullets `IAM`, `VMs`, `Almacenamiento`.  
> - Columna derecha: `Clase 3` con bullets `Redes (VPC, subredes, seguridad)` y `Bases de datos (RDS, Aurora, DynamoDB)`.  
> Una flecha que vaya de izquierda a derecha con el texto “de quién entra y dónde corre → a cómo se conecta y dónde viven los datos en producción”.]

---

## Bloque 1 – Apertura y contexto (0:10 – 0:30)

### 1. Bienvenida y encuadre (2–3 min)

Texto sugerido (puedes leerlo casi literal, adaptando a tu estilo):

- “Bienvenidos y bienvenidas. En esta sesión vamos a conectar dos piezas claves del cloud: **las redes virtuales** y las **bases de datos gestionadas y serverless en AWS**.  
  La idea es que al final de la clase sepas leer un diagrama de arquitectura sencillo y entender por qué casi todo lo que usamos en internet descansa sobre estas dos capas.”

> [Visual sugerido: Slide muy simple con el título de la clase y dos bloques: `Redes (VPC, subredes, seguridad)` y `Datos (RDS, Aurora, DynamoDB)`. Debajo, una frase tipo: “Objetivo: entender cómo se conectan”.]

### 2. Rompehielos “¿qué tan nube es tu día?” (5 min)

Texto guía:

- “Vamos a empezar con algo sencillo.  
  Escriban en el chat: **¿qué es lo más ‘nube’ que usaron hoy sin darse cuenta?** Puede ser Netflix, Spotify, un banco, Google Drive, correo, lo que sea.”
- (Pausa 10–15 segundos para que escriban. Si nadie responde, sigues:)  
  “Aunque no lo pensemos, casi todo lo que usamos: series, música, bancos, correo… vive en algún **cloud**.”
- “Y todas esas aplicaciones tienen en común dos cosas:  
  1) una **red** que conecta todo, y  
  2) una **base de datos** que guarda la información.”

> [Visual sugerido: Slide con logos de apps conocidas (Netflix, Spotify, bancos, Google Drive, etc.) y dos flechas grandes abajo: una que diga `Redes` y otra `Bases de datos`.]

### 3. Micro historia: de on‑premise a la nube (5–7 min)

Relato base:

- “Imagina una empresa pequeña hace unos años:  
  - Tenía un cuarto con servidores, cables, switches.  
  - Una sola base de datos en un servidor físico.  
  - Si se dañaba el servidor un viernes a las 8 pm… alguien se quedaba toda la noche ahí.”
- “La empresa crece, necesita que su app funcione **24/7**, que haya usuarios desde otros países, y que el equipo no viva apagando incendios.”
- “Deciden migrar a la nube:  
  - Primero crean su **VPC**, su red privada virtual en AWS.  
  - Luego crean una **base de datos gestionada en Amazon RDS o Aurora**, donde AWS se encarga de parches y backups.  
  - Para las partes de altísima concurrencia (por ejemplo, sesiones de usuarios) usan **DynamoDB**, una base de datos NoSQL serverless.”
- “La gran pregunta es:  
  **Si se cae la base de datos principal un viernes a las 8 pm, ¿quién se queda hasta la madrugada arreglando, tú o AWS?**  
  La respuesta ideal es: **AWS**, gracias a cosas como **Multi-AZ**, backups automáticos y servicios gestionados.”

> [Visual sugerido: Slide en dos columnas. Izquierda: dibujo de un rack on‑premise, con texto “Servidor físico, todo a mano”. Derecha: iconos de VPC + RDS/Aurora + DynamoDB, con texto “Red virtual + BD gestionada + BD serverless”. Abajo, una frase tipo: “Menos apagar incendios, más construir producto”.]

### 4. Presentar el mapa de la clase (5 min)

Guion:

- “Para que se ubiquen, hoy vamos a seguir este mapa:
  1. **Bloque 1** – Contexto: por qué redes y bases de datos son la base de todo en cloud.  
  2. **Bloque 2** – Redes virtuales en AWS: VPC, subredes, seguridad, alta disponibilidad.  
  3. **Bloque 3** – Bases de datos gestionadas y serverless: RDS, Aurora, Aurora Serverless, DynamoDB.  
  4. **Bloque 4** – Vamos a diseñar juntos una **mini arquitectura** de e‑commerce.  
  5. **Bloque 5** – Casos de uso reales, repaso rápido tipo quiz y cierre.”
- “La idea no es memorizar todo, sino quedarte con el **mapa mental**: red → capas de seguridad → dónde vive tu aplicación → dónde vive tu base de datos → cómo se escala y se protege.”

> [Visual sugerido: Slide con una línea de tiempo horizontal con 5 bloques etiquetados `Bloque 1, Bloque 2, ... Bloque 5`, cada uno con un icono (bombillo, nube con red, cilindro de BD, diagrama de arquitectura, check de repaso).]

