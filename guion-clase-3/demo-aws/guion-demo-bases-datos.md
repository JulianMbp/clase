## Guion demo AWS – Consola, VPC y bases de datos (para usar en Bloque 2 y 4)

> **Objetivo:** tener un paso a paso que puedas leer mientras compartes pantalla en la consola de AWS para mostrar VPC, subredes y creación de una BD RDS/Aurora (sin necesidad de crear todos los recursos reales si no quieres).

---

### 1. Preparación antes de la clase

- Tener lista una cuenta de AWS (Free Tier o de laboratorio).
- Haber definido **una región única** para la demo (ejemplo: `N. Virginia (us-east-1)`).
- Opcional pero recomendado:
  - Tener ya creada una VPC de ejemplo con el asistente “VPC and more”.  
  - Tener ya creada una instancia RDS pequeña (o al menos dejar el asistente en la parte final sin lanzarla).

> [Visual sugerido cuando empieces la demo: Slide muy simple que diga: `Demo en consola AWS – VPC y RDS` y una lista de 3 pasos: VPC, subredes, BD.]

---

### 2. Entrar a la consola de AWS y orientarse (2–3 min)

Guion mientras compartes pantalla:

1. “Lo primero es entrar a `https://console.aws.amazon.com` y autenticarnos.”
2. “Aquí arriba vemos:
   - El **selector de región** (asegúrate de que esté en `N. Virginia` o la región que hayamos elegido).  
   - La barra de **búsqueda de servicios**, donde podemos escribir `VPC`, `RDS`, `EC2`, etc.”
3. “Algo importante: los recursos que creas en una región **no se ven** en otra.  
   Si cambio a Tokio y no veo nada, probablemente es porque mis recursos están en otra región.”

> [Visual sugerido: Señala con el puntero el selector de región y la barra de búsqueda; si quieres, un zoom sobre la región elegida.]

---

### 3. Mostrar una VPC y su estructura (5–7 min)

#### 3.1. Ir al servicio VPC

Guion:

1. “En la barra de búsqueda escribo `VPC` y selecciono el servicio.”
2. “Aquí vemos el panel de VPC:
   - VPCs, subredes, tablas de ruteo, gateways, etc.”

#### 3.2. Ver una VPC de ejemplo

- “Voy a abrir la **VPC por defecto** o una VPC que ya tenga creada:
  - Aquí vemos:
    - El **bloque CIDR** (por ejemplo `10.0.0.0/16`).  
    - La región en la que está.  
    - El estado.”
- “Esta VPC es el espacio de red donde van a vivir nuestros servidores, bases de datos y demás componentes.”

> [Visual sugerido: Resaltar el bloque CIDR y el nombre de la VPC en la tabla. Puedes hacer zoom si la interfaz lo permite.]

#### 3.3. Mostrar subredes asociadas

Guion:

1. “Voy a la sección **Subnets / Subredes**.”
2. “Aquí se ve:
   - Cada subred con su **rango de IP**.  
   - La **AZ** en la que está (por ejemplo `us-east-1a`, `us-east-1b`).  
   - A qué **VPC** pertenecen.”
3. “Si hemos usado el asistente ‘VPC and more’, normalmente ya tendremos:
   - 2 subredes públicas.  
   - 2 subredes privadas.  
   - Distribuidas en al menos 2 AZ, lo que nos prepara para alta disponibilidad.”

> [Visual sugerido: Señalar con el puntero las columnas de `Subnet Type` (si las distingue) o explicar de viva voz cuál pensaste como pública/privada, y las columnas de `Availability Zone`.]

---

### 4. (Opcional rápido) Crear una VPC con “VPC and more” (5–7 min)

Solo si quieres mostrar el flujo, sin necesariamente crearla:

1. “Hago clic en **Create VPC**.”
2. “Selecciono la opción **VPC and more**.”
3. “Configuro:
   - Nombre del proyecto (por ejemplo `clase-redes-bd`).  
   - Bloque CIDR IPv4: `10.0.0.0/16`.  
   - Número de AZ: 2.  
   - Subredes públicas: 2.  
   - Subredes privadas: 2.  
   - NAT Gateway: habilitado si quiero salida a Internet desde privadas.”
4. “Antes de crear, AWS me muestra un **diagrama visual** de cómo quedará: VPC, subredes, IGW, NAT, tablas de ruteo.”

Comentario:

- “Esto automatiza muchísimo trabajo de red: antes habría que crear cada cosa a mano; aquí se arma casi todo de una vez.”

> [Visual sugerido: Mostrar el diagrama que genera el asistente, señalando VPC, subredes, IGW, NAT y resaltando que ya está todo conectado.] 

---

### 5. Mostrar un recorrido por Security Groups (3–5 min)

Guion:

1. “Ahora, vamos a **Security Groups** (puedes entrar desde VPC o buscarlo directamente).”
2. “Aquí vemos cada grupo de seguridad:
   - Nombre, VPC, descripción.”
3. “Abro uno de ejemplo:
   - En **Inbound rules** vemos qué tráfico de entrada se permite (puerto, protocolo, origen).  
   - En **Outbound rules** vemos qué tráfico de salida se permite.”
4. “Por ejemplo, para una BD típica:
   - Podríamos permitir tráfico en el puerto 5432 desde el Security Group del backend, y nada más.”

> [Visual sugerido: Mostrar el panel de reglas de entrada de un SG, con una regla que se pueda leer fácilmente. Puedes hacer zoom sobre la fila del puerto y origen.]

---

### 6. Crear una VPC “a mano” y dejarla lista para usar (10–15 min)

> Usa esta sección si quieres una demo más “de bajo nivel” que muestre cada pieza: VPC, subredes, rutas, IGW, NAT y Security Group para una instancia.

#### 6.1. Crear la VPC

Guion:

1. “Voy de nuevo al servicio **VPC**.”
2. “Clic en **Create VPC**.”
3. “Ahora elijo la opción **VPC only** (solo VPC) para ver cada paso.”
4. “Configuro:
   - `Name tag`: por ejemplo `clase3-vpc-demo`.  
   - `IPv4 CIDR`: `10.0.0.0/16`.”
5. “Dejo el resto en valores por defecto y creo la VPC.”

> [Visual sugerido: Resaltar el campo `Name tag` y el `IPv4 CIDR block` antes de hacer clic en Create VPC.]

#### 6.2. Crear subred pública y privada

Guion:

1. “Voy a **Subnets → Create subnet**.”
2. “Selecciono la VPC `clase3-vpc-demo`.”
3. “Creo primero una **subred pública**:
   - Name tag: `clase3-public-subnet-a`.  
   - AZ: elige una, por ejemplo `us-east-1a`.  
   - IPv4 CIDR block: `10.0.1.0/24`.”
4. “Creo después una **subred privada**:
   - Name tag: `clase3-private-subnet-a`.  
   - Misma VPC y misma AZ.  
   - IPv4 CIDR block: `10.0.2.0/24`.”

Comentario:

- “Con esto ya tengo un pequeño espacio de red:
  - `10.0.1.0/24` para recursos públicos (web, NAT).  
  - `10.0.2.0/24` para recursos privados (backends, BD).”

> [Visual sugerido: Tabla de subredes mostrando las dos nuevas, con sus CIDR y AZ. Señala cuál será pública y cuál privada.]

#### 6.3. Crear y asociar un Internet Gateway

Guion:

1. “En el menú de VPC voy a **Internet Gateways → Create internet gateway**.”
2. “Name tag: `clase3-igw` y creo el recurso.”
3. “Con el IGW seleccionado, hago clic en **Actions → Attach to VPC** y elijo `clase3-vpc-demo`.”

Explicación:

- “Este Internet Gateway es la puerta de salida y entrada a Internet para las subredes públicas de esta VPC.”

> [Visual sugerido: Mostrar el IGW con estado `attached` a la VPC de demo.]

#### 6.4. Configurar tablas de ruteo (pública y privada)

Guion:

1. “Voy a **Route tables**.”
2. “Creo una nueva tabla de rutas:
   - Name tag: `clase3-public-rt`.  
   - VPC: `clase3-vpc-demo`.”
3. “Selecciono `clase3-public-rt`, voy a la pestaña **Routes** y edito:
   - Dejo la ruta `10.0.0.0/16 → local` (tráfico interno).  
   - Agrego una nueva ruta: `0.0.0.0/0 → Internet Gateway (clase3-igw)`.”
4. “En la pestaña **Subnet associations**, asocio la subred `clase3-public-subnet-a` a esta tabla.”

Comentario:

- “Con esto, cualquier recurso en la subred pública que tenga una IP pública podrá salir a Internet usando el IGW.”

Para la subred privada:

- “La subred privada puede usar la tabla de rutas por defecto de la VPC (solo ruta local) o podemos crear una `clase3-private-rt` que por ahora solo tenga:
  - `10.0.0.0/16 → local` (sin ruta a Internet).  
  Esto la mantiene aislada, ideal para bases de datos.”

> [Visual sugerido: Mostrar la tabla de rutas pública con `0.0.0.0/0 → igw-...` y la asociación con la subred pública.]

#### 6.5. (Opcional) Crear un NAT Gateway para la subred privada

Solo si quieres mostrar salida a Internet desde la subred privada:

1. “Voy a **NAT gateways → Create NAT gateway**.”
2. “Configuro:
   - Subnet: `clase3-public-subnet-a`.  
   - Elastic IP: `Allocate Elastic IP` y lo asocio.”
3. “Creo el NAT Gateway y espero a que esté en estado `Available`.”
4. “Voy a la `clase3-private-rt` y agrego una ruta:
   - `0.0.0.0/0 → NAT Gateway (clase3-nat)`.”

Explicación:

- “Ahora, las instancias en la subred privada pueden salir a Internet (para actualizaciones, por ejemplo) a través del NAT, pero **nadie puede iniciar conexiones directamente desde Internet** hacia ellas.”

> [Visual sugerido: Diagrama lógico resumido: Subred privada → NAT GW en subred pública → IGW → Internet.]

---

### 7. Tour por RDS: creación conceptual de una base de datos (10–12 min)

#### 6.1. Entrar a RDS

Guion:

1. “En la barra de búsqueda escribo `RDS` y entro al servicio.”
2. “Aquí se ve el dashboard: número de instancias, snapshots, etc.”

#### 6.2. Iniciar el asistente de creación

1. “Hago clic en **Create database**.”
2. “Puedo elegir:
   - `Standard create` (más control)  
   - o `Easy create` (configuraciones recomendadas).  
   Para entender, voy a usar `Standard create`.”

#### 6.3. Elegir motor y opciones clave

Guion:

- “Primero elijo el **motor de base de datos**:
  - MySQL, PostgreSQL, MariaDB, SQL Server, Oracle, Aurora…  
  - Si quiero empezar con algo común, puedo elegir `PostgreSQL`.”
- “Luego vienen las opciones de:
  - **Template**: por ejemplo `Free tier` si estoy practicando.  
  - **DB instance class**: tamaño de la máquina (micro, small, etc.).  
  - **Storage**: tipo de disco (gp2/gp3/io1) y tamaño inicial.”

> [Visual sugerido: Mostrar la pantalla donde se selecciona el motor y el template; resaltar con el puntero `Free tier` y un motor como PostgreSQL.]

#### 6.4. Disponibilidad y red

Guion:

- “Más abajo, se configuran temas de **alta disponibilidad**:
  - Podemos activar **Multi‑AZ** para que haya una réplica en otra zona de disponibilidad.  
  - Esto es lo que nos da el failover automático si la AZ principal tiene un problema.”
- “En la parte de red:
  - Elegimos en qué **VPC** estará la base de datos.  
  - Si estará en **subredes privadas** (lo recomendado para producción).  
  - Elegimos o creamos un **Security Group**.”

Comentario:

- “Aquí es donde conectamos la capa de datos con el diseño de red que hicimos: VPC + subredes privadas + SG que solo permite tráfico desde el backend.”

> [Visual sugerido: Pantalla de configuración de red de RDS, señalando el dropdown de VPC, el de subredes y la sección de Security Group.]

#### 6.5. Backups, cifrado y otras opciones

Guion:

- “Más abajo tenemos:
  - **Backups automáticos**: cuánto tiempo retenerlos (1–35 días).  
  - Opción de **Point‑in‑Time Recovery** (implícita con los backups + logs).  
  - **Cifrado** en reposo usando **KMS**.  
  - Ventana de mantenimiento para aplicar parches.”
- “Esto resume la idea de **base de datos gestionada**:
  - No tengo que montar yo el backup.  
  - No tengo que hacer scripts para restablecer.  
  - AWS me da estas capacidades de fábrica.”

> [Visual sugerido: Mostrar sección de backups y cifrado; resaltar la casilla de cifrado y el campo de retención de backups.]

---

### 8. Mencionar Aurora y Aurora Serverless brevemente en la consola (3–5 min)

Si quieres conectar con lo visto en teoría:

- “Si en lugar de RDS selecciono **Aurora** como motor:
  - El asistente cambia un poco: ahora hablamos de **clusters**.  
  - Puedo elegir si quiero una configuración **provisioned** o **serverless** (Aurora Serverless v2).”
- “En el caso de Aurora Serverless v2:
  - Defino un rango de **ACUs** (por ejemplo de 2 a 64).  
  - Aurora ajusta la capacidad automáticamente dentro de ese rango según la carga.”

> [Visual sugerido: Simplemente mostrar la pantalla de creación de Aurora y señalar la opción `Serverless v2` y el rango de ACU.]

---

### 9. Ejemplo de cómo “usar” la VPC: lanzar una instancia y acceder (5–8 min)

> Esta parte es más conceptual: no necesitas completar todo el lanzamiento si no quieres, pero explica el flujo.

Guion:

1. “Voy al servicio **EC2** (o `Instancias` en AWS).”
2. “Inicio el asistente de creación de una instancia:
   - Elijo una AMI básica, por ejemplo `Amazon Linux` o `Ubuntu`.  
   - Elijo un tipo de instancia pequeño (por ejemplo `t2.micro` si está en free tier).”
3. “En la sección de **Network**:
   - Selecciono la VPC `clase3-vpc-demo`.  
   - Selecciono la subred `clase3-public-subnet-a`.  
   - Indico que la instancia tenga una **IP pública** (Enable auto-assign public IP).”
4. “En **Security Group**, creo uno nuevo:
   - `clase3-sg-web`.  
   - Abro solo:
     - Puerta 22 (SSH) o 3389 (RDP) para mi IP.  
     - O, si quiero hacer demo de un servidor web, puerto 80/443.”
5. “Lanzo la instancia (aunque no necesariamente tengo que conectarme en vivo).”

Explicación de cómo se accede:

- “Gracias a:
  - La **VPC** y la **subred pública**, la instancia tiene rutas hacia Internet.  
  - El **Internet Gateway** conecta la VPC con Internet.  
  - El **Security Group** decide desde qué IPs y por qué puertos se puede entrar.”
- “Si esto fuera un entorno real:
  - Me conectaría por SSH/RDP usando la IP pública.  
  - Podría instalar un servidor web y exponerlo al puerto 80/443.  
  - O podría colocar un Load Balancer delante de varias instancias en esta VPC.”

> [Visual sugerido: Slide o dibujo que resuma el flujo: `Tu PC → Internet → IGW → VPC (subred pública) → SG → Instancia EC2`. Usa el mismo nombre de VPC y subred que usaste en la demo.]

---

### 10. Cierre de la demo (2–3 min)

Guion:

- “Con esto ya tienen una imagen mental de:
  - Dónde se diseña la red (VPC, subredes, SG, NAT, IGW).  
  - Dónde se crean las bases de datos gestionadas (RDS, Aurora).  
  - Y cómo conceptos como **Multi‑AZ, backups, cifrado, subred privada** se traducen en opciones concretas en la consola.”
- “No es necesario memorizar cada click. Lo importante es entender:
  - Qué problema resuelve cada componente.  
  - Y cómo se relaciona con el diseño de arquitectura que dibujamos en la pizarra.”

> [Visual sugerido: Volver al slide del diagrama final de la mini arquitectura `app web + BD` y dejarlo visible mientras respondes preguntas o vuelves a la teoría.] 

