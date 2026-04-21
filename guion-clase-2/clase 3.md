## Clase 3 – Redes Virtuales (Módulo 5) + Bases de Datos Gestionadas y Serverless en AWS (Módulo 6)

**Duración total estimada:** 3 horas  
**Modalidad:** Virtual, sesión sincrónica (pero diseñada para funcionar bien aunque haya poca participación)  
**Enfoque:** 1/3 contexto e historias, 1/3 visual y demo en consola, 1/3 ejercicios prácticos y casos

---

## 1. Objetivos de la clase

- **Comprender** por qué las redes virtuales y las bases de datos gestionadas/serverless son la base de una arquitectura cloud moderna.
- **Relacionar** conceptos de redes (VPC, subredes, Security Groups, NACL, NAT, VPN, Direct Connect, Load Balancer, Alta Disponibilidad) con conceptos de datos (RDS, Aurora, Aurora Serverless, DynamoDB, ElastiCache, Redshift, etc.).
- **Aplicar** estos conceptos en un **mini diseño de arquitectura** y en **ejercicios de escenarios reales** (tomados y adaptados de los ejercicios de los módulos 5 y 6).
- **Preparar** al estudiante para entender diagramas de arquitectura y tomar decisiones básicas de diseño (qué servicio usar y cómo conectarlo).

---

## 2. Estructura general de la sesión (3 horas)

- **Bloque 1 (0:00 – 0:20)** – Calentamiento, contexto y mapa de la clase.
- **Bloque 2 (0:20 – 1:05)** – Redes virtuales en AWS (VPC, subredes, seguridad, conectividad, HA).
- **Bloque 3 (1:05 – 1:50)** – Bases de datos gestionadas y serverless en AWS.
- **Bloque 4 (1:50 – 2:35)** – Ejercicio práctico guiado: mini arquitectura “app web + BD” (networking + datos).
- **Bloque 5 (2:35 – 3:00)** – Casos de uso, repaso tipo quiz y cierre.

> **Nota para ti (instructor):** La clase se imparte igual haya o no participación. En cada bloque hay **preguntas y microactividades** que puedes lanzar al chat, pizarra o encuesta rápida. Si nadie responde, las respondes tú mismo en voz alta como parte del relato.

---

## 3. Bloque 1 (0:00 – 0:20) – Apertura y contexto

### 3.1. Rompehielos rápido (5 min)

- **Dinámica:** Pregunta abierta para el chat:
  - **Pregunta:** “¿Qué es lo más ‘nube’ que usaste hoy sin darte cuenta? (ej: Netflix, Spotify, un banco, Google Drive…)”
  - Comenta 2–3 respuestas y llévalas a “todo esto vive sobre redes y bases de datos en algún cloud”.

### 3.2. Enganchar redes + bases de datos con una historia (5–7 min)

- Cuenta una **historia corta** de una empresa que:
  - Tenía todo **on-premise** (servidores, switches, una sola BD en un cuarto de servidores).
  - Luego crece, necesita **alta disponibilidad**, acceso global y menos carga operativa.
  - Migra a la nube:
    - Monta su **red virtual (VPC)**.
    - Crea una **BD gestionada en RDS/Aurora**.
    - Para escalar, se apoya en **DynamoDB** para partes de alta concurrencia.

- **Pregunta al grupo (retórica o para el chat):**
  - “Si se cae la base de datos principal de esta empresa un viernes a las 8 pm, ¿quién se queda hasta la madrugada arreglando, tú o AWS?”
  - Conecta con la idea de **managed database** y **Multi-AZ**.

### 3.3. Presentar el mapa de la clase (5–8 min)

- Muestra un slide o pizarra con 3 círculos:
  - **Redes virtuales (Módulo 5)**: VPC, subredes, SG, NACL, NAT, VPN/Direct Connect, Load Balancer, Alta disponibilidad.
  - **Datos (Módulo 6)**: RDS, Aurora, Aurora Serverless, DynamoDB, ElastiCache, Redshift, otros.
  - **Arquitectura**: cómo combinar ambos para una app web real.

- Explica brevemente el **flujo de la sesión** según la estructura del punto 2.

---

## 4. Bloque 2 (0:20 – 1:05) – Redes virtuales en AWS (Módulo 5)

Objetivo: pasar de “redes abstractas” a un **dibujo concreto** de una VPC con subredes públicas y privadas, seguridad y conectividad híbrida.

### 4.1. Conceptos clave (10–15 min)

Apoyarte en `resumen_redes_virtuales_cloud.md` y `redes virtuales.md`:

- **VPC**
  - Definición: red privada virtual aislada en AWS.
  - Pregunta al grupo:  
    - “Si tu aplicación maneja datos de clientes, ¿te gustaría que esté en una red pública compartida o en tu propia VPC aislada?”

- **Subredes**
  - Diferencia **pública vs privada**.
  - Dibuja (pizarra/slide) el típico esquema de 3 capas:
    - Subred pública → servidor web / Load Balancer.
    - Subred privada → backend.
    - Subred privada → base de datos (RDS).

- **Security Groups vs NACL**
  - Security Group → firewall a nivel de instancia, **stateful**.
  - NACL → firewall a nivel de subred, **stateless**.
  - Microactividad:
    - Pedir al chat: “Escriban `SG` si creen que es a nivel de instancia, `NACL` si es a nivel de subred” mientras muestras 2–3 ejemplos de reglas.

### 4.2. Tráfico a Internet y NAT (10–15 min)

Desde `redes virtuales.md`:

- Explica la diferencia:
  - **Internet Gateway (IGW)** → conexión directa de una subred pública a Internet (entrada y salida).
  - **NAT Gateway** → para que una instancia en subred privada **salga** a Internet sin ser accesible desde fuera.

- Pregunta de escenario (tipo ejercicio 8 del módulo 5):
  - “Tengo una instancia en subred privada que necesita bajar actualizaciones de sistema operativo, pero no quiero que sea accesible desde Internet. ¿Qué uso?”  
  - Comenta la respuesta: **NAT Gateway**.

### 4.3. Alta disponibilidad y AZs (10 min)

- Usa el material de `redes virtuales.md` y `resumen_consola_aws_detallado.md`:
  - Revisa el concepto de **regiones** y **Zonas de Disponibilidad (AZ)**.
  - Dibuja: dos AZs, cada una con subred pública y privada.
  - Conecta esto con:
    - **Load Balancer** recibiendo tráfico y repartiendo a instancias en varias AZ.
    - Bases de datos con réplica en otra AZ (introduces el puente hacia RDS Multi-AZ).

- Pregunta al grupo:
  - “Si tu app solo vive en una AZ y esa AZ se cae, ¿qué ve el usuario?”
  - Usa esto para justificar siempre diseñar **multi-AZ**.

### 4.4. Conectividad híbrida (5–10 min)

- Explica brevemente:
  - **VPN Site-to-Site** vs **Direct Connect**, usando los contrastes del módulo 5.
  - Menciona un ejemplo:
    - Empresa con base de datos legacy on-premise que quiere consumir servicios en AWS.

- Pregunta rápida:
  - “Si quiero un enlace físico dedicado, de baja latencia, ¿cuál usaría, VPN o Direct Connect?”

---

## 5. Bloque 3 (1:05 – 1:50) – Bases de datos gestionadas y serverless (Módulo 6)

Objetivo: entender el paso de **on-premise → BD gestionada → BD serverless**, y poder elegir entre RDS, Aurora, Aurora Serverless y DynamoDB en escenarios simples.

### 5.1. De on-premise a BD gestionada (10–15 min)

Basado en `bases de datos.md` y `servicios aws bd.md`:

- Explica el contraste (usa la tabla de on-premise vs gestionada):
  - Antes: comprar servidores, instalar motor, backups manuales, alta disponibilidad casera.
  - Ahora: AWS se encarga de parches, backups, Multi-AZ, monitoreo.

- Haz la metáfora:
  - “On-premise es como tener tu propio carro: tú haces el mantenimiento. Una BD gestionada es como usar un servicio tipo Uber: tú solo te preocupas a dónde vas.”

- Pregunta al grupo:
  - “¿Quién en el chat preferiría NO estar pendiente de parches de seguridad, backups y hardware los fines de semana?”

### 5.2. RDS y Aurora (10–15 min)

- **Amazon RDS**
  - Motores soportados: MySQL, PostgreSQL, MariaDB, SQL Server, Oracle, Db2.
  - Qué automatiza: backups, PITR, Multi-AZ, réplicas de lectura, monitoreo.
  - Destaca **Multi-AZ** con el diagrama del documento.

- **Aurora**
  - Compatible con MySQL/PostgreSQL, pero con arquitectura propia:
    - 6 copias en 3 AZs, alto rendimiento (5x/3x).
    - Hasta 15 réplicas de lectura.
  - Menciona **Aurora Global Database**: réplica en otras regiones.

- Pregunta tipo quiz (de viva voz, con respuesta inmediata tuya si nadie participa):
  - “Si tengo una app crítica que requiere transacciones SQL, alto rendimiento y alta disponibilidad, ¿qué elegiría antes: RDS estándar o Aurora?”
  - Justifica por qué Aurora para misión crítica/alto rendimiento.

### 5.3. Serverless en bases de datos: Aurora Serverless y DynamoDB (15–20 min)

- **Concepto de serverless** (apóyate en `gestion.md` y `bases de datos.md`):
  - No gestionas servidores, pagas por uso, escalado automático.

- **Aurora Serverless v2**
  - Explica el esquema de ACUs (subida de 2 a 64 ACU y vuelta).
  - Casos de uso: tráfico impredecible, e-commerce en Black Friday, dev/test.

- **DynamoDB**
  - Modelo NoSQL, clave-valor/documentos.
  - On-Demand vs Capacidad Aprovisionada.
  - Características: DAX, Streams, Global Tables, TTL.

- Usa 1–2 ejercicios de comprensión de `servicios aws bd.md`:
  - Ej. startup de delivery (Ejercicio 1) y videojuego con millones de jugadores (Ejercicio 3).
  - Narras el escenario, pausas para que piensen 10–15 segundos y luego explicas la respuesta.

### 5.4. Tabla de decisión rápida (5 min)

- Muestra/resume la tabla del capítulo “¿Cómo elegir la base de datos correcta?”:
  - Si es **relacional + SQL** → RDS / Aurora / Aurora Serverless.
  - Si es **NoSQL + alta escala** → DynamoDB.
  - Si es **analytics** → Redshift.
  - Si es **grafos / series temporales / documentos** → Neptune, Timestream, DocumentDB, etc.

- Pregunta relámpago:
  - “¿Dónde guardarías un historial de métricas de sensores IoT por años: en RDS o en Timestream?”

---

## 6. Bloque 4 (1:50 – 2:35) – Ejercicio práctico guiado: mini arquitectura “app web + BD”

Objetivo: conectar todo lo anterior en un solo dibujo + flujo de datos, usando ejercicios del módulo 5 y 6 como base.

### 6.1. Diseño de arquitectura en pizarra (15–20 min)

Actividad central (ideal con pizarra digital tipo Miro, Jamboard u otra herramienta):

1. **Plantea el escenario** (puedes reutilizar una mezcla de los ejercicios):
   - App de e-commerce sencilla:
     - Página web (frontend).
     - Backend con API.
     - Base de datos para usuarios, pedidos y productos.
     - Sesiones de usuarios con alta concurrencia.
2. **Paso 1 – Red** (Módulo 5):
   - Dibuja una **VPC** con:
     - 2 subredes públicas (en 2 AZ) para web/Load Balancer.
     - 2 subredes privadas (en 2 AZ) para backend + BD.
   - Agrega:
     - **Internet Gateway** conectado a subredes públicas.
     - **NAT Gateway** para que subredes privadas salgan a Internet.
     - **Security Groups**:
       - SG-Web: permite HTTP/HTTPS desde Internet.
       - SG-Backend: permite tráfico solo desde SG-Web.
       - SG-DB: permite tráfico solo desde SG-Backend.
3. **Paso 2 – Bases de datos** (Módulo 6):
   - Pregunta en voz alta:
     - “Para los pedidos y usuarios (datos relacionales con transacciones), ¿qué usamos?” → RDS o Aurora.
     - “Para las sesiones de usuarios de alta concurrencia y baja latencia, ¿qué usarías?” → DynamoDB.
   - En el diagrama:
     - Dibuja un **RDS/Aurora Multi-AZ** en las subredes privadas.
     - Dibuja una **tabla DynamoDB** para sesiones y carritos.
4. **Paso 3 – Alta disponibilidad**:
   - Muestra instancias web en 2 AZ detrás de un **Load Balancer**.
   - Muestra la BD con réplica en otra AZ (Multi-AZ).

> Si hay participación: puedes pedir que en el chat escriban qué falta en la arquitectura (por ejemplo: “faltan los Security Groups”, “falta el NAT”, etc.) y los vas agregando en vivo.

### 6.2. Versión “paso a paso” tipo consola (10–15 min)

Sin necesidad de que los estudiantes toquen AWS, puedes narrar o mostrar en la consola (apoyándote en `resumen_consola_aws_detallado.md`):

- Cómo crear una VPC con “VPC and more”:
  - Definir nombre, CIDR (`10.0.0.0/16`), número de AZ, subredes públicas/privadas.
  - Mostrar el diagrama que la consola genera automáticamente.
- Conceptualmente, cómo crear una base de datos RDS:
  - Elegir motor (MySQL/PostgreSQL).
  - Elegir Multi-AZ, tamaño, backups, ventana de mantenimiento.

**Idea práctica:**  
Puedes presentar esto como un “**tour guiado**” por la consola: aunque sea solo pantalla del instructor, refuerza mucho lo visto en teoría.

### 6.3. Mini-quiz integrado (5–10 min)

Lanza 3–4 preguntas rápidas (inspiradas en los ejercicios de ambos módulos). Ejemplos:

- “¿Qué componente permite que una instancia privada salga a Internet sin exponerse?” → NAT Gateway.
- “¿Qué servicio elegirías para millones de lecturas con baja latencia y modelo clave-valor?” → DynamoDB.
- “¿Qué ofrece Multi-AZ en RDS?” → Réplica síncrona en otra AZ y failover automático.
- “¿Dónde ubicarías una base de datos relacional de producción, en subred pública o privada?” → Subred privada.

Si nadie responde, responde tú, pero siempre deja unos segundos de silencio para dar espacio a que alguien escriba.

---

## 7. Bloque 5 (2:35 – 3:00) – Casos de uso, repaso y cierre

### 7.1. Casos de uso comentados (10–12 min)

Escoge 2–3 casos de `bases de datos.md` / `servicios aws bd.md` para cerrar:

- **Startup de delivery**:
  - Hablar de Aurora Serverless + DynamoDB.
  - Conecta con picos de tráfico y modelo de pago por uso.
- **Plataforma de videojuegos**:
  - DynamoDB + DAX para latencia bajísima.
- **Migración de banco con Oracle**:
  - RDS para Oracle + Multi-AZ + cifrado KMS + subred privada.

Para cada caso:

- Pregunta breve:
  - “¿Qué pasa si solo dejamos una base de datos en una AZ sin Multi-AZ?”
  - “¿Qué desventaja tendría usar solo RDS y no DynamoDB para 50 millones de jugadores?”

### 7.2. Resumen tipo “mapa mental” (5–8 min)

Vuelve al mapa conceptual del final de `gestion.md` / `bases de datos.md`:

- Redes:
  - VPC → subredes → SG/NACL → NAT/IGW → VPN/Direct Connect → Load Balancer → AZs.
- Datos:
  - RDS/Aurora (relacional), Aurora Serverless (relacional serverless), DynamoDB (NoSQL serverless), + servicios especializados.

Idea: dibujar un **árbol de decisión simple**:

- Preguntas:
  - “¿Mis datos son relacionales o no?”  
  - “¿Mi tráfico es predecible o impredecible?”  
  - “¿Necesito baja latencia global?”  

### 7.3. Cierre con reflexión y tarea sugerida (3–5 min)

- **Reflexión final** (apoyándote en las frases motivacionales de los documentos):
  - “En cloud, el límite va hasta donde tú quieras llegar. Hoy vimos que con redes virtuales bien diseñadas y bases de datos gestionadas, puedes construir arquitecturas que antes solo estaban al alcance de grandes empresas.”

- **Tarea sugerida asincrónica**:
  - Que cada estudiante:
    - Dibuje su propia mini arquitectura de:
      - 1 VPC, 2 subredes públicas, 2 privadas.
      - 1 Load Balancer, 2 instancias web.
      - 1 RDS Multi-AZ y, opcional, 1 tabla DynamoDB.
    - Escriba en 3–5 líneas:
      - Qué servicio de BD eligió y por qué.
      - Cómo protegería la base de datos (subred + Security Group).

Puedes pedir que la suban como imagen o PDF en el LMS o que simplemente la guarden como referencia personal.

---

## 8. Material de apoyo que ya tienes (para reutilizar en la clase)

- **Para explicar redes (Bloque 2 y 4):**
  - `redes virtuales.md` → definiciones de VPC, subredes, SG, NACL, NAT, LB, VPN, Direct Connect, HA.
  - `resumen_redes_virtuales_cloud.md` → resumen narrativo ideal para la introducción y el cierre de esa parte.
  - `resumen_consola_aws_detallado.md` → secuencia conceptual de uso de la consola y creación de VPC.

- **Para explicar bases de datos (Bloque 3 y 4):**
  - `bases de datos.md` → definiciones de BD gestionada vs on-premise, RDS, Aurora, Aurora Serverless, DynamoDB, glosario.
  - `servicios aws bd.md` → detalle profundo de servicios de BD, ejercicios de comprensión y glosario muy útil para ejemplos.
  - `gestion.md` → ejercicios prácticos del módulo 6 (ideal para preguntas de quiz y explicación extendida).

> Sugerencia: marca en tus documentos originales los fragmentos que quieras mostrar en pantalla (diagramas, tablas de comparación y ejercicios) para tenerlos “listos para compartir” durante la clase.

---

## 9. Checklist rápido para ti antes de la clase

- **Tener listos:**
  - 3–4 diapositivas/pizarras:
    - Mapa general de la clase.
    - Diagrama VPC + subredes + NAT + LB + RDS.
    - Árbol de decisión para elegir BD.
  - 6–8 preguntas breves (ya propuestas arriba) copiadas en un bloc de notas para pegar en el chat.
  - 1 pestaña con la **consola de AWS** abierta (opcional, si vas a hacer el tour).

- **Revisar tiempo:**
  - Si ves poca participación, puedes extender:
    - El tour por consola de VPC y RDS.
    - La explicación de los casos de uso del bloque 5.

Con esto tienes una **clase de 3 horas** completa, dinámica y con material suficiente para mantener el flujo incluso si nadie participa activamente.

