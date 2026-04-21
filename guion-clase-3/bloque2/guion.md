## Bloque 2 – Redes virtuales en AWS (0:20 – 1:05)

> **Idea general:** ir de lo simple a lo complejo: VPC → subredes → seguridad (SG/NACL) → Internet/NAT → Alta disponibilidad y conectividad híbrida.

---

### 1. Entrar al tema: “sin red no hay cloud” (2–3 min)

Texto guía:

- “Todo lo que hagamos en cloud se apoya en una red virtual.  
  Si la red está mal diseñada, aunque la app sea muy buena, se cae, se expone, o rinde mal.”
- “En AWS esa red base se llama **VPC – Virtual Private Cloud**. Es como tu propia red corporativa, pero dentro de AWS.”

> [Visual sugerido: Slide con una nube grande “AWS” y dentro un rectángulo etiquetado `VPC (tu red privada)`. Fuera, otras nubes etiquetadas como “otras cuentas / Internet”.]

---

### 2. VPC: qué es y por qué existe (5–7 min)

Puntos clave a decir:

- “Una **VPC** es un pedazo de red aislado dentro de AWS.  
  Dentro de esa VPC defines:
  - qué rangos de IP se usan,  
  - cuántas subredes tienes,  
  - qué puede salir a Internet y qué no,  
  - y qué reglas de seguridad aplican.”
- “Piensa en la VPC como el ‘perímetro’ de seguridad de tu infraestructura cloud.”

Pregunta rápida:

- “Si tu app maneja datos de clientes, ¿te gustaría que esté en una red pública compartida o en tu propia VPC aislada?”

> [Visual sugerido: Diagrama sencillo de VPC con el bloque CIDR `10.0.0.0/16` escrito dentro, y un texto: “Tu espacio de IPs dentro de AWS”.]

---

### 3. Subredes públicas y privadas (10–12 min)

Guion:

- “Dentro de la VPC, dividimos la red en **subredes**.  
  Las más importantes para nosotros hoy son:
  - **Subred pública:** tiene salida a Internet a través de un Internet Gateway.  
  - **Subred privada:** no tiene acceso directo a Internet.”
- “¿Para qué usamos cada una?
  - Subred pública → cosas que deben hablar con el exterior: servidores web, load balancers, bastion hosts.  
  - Subred privada → cosas que queremos proteger: backends, bases de datos, servicios internos.”
- “La arquitectura típica de 3 capas se ve así:  
  - Capa web en subred pública.  
  - Capa de aplicación en subred privada.  
  - Capa de base de datos en otra subred privada.”

> [Visual sugerido: Esquema de 3 cajas apiladas dentro de la VPC:  
> - Arriba: `Subred pública` con un dibujito de un servidor web y un icono de Internet Gateway.  
> - Medio: `Subred privada (backend)` con un servidor de aplicación.  
> - Abajo: `Subred privada (BD)` con un cilindro de base de datos.  
> Flechas solo hacia abajo, no desde Internet directo a la BD.]

---

### 4. Security Groups vs NACL (10 min)

Texto guía:

- “Ya tenemos VPC y subredes. Ahora, ¿quién decide qué tráfico entra o sale?
  - A nivel de **instancia** usamos **Security Groups (SG)**.  
  - A nivel de **subred** usamos **NACL (Network ACL)**.”
- “Un **Security Group** es como un firewall pegado a cada servidor/base de datos:
  - Es **stateful**: si permites la entrada, la respuesta de salida se permite sola.  
  - Por defecto, **bloquea todo el tráfico entrante** hasta que tú abras puertos.”
- “Una **NACL** es una lista de reglas aplicada a toda una subred:
  - Es **stateless**: cada paquete se evalúa de nuevo.  
  - Sirve como capa extra para permitir o denegar rangos de IP a nivel de subred.”

Microactividad:

- “Voy a decir una frase y ustedes piensan (o escriben) si es **SG** o **NACL**:
  - `Firewall a nivel de instancia, stateful` → SG.  
  - `Firewall a nivel de subred, stateless` → NACL.”

> [Visual sugerido: Diagrama de flujo del tráfico:  
> `Internet → NACL (subred) → Security Group (instancia) → EC2`.  
> Dos cajas: una grande “NACL (subred)” y dentro otra “Security Group (instancia)”.]

---

### 5. Salida a Internet: IGW vs NAT Gateway (10–12 min)

Guion:

- “Hay dos piezas que siempre generan confusión:
  - **Internet Gateway (IGW):**  
    - Conecta la VPC con Internet.  
    - Se usa para subredes públicas.  
    - Permite tráfico de entrada y salida.
  - **NAT Gateway:**  
    - Se ubica en una subred pública.  
    - Permite que **instancias en subred privada salgan a Internet**, pero desde Internet no se puede iniciar conexión hacia ellas.”
- “Ejemplo típico:
  - Tengo una instancia en subred privada que necesita descargar actualizaciones del sistema operativo desde Internet.  
  - No quiero que nadie desde fuera pueda conectarse directamente a esa máquina.  
  → Uso un **NAT Gateway**.”

Pregunta de escenario:

- “Si tengo una instancia en subred privada que debe bajar paquetes de actualización pero no puede ser accedida desde Internet, ¿uso IGW o NAT Gateway?”  
  (Respuesta: NAT Gateway.)

> [Visual sugerido: Diagrama con dos caminos:  
> - Subred pública con servidor web → Internet Gateway → Internet (flechas doble vía).  
> - Subred privada con servidor → NAT Gateway (en subred pública) → Internet Gateway → Internet (solo flecha saliendo desde la privada).]

---

### 6. Alta disponibilidad: regiones, AZ y distribución (8–10 min)

Texto guía:

- “En AWS todo vive dentro de una **región** (por ejemplo `us-east-1`) que a su vez tiene varias **Zonas de Disponibilidad (AZ)**: `us-east-1a`, `us-east-1b`, etc.”
- “¿Por qué nos importa?
  - Porque si ponemos **todo** en una sola AZ y esa AZ se cae, nuestra app desaparece para todos.  
  - La forma correcta es **distribuir**:
    - Subred pública en AZ A y otra en AZ B.  
    - Subred privada en AZ A y otra en AZ B.  
    - Instancias web y bases de datos distribuidas entre ambas.”
- “Esto nos prepara para usar:
  - **Load Balancer** para repartir tráfico entre instancias en diferentes AZ.  
  - Funcionalidades como **Multi-AZ en RDS/Aurora** para BDs altamente disponibles.”

Pregunta al grupo:

- “Si tu app solo vive en una zona de disponibilidad y esa zona se cae, ¿qué ve el usuario?  
  Exacto: ve que tu servicio desaparece. Por eso diseñamos siempre **multi-AZ**.”

> [Visual sugerido: Diagrama de región con dos columnas: `AZ A` y `AZ B`.  
> En cada una, una subred pública y una privada. Arriba un Load Balancer recibiendo tráfico y enviando a instancias en ambas AZ. Abajo, una BD con primary en AZ A y standby en AZ B.]

---

### 7. Conectividad híbrida: VPN y Direct Connect (5–8 min)

Guion:

- “Muchas empresas no nacen 100% en la nube. Tienen servidores on‑premise y empiezan a extenderse a AWS.  
  A eso le llamamos **entorno híbrido**.”
- “Hay dos formas principales de conectar la red local con la VPC:
  - **Site‑to‑Site VPN:**  
    - Crea un túnel cifrado sobre Internet.  
    - Es rápida de implementar y más económica.  
    - Latencia variable porque depende de Internet.
  - **AWS Direct Connect:**  
    - Es un enlace físico dedicado entre tu data center y AWS.  
    - No pasa por Internet pública.  
    - Latencia más baja y predecible, mayor ancho de banda.”

Pregunta rápida:

- “Si necesito **un enlace físico dedicado con baja latencia estable**, ¿cuál usaría: VPN o Direct Connect?”  
  (Respuesta: Direct Connect.)

> [Visual sugerido: Diagrama con dos bloques: `Datacenter on‑premise` a la izquierda y `VPC en AWS` a la derecha.  
> Dibuja dos posibles líneas: una etiquetada `VPN (Internet cifrado)` y otra `Direct Connect (enlace dedicado)`. Debajo, una tabla pequeña con pros/cons resumidos.]

