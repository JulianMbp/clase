## Bloque 5 – Casos de uso, repaso y cierre (2:35 – 3:00)

> **Idea general:** consolidar todo con historias cortas, un mapa mental final y una pequeña “tarea” para que sigan practicando fuera de la sesión.

---

### 1. Casos de uso comentados (10–12 min)

#### 1.1. Startup de delivery

Guion:

- “Primer caso: una **startup de delivery**.  
  Tiene picos de tráfico muy fuertes los fines de semana y en horas de almuerzo/cena.”
- “Necesidades:
  - Guardar usuarios, restaurantes, pedidos, calificaciones → datos relacionales, transaccionales.  
  - Manejar sesiones de usuarios y carritos de compra con muchos accesos concurrentes.  
  - Costos controlados cuando hay poco tráfico.”
- “Diseño:
  - **Aurora Serverless v2** para la parte relacional (usuarios, pedidos, restaurantes).  
  - **DynamoDB** para sesiones y carritos.  
  - Red: VPC con subredes públicas y privadas, Multi‑AZ, BD en subred privada, web en pública.”

Pregunta:

- “¿Por qué aquí preferimos Aurora Serverless y no un RDS fijo?”  
  → Porque el tráfico es muy variable y no queremos pagar por un servidor grande siempre encendido.

> [Visual sugerido: Tarjeta con el título `Startup Delivery` y bajo ella una mini arquitectura resumida (iconos de Aurora Serverless, DynamoDB, VPC con 2 AZ).]

#### 1.2. Plataforma de videojuegos

Guion:

- “Segundo caso: una **plataforma de videojuegos online** con millones de jugadores conectados al mismo tiempo.”
- “Necesidades:
  - Guardar estado de partida y progreso con respuestas en milisegundos.  
  - Escalar de forma brutal en horarios pico.”
- “Diseño:
  - **DynamoDB** en modo On‑Demand para escalar automáticamente lecturas y escrituras.  
  - Posible uso de **DAX** para reducir aún más la latencia en tablas de líderes.  
  - Resto de la arquitectura de red muy similar: VPC, subredes, alta disponibilidad.”

Pregunta:

- “¿Qué pasaría si intentáramos resolver todo con una sola base de datos relacional en una instancia fija?”  
  → Se saturaría, tendríamos problemas de escalado vertical y latencias altas.

> [Visual sugerido: Tarjeta `Gaming` con iconos de DynamoDB y DAX, y un texto tipo “10M jugadores, ms de latencia”.]

#### 1.3. Banco que migra a AWS

Guion:

- “Tercer caso: un **banco** que ya usa Oracle on‑premise y quiere migrar a AWS:
  - No puede permitirse más de ~60 segundos de caída.  
  - Tiene requisitos fuertes de cifrado y cumplimiento normativo.”
- “Diseño:
  - **Amazon RDS para Oracle** con configuración **Multi‑AZ**.  
  - Cifrado con **KMS**.  
  - Instancias en **subred privada** dentro de la VPC.  
  - Conectividad con el data center on‑premise a través de **VPN o Direct Connect**.  
  - Backups automáticos y snapshots manuales antes de cambios críticos.”

Pregunta:

- “¿Qué elemento de red ayuda a conectar de forma privada el datacenter del banco con AWS: un DNS público o una VPN/Direct Connect?”  
  → VPN o Direct Connect.

> [Visual sugerido: Tarjeta `Banco` con iconos de RDS (Oracle), KMS, VPC privada y un enlace de VPN/Direct Connect hacia un datacenter local.]

---

### 2. Resumen tipo mapa mental (5–8 min)

Guion:

- “Para cerrar, volvamos al mapa general:
  - **Redes**:
    - VPC → subredes públicas y privadas → Security Groups y NACL → NAT/IGW → VPN/Direct Connect → Load Balancer → AZs para alta disponibilidad.  
  - **Datos**:
    - RDS / Aurora para datos relacionales con SQL.  
    - Aurora Serverless para cuando el tráfico es impredecible.  
    - DynamoDB para NoSQL serverless con mucha escala y baja latencia.  
    - Otros servicios especializados: Redshift, Neptune, Timestream, DocumentDB…”
- “Siempre que te enfrentes a un nuevo problema, pregúntate:
  1. ¿Qué tipo de datos tengo?  
  2. ¿Cómo es mi patrón de tráfico?  
  3. ¿Qué nivel de disponibilidad y latencia necesito?  
  y a partir de ahí eliges la combinación de red + base de datos adecuada.”

> [Visual sugerido: Mapa mental con dos ramas principales `Redes` y `Datos`, y debajo las palabras clave. Procura que se vea simple y legible, no demasiado texto.]

---

### 3. Cierre y tarea sugerida (3–5 min)

Guion:

- “Hoy vimos:
  - Cómo se diseña una red virtual en AWS con VPC, subredes, seguridad y alta disponibilidad.  
  - Cómo funcionan las bases de datos gestionadas y serverless, y en qué casos usar RDS, Aurora, Aurora Serverless y DynamoDB.  
  - Y cómo juntar todo en una mini arquitectura de e‑commerce.”
- “La invitación es que no se queden en la teoría. El cloud se aprende **haciendo**:
  - Dibujen su propia arquitectura de 3 capas (web, backend, BD) usando VPC + subredes + RDS/Aurora + DynamoDB.  
  - Escríbanse en 3–5 líneas por qué eligieron esa BD y cómo la protegerían.”
- “Recuerden: en tecnología, el límite casi siempre es lo que tú te imaginas.  
  Con estas piezas ya puedes empezar a diseñar arquitecturas serias en la nube.”

> [Visual sugerido: Slide final con un diagrama muy simple (VPC + web + BD) y una frase motivacional grande al centro. Deja este slide mientras respondes preguntas o despides la sesión.] 

