## Bloque 3 – Bases de datos gestionadas y serverless (1:05 – 1:50)

> **Idea general:** mostrar la evolución on‑premise → BD gestionada → BD serverless y dar criterios claros para elegir entre RDS, Aurora, Aurora Serverless y DynamoDB.

---

### 1. De on‑premise a base de datos gestionada (10–12 min)

Guion:

- “Antes de la nube, si querías una base de datos tenías que:
  - Comprar servidores físicos.  
  - Instalar el motor (MySQL, PostgreSQL, Oracle…).  
  - Configurar backups manualmente.  
  - Diseñar tú mismo la alta disponibilidad.  
  - Monitorear rendimiento, aplicar parches de seguridad, etc.”
- “Con una **base de datos gestionada** en AWS (RDS, Aurora):
  - AWS se encarga del **hardware, los parches, los backups, la alta disponibilidad básica y el monitoreo**.  
  - Tú te enfocas en el **esquema de datos y las consultas**.”
- Metáfora:
  - “On‑premise es como tener tu propio carro: tú haces el mantenimiento, cambias aceite, pagas seguro, parquímetro, todo.  
    Una BD gestionada es como usar un Uber: tú dices a dónde vas, y el proveedor se encarga del carro.”

Pregunta al grupo:

- “¿Quién preferiría no estar pendiente de parches de seguridad y backups a las 3 de la mañana?”

> [Visual sugerido: Tabla comparando dos columnas: `On‑Premise` vs `BD gestionada (RDS/Aurora)` con filas: hardware, parches, backups, HA, monitoreo. Marca con ❌ en on‑premise (tú) y ✅ en la columna de AWS.]

---

### 2. Amazon RDS: lo estándar pero gestionado (8–10 min)

Puntos clave:

- “**Amazon RDS** es el servicio de bases de datos relacionales gestionadas:
  - Soporta motores conocidos: MySQL, PostgreSQL, MariaDB, SQL Server, Oracle, Db2.  
  - Automatiza:
    - Backups automáticos y **Point‑in‑Time Recovery**.  
    - Parches del motor de BD.  
    - Multi‑AZ para alta disponibilidad.  
    - Réplicas de lectura para escalar lecturas.  
    - Monitoreo con CloudWatch.”
- “Con RDS te concentras en:
  - Diseñar tus tablas y relaciones.  
  - Escribir consultas SQL.  
  - Optimizar la lógica de tu aplicación.”

Frase de anclaje:

- “RDS es: **‘mi BD SQL de siempre, pero sin tener que administrar el servidor’**.”

> [Visual sugerido: Diagrama tipo “tú vs AWS”:  
> Columna izquierda: `Tú` con bullets “esquema, consultas, lógica de negocio”.  
> Columna derecha: `AWS (RDS)` con bullets “hardware, parches, backups, Multi‑AZ, monitoreo”.]

---

### 3. Aurora: cuando necesitas más rendimiento (8–10 min)

Guion:

- “**Amazon Aurora** es un motor relacional diseñado por AWS, compatible con MySQL y PostgreSQL, pero con una arquitectura pensada para la nube.”
- “Ventajas:
  - Hasta **5x más rápido que MySQL estándar** y **3x más rápido que PostgreSQL estándar**.  
  - Almacenamiento distribuido con **6 copias en 3 Zonas de Disponibilidad**.  
  - Hasta **15 réplicas de lectura** con muy baja latencia.”
- “Casos donde tiene sentido:
  - Aplicaciones de misión crítica, donde el rendimiento importa mucho.  
  - Sistemas con altísima concurrencia de lectura.  
  - Necesidad de replicación multi‑región con **Aurora Global Database**.”

Pregunta tipo quiz:

- “Si tengo una app crítica, con muchas transacciones y necesito máximo rendimiento y alta disponibilidad, ¿qué elegiría antes: RDS estándar o Aurora?”  
  (Respuesta esperada: Aurora.)

> [Visual sugerido: Diagrama del clúster de Aurora: un cuadrado “Aurora Cluster” con una instancia Writer y varias Reader, abajo 6 bloques pequeños distribuidos en 3 AZ. Añade un label: “6 copias de datos en 3 AZ”.]

---

### 4. Modelo serverless en bases de datos (Aurora Serverless + DynamoDB) (15–18 min)

#### 4.1. Qué significa “serverless” en BD

Texto clave:

- “Serverless significa:
  - No hay servidores que tú tengas que crear, apagar o redimensionar.  
  - La capacidad escala automáticamente según la demanda.  
  - Pagas solo por el uso real, no por una instancia encendida todo el mes.”
- “En el contexto de bases de datos:
  - **Aurora Serverless v2** → base de datos relacional serverless.  
  - **DynamoDB** → base de datos NoSQL completamente serverless.”

> [Visual sugerido: Tres bloques horizontales:  
> `On‑Premise` → `BD gestionada (RDS/Aurora)` → `BD serverless (Aurora Serverless / DynamoDB)` con flecha de “más automatización / menos gestión”.]

#### 4.2. Aurora Serverless v2

Guion:

- “Aurora Serverless v2 es Aurora pero con autoescalado de cómputo:
  - Escala en **incrementos de 0.5 ACU**.  
  - Pasa, por ejemplo, de 2 ACU en la noche a 64 ACU en un pico de tráfico y vuelve a bajar sin que tú hagas nada.”
- “Casos ideales:
  - Tráfico muy variable: e‑commerce con picos en campañas.  
  - Aplicaciones nuevas donde no sabes el volumen todavía.  
  - Ambientes de desarrollo y pruebas que no se usan todo el día.”

Frase:

- “Con Aurora Serverless, en lugar de preguntarte ‘¿quién dimensiona el servidor?’, te preguntas solo ‘¿qué datos necesito y qué consultas hago?’.”

> [Visual sugerido: Gráfico de línea de tiempo donde la línea de “ACU” sube de 2 → 64 → 2 a lo largo del día, con anotaciones `pico de tráfico` y `horas valle`.]

#### 4.3. DynamoDB

Guion:

- “**DynamoDB** es una base de datos NoSQL, serverless, diseñada para:
  - Latencia de milisegundos de un solo dígito.  
  - Manejar millones de solicitudes por segundo.  
  - Escalar prácticamente sin límite.”
- “Modelo de datos:
  - Tablas con **ítems** que tienen una **clave primaria** y atributos flexibles.  
  - No hay esquema rígido como en SQL: cada ítem puede tener atributos distintos.”
- “Modos de capacidad:
  - **On‑Demand:** pagas por cada lectura/escritura, ideal cuando el tráfico es impredecible.  
  - **Capacidad aprovisionada:** defines RCU/WCU, útil cuando ya conoces el patrón de tráfico.”
- “Características importantes:
  - **DAX:** caché en memoria para reducir la latencia a microsegundos.  
  - **Streams:** capturan cambios en la tabla para disparar Lambdas.  
  - **Global Tables:** replicación multi‑región multi‑activa.”

Ejemplo de ejercicio (adaptado):

- “Una plataforma de videojuegos necesita guardar el estado de partida de 50 millones de jugadores simultáneos, con respuestas en menos de 5 ms.  
  ¿Qué servicio es el adecuado?”  
  → DynamoDB + (opcionalmente DAX).

> [Visual sugerido: Tabla conceptual de DynamoDB con filas `user#001`, `user#002` y columnas de atributos distintos; al lado, un globo de texto “esquema flexible, escala masiva, baja latencia”.]

---

### 5. Tabla de decisión rápida (5–7 min)

Guion:

- “Para no perdernos entre tantos nombres, piensa en estas preguntas:
  1. **¿Mis datos son relacionales y necesito SQL?**  
     - Sí → RDS o Aurora / Aurora Serverless.  
  2. **¿Mi tráfico es predecible o muy variable?**  
     - Predecible → RDS/Aurora aprovisionados.  
     - Muy variable → Aurora Serverless o DynamoDB On‑Demand.  
  3. **¿Necesito latencias muy bajas con escala masiva?**  
     - Sí → DynamoDB (y quizá DAX).”
- “Si además hablamos de analytics pesado sobre años de datos, pensamos en **Redshift**; si son grafos, en **Neptune**; si son series temporales, en **Timestream**.”

> [Visual sugerido: Pequeño árbol de decisión:  
> `¿SQL?` → `Sí` → `¿tráfico predecible?` → `Sí: RDS/Aurora`, `No: Aurora Serverless`  
> `¿SQL?` → `No` → `¿alta escala / baja latencia?` → `Sí: DynamoDB`.]

---

### 6. Mini‑quiz con escenarios (5–8 min)

Puedes tomar 2–3 escenarios de los ejercicios de `servicios aws bd.md` y `gestion.md`:

Ejemplos:

1. “Startup de delivery con tráfico impredecible entre semana y picos fuertes los fines de semana.  
   - Para los datos relacionales (usuarios, pedidos), ¿qué usarías?  
   - Para sesiones de usuarios con mucha concurrencia, ¿qué usarías?”  
   → Aurora Serverless v2 + DynamoDB.

2. “Banco que migra una base de datos Oracle crítica a AWS, no puede tolerar más de 60 segundos de caída y requiere cifrado:
   - ¿Qué configuración usarías?”  
   → RDS para Oracle + Multi‑AZ + cifrado KMS + subred privada + backups automáticos.

3. “Métricas de sensores IoT que se guardan cada segundo durante años:  
   - ¿Más lógico guardarlas en RDS o en Timestream?”  
   → Timestream.

> [Visual sugerido: Slide con 3 tarjetas, cada una con un título (`Delivery`, `Banco`, `IoT`) y espacio para escribir en vivo la respuesta de qué servicio usarías; puedes rellenarlo tú si no hay participación.] 

