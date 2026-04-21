## Conceptos de nube para dictar en Clase 3 (AWS · Azure · GCP)

> Guion corto para leer/explicar al inicio de Bloque 2 y Bloque 3, conectando lo que haces en AWS con los nombres equivalentes en Azure y GCP.

---

### 1. Redes virtuales: idea común en las tres nubes

Texto sugerido:

- “Lo primero que vamos a ver hoy son **redes virtuales**.  
La buena noticia es que, aunque los nombres cambian, la idea base es la misma en las tres nubes grandes.”
- “En general, una red virtual sirve para:
  - Aislar tus recursos del resto de Internet y de otras cuentas.  
  - Definir rangos de IP y subredes.  
  - Controlar cómo entra y sale el tráfico, y quién puede hablar con quién.”

Correspondencias:

- **AWS** → `VPC (Virtual Private Cloud)`  
  - Es una red lógica aislada dentro de AWS.  
  - Contiene subredes regionales, tablas de rutas, gateways, grupos de seguridad, etc.[1]
- **Azure** → `Virtual Network (VNet)`  
  - Es la “pieza base” de red en Azure.  
  - Permite que máquinas virtuales y otros recursos se comuniquen entre sí, con Internet y con redes on‑premises, usando conceptos similares a los de un datacenter tradicional.[4]
- **Google Cloud** → `VPC Network`  
  - Es un recurso global que ofrece red virtual para VMs, clusters de Kubernetes y cargas serverless.  
  - Usa subredes regionales conectadas por la red global de Google y tiene firewalls y rutas distribuidas.[2][3]

Frase de anclaje:

- “En resumen:
  - En AWS hablamos de **VPC**,  
  - en Azure de **Virtual Network**,  
  - en GCP de **VPC Network**,  
  pero mentalmente es lo mismo: **tu red privada en la nube**.”

> [Visual sugerido: Slide con tres columnas: `AWS – VPC`, `Azure – Virtual Network`, `GCP – VPC Network`, y una frase arriba: “Misma idea, distinto nombre”.]

---

### 2. Subredes, zonas y gateways

Puntos a dictar:

- “Dentro de esa red virtual, en las tres nubes vamos a tener:
  - **Subredes**: divisiones lógicas para separar capas (web, backend, BD).  
  - **Zonas de disponibilidad** o zonas: para alta disponibilidad y resiliencia.  
  - **Gateways**: piezas que conectan con Internet o con redes on‑premise (VPN, enlaces dedicados).”

Correspondencias rápidas:

- **Subredes**:
  - AWS: `Subnets` dentro de una VPC, asociadas a una AZ concreta.  
  - Azure: `Subnets` dentro de una Virtual Network.  
  - GCP: subredes regionales dentro de una VPC Network (auto‑mode o custom‑mode).[2][5]
- **Zonas / AZ**:
  - AWS: `Availability Zones` dentro de una región.  
  - Azure: `Availability Zones` en algunas regiones, y `Availability Sets` para agrupar VMs.  
  - GCP: `Zones` dentro de una `Region`.
- **Internet / VPN / enlaces dedicados**:
  - AWS: `Internet Gateway`, `NAT Gateway`, `Site‑to‑Site VPN`, `AWS Direct Connect`.  
  - Azure: `Internet access` nativo, `VPN Gateway`, `ExpressRoute`.  
  - GCP: `Cloud Router`, `Cloud VPN`, `Cloud Interconnect`.

Frase:

- “Aunque cada nube tenga sus nombres, todas responden a las mismas preguntas:
  1. ¿Qué IPs uso y dónde? (subredes)
  2. ¿En qué zona o datacenter concreto vive cada cosa? (AZ/Zone)
  3. ¿Cómo me conecto a Internet y a mi red on‑premise? (gateways, VPN, enlaces dedicados).”

---

### 3. Bases de datos gestionadas (relacionales)

Texto sugerido:

- “Así como las redes virtuales tienen su equivalente en cada nube, las **bases de datos gestionadas** también:
  - La idea es la misma: el proveedor de nube se encarga de la infraestructura, parches, backups y alta disponibilidad; tú te concentras en el modelo de datos y las consultas.”

Correspondencias:

- **AWS**:
  - `Amazon RDS` → servicio gestionado para MySQL, PostgreSQL, MariaDB, SQL Server, Oracle, Db2.  
  - `Amazon Aurora` → motor relacional nativo de AWS, compatible con MySQL/PostgreSQL, con arquitectura distribuida y rendimiento superior.
- **Azure**:
  - `Azure SQL Database` → servicio gestionado basado en SQL Server.  
  - `Azure Database for PostgreSQL` / `for MySQL` → servicios gestionados para esos motores.
- **Google Cloud**:
  - `Cloud SQL` → base de datos relacional gestionada para MySQL, PostgreSQL y SQL Server.  
  - `Cloud Spanner` → base de datos relacional distribuida, horizontalmente escalable (ya es un nivel más avanzado).

Frase de contraste:

- “Si vienes de on‑premise, piensa que en lugar de instalar tú el motor en un servidor, aquí:
  - En AWS usarías RDS/Aurora,  
  - en Azure usarías Azure SQL o Azure Database for PostgreSQL/MySQL,  
  - en GCP usarías Cloud SQL.  
  El patrón es el mismo: tú ves una ‘BD relacional’ y la nube se encarga de lo feo: hardware, parches, backups, failover.”

---

### 4. Bases de datos serverless y NoSQL

Texto guía:

- “Cuando hablamos de **serverless** en bases de datos, la idea es:
  - No administras servidores ni capacidad.  
  - El servicio escala automáticamente.  
  - Pagas por uso real.”

Correspondencias (alto nivel):

- **AWS**:
  - `Aurora Serverless v2` → versión serverless de Aurora para MySQL/PostgreSQL.  
  - `DynamoDB` → NoSQL serverless de clave‑valor/documentos, con escalado automático y latencia muy baja.
- **Azure**:
  - `Cosmos DB` → base de datos multimodelo, distribuida globalmente, con opciones de pago por uso y escalado automático.
- **Google Cloud**:
  - `Cloud Firestore` / `Datastore` → bases de datos NoSQL gestionadas para documentos.  
  - `Bigtable` → NoSQL de alto rendimiento para grandes volúmenes de datos.

Frase:

- “Aquí la equivalencia no es 1:1, pero la idea general es:
  - DynamoDB (AWS), Cosmos DB (Azure), Firestore/Bigtable (GCP)  
  son opciones cuando necesitas **NoSQL + alta escala + baja latencia**, y no quieres gestionar servidores de base de datos tú mismo.”

---

### 5. Cómo usar estos conceptos durante la sesión

Sugerencia de uso en la clase:

- En **Bloque 2 (redes)**:
  - Después de explicar qué es una VPC en AWS, menciona brevemente:
    - “Si estuviera en Azure esto se llamaría Virtual Network, si estuviera en GCP se llamaría VPC Network. Misma idea, distinto nombre.”
- En **Bloque 3 (bases de datos)**:
  - Al hablar de RDS/Aurora:
    - “El equivalente en Azure sería Azure SQL Database o Azure Database for PostgreSQL/MySQL; en Google Cloud sería Cloud SQL.”
  - Al hablar de DynamoDB:
    - “Una opción similar en Azure sería Cosmos DB, y en GCP podríamos pensar en Firestore o Bigtable según el caso.”

Con esto logras que los estudiantes:

- No se queden solo con “el nombre AWS”.  
- Vean el **patrón común** de arquitectura a través de proveedores.  
- Puedan trasladar lo aprendido a otros clouds si lo necesitan en el futuro.

