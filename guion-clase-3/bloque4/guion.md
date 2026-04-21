## Bloque 4 – Ejercicio práctico: mini arquitectura “app web + BD” (1:50 – 2:35)

> **Idea general:** dibujar una arquitectura completa que combine redes (Módulo 5) y bases de datos (Módulo 6), y que sirva como “plantilla mental” para el resto del curso.

---

### 1. Plantear el escenario de e‑commerce (5 min)

Guion:

- “Ahora vamos a juntar todo en un ejemplo.  
  Imagina que vas a montar un **e‑commerce sencillo**:
  - Usuarios que se registran e inician sesión.  
  - Catálogo de productos.  
  - Pedidos que deben guardarse de forma confiable.  
  - Sesiones de usuarios con mucha concurrencia en horas pico.”
- “La pregunta es: **¿cómo se ve esto en la nube, a nivel de red y de bases de datos?**”

> [Visual sugerido: Slide con lista de requisitos del e‑commerce (usuarios, catálogo, pedidos, sesiones) y un icono de carrito grande en el centro.]

---

### 2. Paso 1 – Diseñar la red (VPC, subredes, seguridad) (10–12 min)

Guion mientras dibujas:

1. “Empezamos por la **VPC**:
   - Definimos un rango de IP, por ejemplo `10.0.0.0/16`.  
   - Esta será nuestra red privada en AWS.”
2. “Luego definimos subredes:
   - **2 subredes públicas** en dos AZ distintas (`us-east-1a` y `us-east-1b`) para la capa web / Load Balancer.  
   - **2 subredes privadas** en esas mismas AZ para el backend y las bases de datos.”
3. “Conectamos la VPC a Internet:
   - Creamos un **Internet Gateway** y lo asociamos a la VPC para que las subredes públicas puedan recibir tráfico.  
   - Creamos un **NAT Gateway** en una subred pública para que las instancias privadas puedan salir a Internet sin ser accesibles desde fuera.”
4. “Definimos **Security Groups**:
   - `SG-Web`: permite HTTP/HTTPS desde Internet hacia el Load Balancer o las instancias web.  
   - `SG-Backend`: permite tráfico desde `SG-Web` hacia el backend (por ejemplo, puerto 8080).  
   - `SG-DB`: permite tráfico solo desde `SG-Backend` hacia la base de datos (puerto 3306/5432).”

> [Visual sugerido: Diagrama paso a paso:  
> - Primero, un rectángulo `VPC 10.0.0.0/16`.  
> - Luego, dibujas 2 columnas `AZ A` y `AZ B` con subred pública y privada en cada una.  
> - Añades el Internet Gateway y el NAT Gateway.  
> - Finalmente, dibujas íconos para `Web`, `Backend`, `BD` y anotaciones de los Security Groups.]

---

### 3. Paso 2 – Elegir y ubicar las bases de datos (10–12 min)

Guion:

- “Ahora llenamos la capa de datos, usando lo que vimos en el bloque anterior:
  - Para **usuarios, productos y pedidos**: necesitamos transacciones ACID, relaciones, SQL.  
    → Elegimos **RDS o Aurora** (dependiendo del rendimiento que queramos).  
  - Para **sesiones de usuarios y carritos de compra**, con altísima concurrencia y necesidad de baja latencia:  
    → Elegimos **DynamoDB**.”
- “En el diagrama:
  - Colocamos una instancia de **RDS/Aurora Multi‑AZ** en las subredes privadas (una primary en AZ A y una standby en AZ B).  
  - Colocamos una **tabla DynamoDB** asociada a la app, fuera de la VPC pero accesible desde los backends (vía endpoints o salida normal).”
- “La app web:
  - Recibe peticiones a través de un **Load Balancer** en la subred pública.  
  - Envía tráfico al **backend** en la subred privada.  
  - El backend:
    - Lee/escribe datos relacionales en RDS/Aurora.  
    - Guarda el estado de sesión y carritos en DynamoDB.”

> [Visual sugerido: Versión “final” del diagrama de arquitectura:  
> - Usuario → Load Balancer → instancias web en 2 AZ.  
> - Web → backend en subred privada.  
> - Backend → RDS/Aurora (Multi‑AZ) + DynamoDB.  
> Marca claramente qué está en subred pública, qué en privada y qué es servicio administrado fuera de la VPC (DynamoDB).]

---

### 4. Paso 3 – Alta disponibilidad y fallos (5–8 min)

Guion:

- “Con esta arquitectura, si:
  - se cae una instancia web → el Load Balancer deja de enviarle tráfico y usa las otras.  
  - se cae una AZ completa → aún tenemos instancias en la otra AZ y la BD en modo Multi‑AZ hace failover.  
  - tenemos un pico de tráfico → podemos escalar:
    - añadiendo instancias detrás del Load Balancer,  
    - o usando Aurora Serverless / DynamoDB On‑Demand para que la capa de datos escale automáticamente.”
- “Esto es lo que diferencia una arquitectura de juguete de una arquitectura que puede ir a producción.”

Pregunta rápida:

- “En esta arquitectura, ¿qué pasaría si hubiéramos puesto la base de datos en una subred pública con acceso directo a Internet?”  
  (Respuesta: la expondríamos a ataques, romperíamos buenas prácticas de seguridad.)

> [Visual sugerido: Mismo diagrama, pero ahora con íconos de advertencia (`⚠`) donde habría puntos únicos de fallo si no hubiera Multi‑AZ o Load Balancer. Así refuerzas por qué los añadiste.]

---

### 5. Mini‑quiz integrado (5–8 min)

Preguntas que puedes lanzar “sobre el dibujo”:

1. “Se cayó la AZ A completa. ¿Quién sigue atendiendo usuarios?”  
   - Espera respuestas y luego remarca: instancias en AZ B + BD standby que se convierte en primary.
2. “Un atacante intenta entrar directamente a la base de datos desde Internet. ¿Qué capitas de seguridad lo frenan?”  
   - Respuesta: subred privada, ausencia de IGW en esa subred, Security Group de la BD.
3. “La app empieza a recibir 10x más tráfico por una campaña. ¿Qué opciones de escalado tienes?”  
   - Más instancias detrás del Load Balancer, Aurora Serverless, DynamoDB On‑Demand, caché con ElastiCache, etc.

> [Visual sugerido: Mismo diagrama con números 1, 2 y 3 marcando en rojo las partes relevantes para cada pregunta; puedes ir señalando con el mouse mientras respondes.]

