# Guía de Ejercicios Prácticos — Módulo 6
# Bases de Datos Gestionadas y Serverless

> **CYMETRIA – El Futuro es Digital**
> Taller práctico con 10 ejercicios de opción múltiple, respuestas justificadas y contexto conceptual ampliado.

---

## Tabla de Contenidos

| # | Tema del ejercicio |
|---|---|
| 1 | Ventajas de las bases de datos gestionadas (Managed Databases) |
| 2 | Modelo de facturación en entornos serverless |
| 3 | Características distintivas de una base de datos serverless |
| 4 | Políticas de backup automatizadas en la nube |
| 5 | Function-as-a-Service (FaaS) en arquitecturas serverless |
| 6 | Elección del servicio correcto para una app web sin mantenimiento |
| 7 | Diagramas técnicos de arquitectura en la nube |
| 8 | Replicación automática en bases de datos gestionadas |
| 9 | Integración híbrida entre on-premise y la nube |
| 10 | Monitoreo y alertas en entornos serverless |

---

## Ejercicio 1
### ¿Cuál de las siguientes opciones describe mejor una ventaja de usar bases de datos gestionadas (Managed Databases)?

| Opción | Enunciado |
|---|---|
| A) | Permiten un control total sobre el hardware físico. |
| B) | El usuario debe realizar manualmente la replicación de datos. |
| **C) ✅** | **Automatizan tareas como actualizaciones, parches y copias de seguridad.** |
| D) | No ofrecen alta disponibilidad. |

### ✅ Respuesta correcta: C

**Explicación del taller:**
Las bases de datos gestionadas automatizan tareas operativas como backups, parches de seguridad y escalado, permitiendo que el usuario se concentre en la lógica de negocio y no en la administración del servidor.

---

### 📚 Concepto ampliado: ¿Qué es una base de datos gestionada?

Una **base de datos gestionada (Managed Database)** es un servicio en la nube donde el proveedor asume la responsabilidad de toda la infraestructura y las operaciones de mantenimiento. El usuario solo se preocupa por sus datos y su aplicación.

**¿Por qué son incorrectas las otras opciones?**

- **Opción A — Incorrecta:** Las bases de datos gestionadas hacen exactamente lo contrario: *abstraen* el hardware físico. El usuario no puede acceder ni controlar los servidores subyacentes. Si se necesita control total del hardware, la opción sería instalar la base de datos en una instancia EC2 propia.

- **Opción B — Incorrecta:** La replicación es una de las tareas que AWS gestiona automáticamente, no el usuario. En RDS con Multi-AZ, la réplica síncrona se crea y mantiene sin intervención manual.

- **Opción D — Incorrecta:** Todo lo contrario. La alta disponibilidad es una de las ventajas más importantes. RDS Multi-AZ ofrece failover automático, y Aurora replica los datos en 6 copias distribuidas en 3 Zonas de Disponibilidad.

**Tareas que una base de datos gestionada en AWS automatiza:**

```
ANTES (On-Premise / autogestión)     AHORA (Base de datos gestionada)
──────────────────────────────       ──────────────────────────────────
✗ Comprar y configurar hardware   →  ✅ AWS aprovisiona la infraestructura
✗ Instalar y actualizar el motor  →  ✅ Parches aplicados automáticamente
✗ Programar y verificar backups   →  ✅ Backups automáticos diarios
✗ Configurar réplicas manualmente →  ✅ Replicación Multi-AZ automática
✗ Monitorear rendimiento          →  ✅ CloudWatch integrado
✗ Planear recuperación ante fallos→  ✅ Failover automático en ~60 segundos
```

**Ejemplos de bases de datos gestionadas en AWS:**
- **Amazon RDS** — MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2
- **Amazon Aurora** — Motor nativo de AWS, compatible con MySQL y PostgreSQL
- **Amazon DynamoDB** — NoSQL serverless completamente gestionado

---

## Ejercicio 2
### En un entorno serverless, ¿cómo se factura el uso de los recursos?

| Opción | Enunciado |
|---|---|
| A) | Se cobra una tarifa fija mensual sin importar el uso. |
| **B) ✅** | **Solo se cobra por el tiempo y cantidad de ejecución del servicio.** |
| C) | Se paga únicamente si hay errores en la ejecución. |
| D) | Se cobra en función del tamaño del servidor. |

### ✅ Respuesta correcta: B

**Explicación del taller:**
En los entornos serverless, los costos se calculan con base en las ejecuciones reales (por tiempo o número de solicitudes), lo que reduce gastos cuando la aplicación está inactiva.

---

### 📚 Concepto ampliado: Modelo de facturación serverless

El modelo de precios serverless representa un cambio fundamental respecto a la infraestructura tradicional: **pagas exactamente por lo que consumes, nada más.**

**¿Por qué son incorrectas las otras opciones?**

- **Opción A — Incorrecta:** La tarifa fija mensual es el modelo tradicional (servidores dedicados, instancias reservadas). En serverless no existe ese concepto: si nadie usa la aplicación durante un fin de semana, el costo es cero o mínimo.

- **Opción C — Incorrecta:** Se paga por todas las ejecuciones, tanto las exitosas como las que generan error. No existe un modelo donde solo se cobre por fallos.

- **Opción D — Incorrecta:** En serverless no hay "tamaño de servidor" porque no se gestionan servidores. El costo depende del consumo real de recursos (tiempo de CPU, memoria utilizada, número de solicitudes).

**Comparación de modelos de facturación:**

```
MODELO TRADICIONAL (servidor dedicado)
┌─────────────────────────────────────────────────┐
│ Pagas: $X/mes fijo aunque el servidor esté      │
│ al 10% de uso o completamente inactivo.         │
└─────────────────────────────────────────────────┘

MODELO SERVERLESS
┌─────────────────────────────────────────────────┐
│ 1.000 solicitudes    → pagas por 1.000          │
│ 0 solicitudes        → pagas $0                 │
│ 10.000.000 solicitudes → pagas por 10.000.000   │
│ Escala automáticamente en ambas direcciones     │
└─────────────────────────────────────────────────┘
```

**Ejemplos de facturación serverless en AWS:**

| Servicio | Unidad de facturación |
|---|---|
| **AWS Lambda** | Por número de invocaciones + duración en ms |
| **Amazon DynamoDB On-Demand** | Por unidades de lectura/escritura consumidas |
| **Aurora Serverless v2** | Por ACU-hora (Aurora Capacity Units) utilizadas |
| **Amazon Timestream** | Por datos escritos, almacenados y consultados |

**Ventaja clave:** Una startup que lanza una app nueva y tiene tráfico irregular paga casi nada en las noches y fines de semana de baja actividad, y solo paga más cuando hay usuarios reales usando el servicio.

---

## Ejercicio 3
### ¿Qué característica distingue una base de datos serverless de una tradicional?

| Opción | Enunciado |
|---|---|
| A) | Requiere configuración manual de escalabilidad. |
| **B) ✅** | **Escala automáticamente según la demanda de consultas.** |
| C) | Solo funciona en servidores dedicados. |
| D) | No puede integrarse con aplicaciones web. |

### ✅ Respuesta correcta: B

**Explicación del taller:**
Las bases de datos serverless se ajustan dinámicamente al volumen de tráfico o carga de trabajo sin intervención manual, mejorando la eficiencia y reduciendo costos.

---

### 📚 Concepto ampliado: Escalado automático serverless

El **escalado automático** es la característica más definitoria del modelo serverless. La base de datos "observa" el tráfico entrante en tiempo real y ajusta su capacidad en segundos, sin que el administrador haga nada.

**¿Por qué son incorrectas las otras opciones?**

- **Opción A — Incorrecta:** La configuración manual de escalabilidad describe precisamente el modelo tradicional. En serverless, el usuario define un rango de capacidad (mínimo y máximo) y el sistema se mueve dentro de ese rango automáticamente.

- **Opción C — Incorrecta:** El serverless es el modelo más opuesto a los servidores dedicados. No hay servidores visibles para el usuario; la infraestructura es completamente abstracta.

- **Opción D — Incorrecta:** DynamoDB y Aurora Serverless son ampliamente usadas como backends de aplicaciones web, móviles y APIs. Se integran con AWS Lambda, API Gateway, Amplify y muchos otros servicios.

**¿Cómo escala una base de datos serverless?**

```
AURORA SERVERLESS v2 — Escalado granular:

Capacidad
(ACU)
 64 │                    ╭──────────╮
    │                  ╭╯          ╰╮
 32 │                ╭╯            ╰╮
    │              ╭╯               ╰╮
  8 │────────────╮╯                  ╰─────────────
  2 │────────────╯                   │ reduce auto
    └──────────────────────────────────────────────►
    Noche    Mañana   Pico     Tarde   Noche
                     (venta)

• Escala en incrementos de 0.5 ACU
• Sin tiempo de inactividad durante el escalado
• Sin intervención del administrador
```

**Diferencias clave entre base de datos tradicional y serverless:**

| Dimensión | Base de datos tradicional | Base de datos serverless |
|---|---|---|
| Escalado | Manual (el admin elige el tamaño) | Automático según la demanda |
| Facturación | Por instancia activa (siempre) | Por consumo real |
| Gestión | Requiere configurar capacidad | Sin planificación de capacidad |
| Picos de tráfico | Puede saturarse o desperdiciar recursos | Se adapta instantáneamente |
| Ideal para | Carga predecible y constante | Carga variable o desconocida |

---

## Ejercicio 4
### ¿Por qué es fundamental mantener políticas de backup automatizadas en la nube?

| Opción | Enunciado |
|---|---|
| A) | Para disminuir la latencia entre regiones. |
| **B) ✅** | **Para garantizar la recuperación rápida de datos ante fallos.** |
| C) | Para evitar el consumo de ancho de banda. |
| D) | Para mejorar el diseño visual de los dashboards. |

### ✅ Respuesta correcta: B

**Proceso explicado en el taller:**
- Si hay pérdida o corrupción de datos (por error o ataque),
- los backups automáticos permiten restaurar versiones previas,
- asegurando la continuidad del servicio y la integridad de la información.

---

### 📚 Concepto ampliado: Backup y recuperación en AWS

Los **backups automatizados** son una de las funcionalidades más críticas de las bases de datos gestionadas. En AWS, este proceso funciona sin intervención humana y permite recuperar datos ante múltiples escenarios de fallo.

**¿Por qué son incorrectas las otras opciones?**

- **Opción A — Incorrecta:** La latencia entre regiones se gestiona con replicación geográfica (Aurora Global Database, DynamoDB Global Tables) o con CDNs para contenido estático. Los backups son para recuperación de datos, no para reducir latencia.

- **Opción C — Incorrecta:** Los backups consumen almacenamiento y pueden usar ancho de banda durante la creación. No tienen relación con reducir el ancho de banda de la aplicación.

- **Opción D — Incorrecta:** Los dashboards (como CloudWatch o Grafana) son herramientas de monitoreo independientes. Los backups no afectan su diseño ni funcionalidad.

**Tipos de backup en Amazon RDS/Aurora:**

```
LÍNEA DE TIEMPO DE PROTECCIÓN DE DATOS
──────────────────────────────────────────────────────────────────►
Día 1   Día 7   Día 14   Día 21   Día 28   Día 35  HOY
  │       │       │        │        │        │       │
[auto] [auto]  [auto]   [auto]   [auto]   [auto]  [actual]
  ↑                       ↑
[snapshot               [snapshot
 manual]                 manual]

PITR: puedes restaurar a CUALQUIER segundo en este rango ←──────────
```

**Mecanismos de backup en AWS:**

| Mecanismo | Qué hace | Retención |
|---|---|---|
| **Backup automático diario** | Snapshot completo de la BD + logs de transacciones | 1 a 35 días (configurable) |
| **Point-in-Time Recovery (PITR)** | Restaurar al estado de cualquier segundo del pasado | Dentro del período de retención |
| **Snapshot manual** | Copia completa que el usuario crea cuando quiere | Indefinida (hasta que la borres) |
| **Backup continuo (DynamoDB)** | PITR habilitado opcionalmente | Últimos 35 días |

**¿Ante qué escenarios protegen los backups?**

- Error humano: un desarrollador borra accidentalmente una tabla o filas críticas.
- Ataque ransomware: un actor malicioso corrompe o cifra los datos.
- Bug en una migración: un script de actualización deja la base de datos en estado inconsistente.
- Fallo de hardware: aunque AWS lo gestiona, una corrupción silenciosa puede requerir restauración.

**Buena práctica:** Combinar backups automáticos con snapshots manuales antes de cualquier cambio importante (actualizaciones de motor, migraciones, cambios de esquema).

---

## Ejercicio 5
### En una arquitectura serverless, ¿qué elemento se encarga de ejecutar funciones ante eventos específicos?

| Opción | Enunciado |
|---|---|
| A) | Load Balancer |
| B) | Gateway API |
| **C) ✅** | **Function-as-a-Service (FaaS)** |
| D) | Database Proxy |

### ✅ Respuesta correcta: C

**Explicación del taller:**
En la arquitectura serverless, el modelo FaaS (como AWS Lambda o Azure Functions) ejecuta código en respuesta a eventos, sin necesidad de gestionar servidores.

---

### 📚 Concepto ampliado: FaaS y arquitectura event-driven

**Function-as-a-Service (FaaS)** es el corazón del modelo serverless de cómputo. Permite ejecutar fragmentos de código de forma independiente, en respuesta a eventos, sin aprovisionar ni gestionar servidores.

**¿Por qué son incorrectas las otras opciones?**

- **Opción A — Load Balancer:** Distribuye el tráfico de red entre múltiples instancias del mismo servicio. No ejecuta código ni responde a eventos de lógica de negocio. En AWS: ALB, NLB, GWLB.

- **Opción B — API Gateway:** Recibe peticiones HTTP/HTTPS y las enruta a otros servicios (como Lambda). Es el punto de entrada de la API, pero no ejecuta la función en sí. Trabaja junto al FaaS, no en lugar de él.

- **Opción D — Database Proxy:** Actúa como intermediario entre la aplicación y la base de datos para gestionar conexiones. No tiene rol en la ejecución de funciones ante eventos. En AWS: RDS Proxy.

**¿Cómo funciona una arquitectura FaaS con base de datos?**

```
FLUJO COMPLETO DE UNA ARQUITECTURA SERVERLESS

Usuario
   │
   ▼
[API Gateway]          ← Recibe la petición HTTP
   │
   ▼
[AWS Lambda (FaaS)]    ← Ejecuta la función ante el evento
   │
   ├──► [DynamoDB]     ← Lee/escribe datos (serverless)
   │
   ├──► [Aurora Serverless] ← Consulta SQL si se necesita
   │
   └──► [SNS / SES]    ← Envía notificaciones
```

**Ejemplos de eventos que disparan una función Lambda (FaaS):**

| Origen del evento | Qué desencadena |
|---|---|
| API Gateway (HTTP POST) | El usuario envía un formulario |
| DynamoDB Streams | Se inserta o modifica un registro |
| S3 (upload de archivo) | Se sube una imagen o documento |
| CloudWatch Events (cron) | Tarea programada (cada hora, cada día) |
| SNS (mensaje) | Se publica una notificación |
| SQS (cola) | Llega un mensaje a procesar |

**Ventajas del modelo FaaS:**
- Sin servidores que gestionar.
- Escala automáticamente: desde 0 hasta miles de ejecuciones simultáneas.
- Facturación por milisegundo de ejecución.
- El código solo corre cuando hay un evento real.

---

## Ejercicio 6
### Si una empresa quiere conectar su aplicación web a una base de datos sin preocuparse por el mantenimiento ni las actualizaciones, ¿qué servicio debería elegir?

| Opción | Enunciado |
|---|---|
| A) | Base de datos local |
| **B) ✅** | **Base de datos gestionada en la nube** |
| C) | Servidor FTP |
| D) | Almacenamiento en caché |

### ✅ Respuesta correcta: B

**Explicación del taller:**
Las bases de datos gestionadas (como Amazon RDS, Azure SQL, o Cloud SQL) se encargan automáticamente de tareas de mantenimiento, respaldos y escalado.

---

### 📚 Concepto ampliado: Eligiendo el servicio correcto

Este ejercicio evalúa la comprensión práctica del caso de uso de las bases de datos gestionadas: **eliminar la carga operativa para que el equipo se enfoque en el producto**.

**¿Por qué son incorrectas las otras opciones?**

- **Opción A — Base de datos local (On-Premise):** Requiere que la empresa gestione todo: el servidor físico, la instalación del motor, las actualizaciones, la seguridad, los backups y la disponibilidad. Es exactamente lo contrario a lo que la empresa quiere.

- **Opción C — Servidor FTP:** Es un protocolo para transferencia de archivos (File Transfer Protocol). No tiene ninguna relación con bases de datos ni con aplicaciones web que necesiten almacenar y consultar datos estructurados.

- **Opción D — Almacenamiento en caché:** Servicios como ElastiCache (Redis) aceleran el acceso a datos ya existentes en la BD, pero no pueden reemplazarla. Un caché es complementario a la base de datos, no un sustituto.

**¿Qué servicio gestionado en AWS elegir según el caso?**

```
La empresa tiene una app web. ¿Qué tipo de datos maneja?

¿Datos relacionales (tablas, JOINs, transacciones)?
├── Tráfico predecible     → Amazon RDS
└── Alto rendimiento       → Amazon Aurora
      └── Tráfico variable → Aurora Serverless v2

¿Datos no relacionales (usuarios, sesiones, catálogos)?
└── Alta escala, baja latencia → Amazon DynamoDB
```

**Resumen del valor de una base de datos gestionada para una empresa:**

- El equipo de desarrollo no necesita un DBA (Database Administrator) dedicado.
- No hay que planear ventanas de mantenimiento con el equipo de operaciones.
- Las actualizaciones de seguridad se aplican automáticamente.
- La empresa paga solo por lo que usa, sin inversión inicial en hardware.

---

## Ejercicio 7
### En un diagrama técnico de arquitectura en la nube, ¿qué propósito cumple el uso de íconos de servicios (como EC2, S3, Lambda)?

| Opción | Enunciado |
|---|---|
| **A) ✅** | **Identificar visualmente los componentes y sus interconexiones.** |
| B) | Mostrar los costos aproximados de cada servicio. |
| C) | Indicar el tipo de usuario que accede al sistema. |
| D) | Determinar las zonas horarias de los servidores. |

### ✅ Respuesta correcta: A

**Explicación del taller:**
Los diagramas técnicos permiten visualizar la arquitectura completa, facilitando la comprensión de cómo los servicios se comunican e interactúan entre sí.

---

### 📚 Concepto ampliado: Diagramas de arquitectura en AWS

Los **diagramas de arquitectura** son una herramienta fundamental en el diseño de sistemas en la nube. AWS proporciona un conjunto oficial de íconos (AWS Architecture Icons) para representar cada servicio de forma estandarizada.

**¿Por qué son incorrectas las otras opciones?**

- **Opción B — Costos:** Los diagramas de arquitectura no muestran precios. Para estimar costos se usa la **AWS Pricing Calculator**. Un diagrama puede tener una nota de costos anexa, pero ese no es su propósito principal.

- **Opción C — Tipo de usuario:** Los diagramas sí pueden mostrar "actores" (usuario final, administrador, sistema externo), pero el propósito del *ícono de servicio* específicamente es identificar el componente tecnológico, no el perfil del usuario.

- **Opción D — Zonas horarias:** Las zonas horarias no se representan en diagramas de arquitectura. Las regiones y Zonas de Disponibilidad (AZs) sí se pueden representar, pero eso es diferente a "zonas horarias".

**Ejemplo de diagrama de arquitectura para una app con base de datos:**

```
                    ┌─────────────────────────────────────────┐
                    │           AWS Cloud                      │
  [Usuario]         │                                         │
      │             │  [Route 53]──►[CloudFront]              │
      │             │                    │                    │
      └────────────►│             [API Gateway]               │
                    │                    │                    │
                    │             [AWS Lambda]                │
                    │            ╱         ╲                  │
                    │     [DynamoDB]    [Aurora Serverless]   │
                    │                                         │
                    │     [S3]    [CloudWatch]   [IAM]        │
                    └─────────────────────────────────────────┘
```

**¿Por qué son importantes los diagramas?**

- Permiten comunicar la arquitectura a equipos técnicos y no técnicos.
- Facilitan identificar puntos únicos de fallo (single points of failure).
- Son la base para revisiones de seguridad y auditorías.
- Sirven como documentación viva del sistema.
- AWS Well-Architected Tool los usa como punto de partida para evaluar arquitecturas.

**Herramientas para crear diagramas de arquitectura AWS:**
- **draw.io / diagrams.net** — Gratuito, íconos AWS incluidos.
- **AWS Architecture Center** — Diagramas de referencia oficiales de AWS.
- **Lucidchart** — Colaborativo, integración con AWS.
- **Cloudcraft** — Genera diagramas 3D automáticamente desde la cuenta AWS.

---

## Ejercicios 8 y 9
### Replicación Automática e Integración Híbrida

---

## Ejercicio 8
### ¿Qué ventaja ofrece la replicación automática en una base de datos gestionada?

| Opción | Enunciado |
|---|---|
| A) | Duplica los datos para realizar pruebas de rendimiento. |
| **B) ✅** | **Permite la continuidad del servicio ante fallos de un nodo o zona.** |
| C) | Aumenta la complejidad del sistema manualmente. |
| D) | Reduce la capacidad de almacenamiento. |

### ✅ Respuesta correcta: B

**Explicación del taller:**
La replicación automática crea copias de los datos en diferentes zonas, lo que garantiza alta disponibilidad y tolerancia a fallos.

---

### 📚 Concepto ampliado: Replicación automática en AWS

La **replicación automática** es el mecanismo que crea y mantiene copias sincronizadas de los datos en múltiples ubicaciones físicas, sin que el administrador tenga que intervenir. Es la base de la alta disponibilidad (HA) en AWS.

**¿Por qué son incorrectas las otras opciones?**

- **Opción A — Pruebas de rendimiento:** Para pruebas de carga se usan herramientas como AWS Load Testing, JMeter o Locust. La replicación no tiene relación con pruebas de rendimiento.

- **Opción C — Aumenta la complejidad manualmente:** Es todo lo contrario. La replicación automática *reduce* la complejidad operativa: AWS gestiona la sincronización de réplicas, el failover y la detección de fallos sin que el usuario configure nada.

- **Opción D — Reduce el almacenamiento:** La replicación *aumenta* el almacenamiento consumido (hay múltiples copias), pero el costo y la gestión los absorbe AWS. No reduce, sino que garantiza la durabilidad de los datos.

**Tipos de replicación en AWS:**

```
REPLICACIÓN SÍNCRONA (Multi-AZ en RDS)
  Zona A                    Zona B
┌──────────────┐           ┌──────────────┐
│  Primary DB  │──────────►│  Standby DB  │
│  (escribe)   │ confirmado│  (réplica    │
│              │ cuando AZ-B│  exacta)    │
│              │ confirma  │              │
└──────────────┘           └──────────────┘
• Garantiza cero pérdida de datos (RPO = 0)
• Failover automático si Zona A falla

REPLICACIÓN EN CAPA DE ALMACENAMIENTO (Aurora)
  6 copias distribuidas en 3 AZs
  AZ-A    AZ-A    AZ-B    AZ-B    AZ-C    AZ-C
  [C1]    [C2]    [C3]    [C4]    [C5]    [C6]
  ←────────────── escritura distribuida ──────────────►
  • Tolera la pérdida de 2 copias sin afectar escrituras
  • Tolera la pérdida de 3 copias sin afectar lecturas

REPLICACIÓN ASÍNCRONA (Réplicas de Lectura)
  Primary DB ──► Read Replica 1  (puede estar en otra región)
             ──► Read Replica 2
             ──► Read Replica 3
  • Descarga el tráfico de lectura del primary
  • Puede existir un pequeño lag (retraso) entre primary y réplica
```

**Métricas clave de disponibilidad:**

| SLA | Tiempo máximo de inactividad al año |
|---|---|
| 99% | ~87 horas |
| 99.9% | ~8.7 horas |
| 99.99% | ~52 minutos |
| **99.999%** | **~5 minutos** ← DynamoDB Global Tables |

---

## Ejercicio 9
### En un entorno híbrido donde parte de los datos están on-premise y parte en la nube, ¿qué herramienta facilita la integración y el flujo seguro entre ambos entornos?

| Opción | Enunciado |
|---|---|
| A) | DNS público |
| **B) ✅** | **VPN o Direct Connect** |
| C) | CDN |
| D) | API Gateway |

### ✅ Respuesta correcta: B

**Explicación del taller:**
Las conexiones privadas como VPN o AWS Direct Connect permiten establecer canales seguros entre infraestructura local y servicios en la nube, evitando exposición pública.

---

### 📚 Concepto ampliado: Conectividad híbrida en AWS

Un **entorno híbrido** combina infraestructura on-premise (servidores locales del cliente) con servicios en la nube (AWS). La conectividad segura entre ambos es crítica para proteger los datos en tránsito.

**¿Por qué son incorrectas las otras opciones?**

- **Opción A — DNS público:** El DNS resuelve nombres de dominio a direcciones IP. No proporciona cifrado ni conectividad privada. Usar DNS público para conectar la empresa con AWS expondría el tráfico al Internet público.

- **Opción C — CDN (Content Delivery Network):** Una CDN como Amazon CloudFront acerca el contenido estático (imágenes, CSS, videos) a los usuarios finales distribuyéndolo en puntos de presencia globales. No sirve para conectar un datacenter on-premise con AWS de forma privada.

- **Opción D — API Gateway:** Expone APIs HTTP/HTTPS al exterior o a otras aplicaciones. Aunque puede recibir tráfico desde on-premise, no proporciona por sí solo un canal privado y cifrado. El tráfico seguiría pasando por Internet público.

**VPN vs AWS Direct Connect — Diferencias:**

| Característica | AWS Site-to-Site VPN | AWS Direct Connect |
|---|---|---|
| Medio | Internet público (cifrado) | Enlace físico dedicado |
| Latencia | Variable (depende de Internet) | Baja y predecible |
| Ancho de banda | Hasta ~1.25 Gbps | Hasta 100 Gbps |
| Costo | Bajo (horas + datos) | Alto (conexión física) |
| Tiempo de implementación | Horas | Semanas o meses |
| Seguridad | Cifrado IPsec | Sin pasar por Internet |
| Ideal para | Conexiones rápidas, menor tráfico | Alta disponibilidad, gran volumen |

**Diagrama de entorno híbrido:**

```
DATACENTER ON-PREMISE                    AWS CLOUD
┌──────────────────────┐                ┌──────────────────────────┐
│                      │                │                          │
│  Servidores locales  │                │  Amazon RDS              │
│  Aplicaciones legacy │◄──────────────►│  Amazon S3               │
│  BD on-premise       │  VPN o Direct  │  Amazon EC2              │
│                      │  Connect       │  AWS Lambda              │
└──────────────────────┘  (privado,     └──────────────────────────┘
                           cifrado)
```

**Casos de uso de entornos híbridos:**
- Una empresa tiene datos históricos on-premise y procesa los datos nuevos en AWS.
- Una aplicación legacy no puede migrarse y necesita acceder a nuevos microservicios en la nube.
- Regulaciones obligan a mantener ciertos datos en servidores locales, pero el procesamiento se hace en AWS.

---

## Ejercicio 10
### Una empresa desea monitorear automáticamente el rendimiento de sus funciones serverless y recibir alertas ante fallos. ¿Qué combinación de herramientas sería más adecuada?

| Opción | Enunciado |
|---|---|
| **A) ✅** | **Prometheus + Grafana** |
| B) | Excel + CloudWatch Logs |
| C) | CloudTrail + S3 |
| D) | Notepad + Ping Test |

### ✅ Respuesta correcta: A

**Explicación del taller:**
- Prometheus recolecta métricas en tiempo real.
- Grafana las visualiza y permite configurar alertas dinámicas, esenciales para mantener la observabilidad y rendimiento en entornos serverless.

---

### 📚 Concepto ampliado: Monitoreo y observabilidad en entornos serverless

En entornos serverless, el **monitoreo** es especialmente importante porque no hay servidores que "ver". Todo ocurre de forma efímera: una función Lambda vive durante milisegundos. Sin herramientas de observabilidad, es imposible detectar problemas.

**¿Por qué son incorrectas las otras opciones?**

- **Opción B — Excel + CloudWatch Logs:** CloudWatch Logs sí es una herramienta válida de AWS para ver logs, pero Excel no tiene capacidad de monitoreo en tiempo real ni alertas automáticas. Sería un proceso manual e ineficiente.

- **Opción C — CloudTrail + S3:** CloudTrail registra las llamadas a la API de AWS (auditoría de acciones administrativas: quién creó un recurso, quién lo borró). No monitorea el rendimiento de aplicaciones. S3 es almacenamiento de objetos. Ninguno de los dos sirve para alertas de rendimiento en tiempo real.

- **Opción D — Notepad + Ping Test:** Herramientas que claramente no tienen capacidades de monitoreo automático, visualización de métricas ni alertas. Un Ping Test solo verifica si un servidor responde a nivel de red, no el rendimiento de funciones serverless.

**¿Cómo funciona Prometheus + Grafana?**

```
FLUJO DE MONITOREO

[Funciones Lambda]
[DynamoDB]           ──► [Prometheus]        ──► [Grafana]
[Aurora Serverless]       (recolecta métricas)    (visualiza + alertas)
[API Gateway]
       │                        │                      │
  emiten métricas          scraping cada         dashboards en
  (latencia, errores,       15-30 segundos        tiempo real
   invocaciones, etc.)                           + alertas por email,
                                                   Slack, PagerDuty
```

**Métricas clave a monitorear en entornos serverless:**

| Servicio | Métricas importantes |
|---|---|
| **AWS Lambda** | Invocaciones, errores, duración, throttles, concurrencia |
| **DynamoDB** | Latencia de lectura/escritura, capacidad consumida, errores |
| **Aurora Serverless** | ACU utilizadas, conexiones, latencia de consultas |
| **API Gateway** | Solicitudes totales, errores 4xx/5xx, latencia |

**Herramientas de monitoreo en el ecosistema AWS:**

| Herramienta | Para qué sirve |
|---|---|
| **Amazon CloudWatch** | Métricas nativas de servicios AWS, logs, alarmas |
| **AWS X-Ray** | Rastreo distribuido (tracing) de peticiones entre servicios |
| **CloudTrail** | Auditoría de acciones administrativas en AWS |
| **Prometheus** | Recolección de métricas de tiempo real (open source) |
| **Grafana** | Visualización de métricas y configuración de alertas |
| **AWS Managed Grafana** | Grafana como servicio gestionado en AWS |

**Buena práctica para entornos serverless:** Combinar **CloudWatch** (nativo de AWS, métricas automáticas de los servicios) con **Prometheus + Grafana** (mayor flexibilidad, dashboards personalizados, alertas avanzadas) para tener observabilidad completa.

---

## Resumen de Respuestas

| Ejercicio | Tema | Respuesta |
|---|---|---|
| 1 | Ventaja principal de bases de datos gestionadas | **C** — Automatizan actualizaciones, parches y backups |
| 2 | Facturación en entornos serverless | **B** — Se cobra solo por tiempo y cantidad de ejecución |
| 3 | Característica distintiva de BD serverless | **B** — Escala automáticamente según la demanda |
| 4 | Importancia de los backups automatizados | **B** — Garantizan recuperación rápida ante fallos |
| 5 | Elemento que ejecuta funciones ante eventos | **C** — Function-as-a-Service (FaaS) |
| 6 | Servicio para app web sin mantenimiento | **B** — Base de datos gestionada en la nube |
| 7 | Propósito de íconos en diagramas técnicos | **A** — Identificar componentes e interconexiones |
| 8 | Ventaja de la replicación automática | **B** — Continuidad del servicio ante fallos |
| 9 | Herramienta para entorno híbrido seguro | **B** — VPN o Direct Connect |
| 10 | Monitoreo y alertas en entornos serverless | **A** — Prometheus + Grafana |

---

## Mapa conceptual del módulo

```
BASES DE DATOS GESTIONADAS Y SERVERLESS
│
├── BASES DE DATOS GESTIONADAS
│   ├── ¿Qué automatizan? → Backups, parches, réplicas, escalado
│   ├── Ejemplos AWS → RDS, Aurora, DynamoDB
│   └── Ventaja principal → Foco en negocio, no en infraestructura
│
├── MODELO SERVERLESS
│   ├── Facturación → Por ejecución real (no por servidor activo)
│   ├── Escalado → Automático según demanda (sin intervención)
│   ├── FaaS → AWS Lambda ejecuta código ante eventos
│   └── Ejemplos → DynamoDB, Aurora Serverless, Lambda
│
├── ALTA DISPONIBILIDAD Y BACKUPS
│   ├── Replicación automática → Multi-AZ, 6 copias en 3 AZs
│   ├── Failover automático → ~30-60 segundos
│   └── Backups → Automáticos diarios + PITR (hasta 35 días)
│
├── CONECTIVIDAD HÍBRIDA
│   ├── VPN Site-to-Site → Canal cifrado por Internet
│   └── AWS Direct Connect → Enlace físico dedicado, baja latencia
│
├── DIAGRAMAS DE ARQUITECTURA
│   ├── Propósito → Visualizar componentes e interconexiones
│   └── Herramientas → draw.io, Lucidchart, AWS Architecture Center
│
└── MONITOREO Y OBSERVABILIDAD
    ├── Prometheus → Recolección de métricas en tiempo real
    ├── Grafana → Visualización y alertas dinámicas
    └── CloudWatch → Métricas nativas AWS + logs + alarmas
```

---

*Guía de Ejercicios Prácticos — Módulo 6: Bases de datos gestionadas y serverless*
*CYMETRIA – El Futuro es Digital*