# Servicios de Bases de Datos en AWS
> **Módulo 6 | CYMETRIA – El Futuro es Digital**  
> Relacionales, NoSQL y Serverless: configura, administra, escala y asegura tus datos en la nube.

---

## Tabla de Contenidos

1. [¿Por qué usar bases de datos en la nube?](#1-por-qué-usar-bases-de-datos-en-la-nube)
2. [Mapa de servicios de bases de datos en AWS](#2-mapa-de-servicios-de-bases-de-datos-en-aws)
3. [Bases de Datos Relacionales — Amazon RDS](#3-bases-de-datos-relacionales--amazon-rds)
4. [Amazon Aurora — El motor nativo de AWS](#4-amazon-aurora--el-motor-nativo-de-aws)
5. [Bases de Datos NoSQL — Amazon DynamoDB](#5-bases-de-datos-nosql--amazon-dynamodb)
6. [Modelo Serverless en bases de datos](#6-modelo-serverless-en-bases-de-datos)
7. [Otros servicios especializados de AWS](#7-otros-servicios-especializados-de-aws)
8. [Configuración y administración](#8-configuración-y-administración)
9. [Escalabilidad en AWS](#9-escalabilidad-en-aws)
10. [Seguridad en bases de datos AWS](#10-seguridad-en-bases-de-datos-aws)
11. [¿Cómo elegir la base de datos correcta?](#11-cómo-elegir-la-base-de-datos-correcta)
12. [Ejercicios de comprensión](#12-ejercicios-de-comprensión)
13. [Glosario rápido](#13-glosario-rápido)

---

## 1. ¿Por qué usar bases de datos en la nube?

Antes de la nube, manejar una base de datos implicaba comprar servidores físicos, instalar el motor, configurar backups, garantizar alta disponibilidad y tener un equipo dedicado a operar todo eso. Era costoso, lento y frágil.

Con AWS, ese modelo cambia por completo:

| Lo que hacías antes (On-Premise) | Lo que hace AWS por ti |
|---|---|
| Comprar y montar servidores | AWS aprovisiona la infraestructura |
| Instalar y actualizar el motor de BD | AWS gestiona parches y actualizaciones |
| Configurar backups manualmente | Backups automáticos cada día |
| Planear redundancia ante fallos | Alta disponibilidad Multi-AZ incluida |
| Escalar comprando más hardware | Escalado en segundos desde la consola |
| Gestionar cifrado y permisos | Seguridad integrada con IAM y KMS |

> **Resultado clave:** El equipo de desarrollo puede enfocarse en construir la aplicación, no en operar infraestructura.

---

## 2. Mapa de servicios de bases de datos en AWS

AWS ofrece más de 15 servicios de bases de datos especializados. Cada uno está optimizado para un tipo de dato y patrón de acceso diferente.

```
¿Qué tipo de dato necesitas almacenar?
│
├── DATOS RELACIONALES (SQL, tablas, transacciones ACID)
│   ├── Múltiples motores (MySQL, PostgreSQL, Oracle...)  → Amazon RDS
│   └── Máximo rendimiento MySQL/PostgreSQL               → Amazon Aurora
│         └── Con escalado automático de capacidad        → Aurora Serverless v2
│
├── DATOS NO RELACIONALES (NoSQL)
│   ├── Clave-Valor / Documentos, alta escala             → Amazon DynamoDB ⚡ Serverless
│   ├── Documentos JSON (compatible MongoDB)              → Amazon DocumentDB
│   ├── Grafos (relaciones complejas)                     → Amazon Neptune
│   ├── Columnas anchas (compatible Cassandra)            → Amazon Keyspaces
│   └── Series temporales (IoT, métricas)                 → Amazon Timestream ⚡ Serverless
│
├── CACHÉ / ULTRA BAJA LATENCIA
│   └── Redis / Valkey / Memcached                        → Amazon ElastiCache
│
└── ANALYTICS / BIG DATA
    └── SQL sobre petabytes de datos                      → Amazon Redshift
```

---

## 3. Bases de Datos Relacionales — Amazon RDS

### ¿Qué es Amazon RDS?

**Amazon Relational Database Service (RDS)** es el servicio gestionado de AWS para bases de datos relacionales. Permite ejecutar motores SQL conocidos en la nube sin administrar la infraestructura subyacente.

### Motores disponibles en RDS

| Motor | Descripción | Mejor para |
|---|---|---|
| **MySQL** | El más popular del mundo, open source | Apps web, e-commerce, WordPress |
| **PostgreSQL** | Potente, soporte avanzado ACID, extensible | Apps complejas, analytics, GIS |
| **MariaDB** | Fork de MySQL, licencia más abierta | Alternativa directa a MySQL |
| **SQL Server** | Motor de Microsoft | Apps .NET, ecosistema Microsoft |
| **Oracle** | Alto rendimiento empresarial | ERPs, sistemas bancarios críticos |
| **Db2** | Motor IBM | Migración de sistemas legacy IBM |

### Lo que RDS gestiona automáticamente

```
TÚ SOLO TE OCUPAS DE:          AWS SE OCUPA DE TODO ESTO:
┌─────────────────────┐        ┌──────────────────────────────────┐
│  • Diseño del       │        │  ✅ Aprovisionamiento de hardware │
│    esquema de datos │        │  ✅ Instalación del motor de BD   │
│  • Queries SQL      │        │  ✅ Parches y actualizaciones     │
│  • Lógica de tu     │        │  ✅ Backups automáticos diarios   │
│    aplicación       │        │  ✅ Point-in-Time Recovery (PITR) │
└─────────────────────┘        │  ✅ Monitoreo con CloudWatch      │
                               │  ✅ Alta disponibilidad Multi-AZ  │
                               │  ✅ Failover automático           │
                               │  ✅ Cifrado en reposo y tránsito  │
                               └──────────────────────────────────┘
```

### Alta Disponibilidad con Multi-AZ

La configuración **Multi-AZ** mantiene una réplica sincronizada en otra Zona de Disponibilidad. Si la instancia principal falla, AWS hace el failover automáticamente en ~60 segundos.

```
Región AWS (ej: us-east-1)
│
├── Zona A (us-east-1a)              ├── Zona B (us-east-1b)
│   ┌─────────────────────┐          │   ┌─────────────────────┐
│   │  RDS PRIMARY        │◄─────────►│   │  RDS STANDBY        │
│   │  (Lee y escribe)    │ réplica   │   │  (Solo failover)    │
│   └─────────────────────┘ síncrona  │   └─────────────────────┘
│            │
│     Si Zona A falla...
│            ▼
│      Failover automático ~60 seg
│            ▼
│      Zona B se convierte en PRIMARY
```

> ⚠️ La instancia standby **no sirve tráfico** en condiciones normales. Para distribuir lecturas, se usan las **Réplicas de Lectura**.

### Réplicas de Lectura

Copias asíncronas de la base de datos que solo aceptan lecturas. Útiles para descargar consultas pesadas de la instancia principal.

- RDS: hasta **5 réplicas** de lectura.
- Aurora: hasta **15 réplicas** de lectura con latencia mínima.

---

## 4. Amazon Aurora — El Motor Nativo de AWS

### ¿Qué es Aurora?

**Amazon Aurora** es el motor de base de datos relacional diseñado y construido por AWS desde cero para la nube. Es compatible con MySQL y PostgreSQL, pero con una arquitectura distribuida que lo hace mucho más rápido y resiliente.

### Rendimiento comparado

| Motor | Rendimiento vs estándar |
|---|---|
| MySQL estándar | Referencia base |
| PostgreSQL estándar | Referencia base |
| **Aurora compatible MySQL** | **~5x más rápido** |
| **Aurora compatible PostgreSQL** | **~3x más rápido** |

### Arquitectura de almacenamiento distribuido

Lo que hace único a Aurora es su capa de almacenamiento: los datos se replican automáticamente en **6 copias distribuidas en 3 Zonas de Disponibilidad**. El cómputo y el almacenamiento están separados.

```
┌──────────────────────────────────────────────────────┐
│                   AURORA CLUSTER                     │
│                                                      │
│   ┌──────────────────┐    ┌──────────────────┐       │
│   │  Writer Instance │    │ Reader Instances │       │
│   │ (Escribe y lee)  │    │ (Solo lectura    │       │
│   └────────┬─────────┘    │  hasta x15)      │       │
│            │              └──────────────────┘       │
│            └────────────────────┐                    │
│                                 ▼                    │
│              CAPA DE ALMACENAMIENTO DISTRIBUIDO      │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──┐ │
│   │ AZ-A │ │ AZ-A │ │ AZ-B │ │ AZ-B │ │ AZ-C │ │AZ│ │
│   │Copia1│ │Copia2│ │Copia3│ │Copia4│ │Copia5│ │ 6│ │
│   └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──┘ │
│          ← 6 copias automáticas en 3 zonas →         │
└──────────────────────────────────────────────────────┘
```

### Aurora Global Database

Para empresas con usuarios en múltiples regiones del mundo:

- **1 región primaria** para escrituras.
- Hasta **5 regiones secundarias** de solo lectura.
- Replicación con **latencia menor a 1 segundo** entre regiones.
- Failover entre regiones en **menos de 1 minuto**.

```
us-east-1 (Virginia) — PRIMARY      eu-west-1 (Irlanda) — SECONDARY
┌──────────────────────────┐   ──►  ┌──────────────────────────┐
│ Escrituras + Lecturas    │ <1 seg │ Solo Lecturas             │
└──────────────────────────┘        └──────────────────────────┘
                                           ──►
                                    ap-northeast-1 (Tokio) — SECONDARY
                                    ┌──────────────────────────┐
                                    │ Solo Lecturas             │
                                    └──────────────────────────┘
```

### Aurora Serverless v2

La versión serverless de Aurora escala la capacidad de cómputo automáticamente en incrementos de **0.5 ACU** (Aurora Capacity Unit ≈ 2 GB RAM), sin interrupciones ni tiempo de inactividad.

```
Noche (poco tráfico)    Pico de ventas          Madrugada (sin tráfico)
         │                    │                         │
      2 ACU ────────────►  64 ACU ────────────────►  2 ACU
      (barato)            (automático)              (barato)
```

**Casos de uso de Aurora Serverless:**
- Apps nuevas donde no sabes la demanda futura.
- E-commerce con picos en fechas especiales (Black Friday).
- Entornos de desarrollo y pruebas.
- Apps multi-tenant con patrones de uso irregulares.

---

## 5. Bases de Datos NoSQL — Amazon DynamoDB

### ¿Qué es DynamoDB?

**Amazon DynamoDB** es una base de datos NoSQL, completamente serverless y administrada. Ofrece latencia de **milisegundos de un solo dígito** a cualquier escala, desde 10 usuarios hasta 100 millones. AWS la describe como diseñada específicamente para superar las complejidades operativas y de escalado de las bases de datos relacionales tradicionales.

### SQL vs NoSQL — Diferencia fundamental

| Aspecto | Base de datos SQL (RDS) | Base de datos NoSQL (DynamoDB) |
|---|---|---|
| Estructura | Tablas con esquema fijo | Ítems sin esquema rígido |
| Relaciones | JOINs entre tablas | Datos desnormalizados |
| Escalado | Vertical (más CPU/RAM) | Horizontal (más particiones) |
| Consultas | SQL flexible y complejo | Por clave primaria + índices |
| Transacciones | ACID completo | ACID limitado |
| Ideal para | Datos estructurados, relaciones | Alta escala, baja latencia |

### Modelo de datos de DynamoDB

```
TABLA: Pedidos
┌─────────────┬────────────────────────────────────────────────────────┐
│  PK (clave) │  Atributos (flexibles, cada ítem puede ser diferente)  │
├─────────────┼────────────────────────────────────────────────────────┤
│ order#0001  │ cliente: "Juan", total: 150000, estado: "enviado"      │
│ order#0002  │ cliente: "Ana", items: ["zapatos","bolso"], promo: true │
│ order#0003  │ cliente: "Carlos", total: 55000                        │
└─────────────┴────────────────────────────────────────────────────────┘
   Cada ítem puede tener atributos completamente distintos ✅
```

### Modelos de capacidad

| Modo | Cómo funciona | Cuándo usarlo |
|---|---|---|
| **Bajo Demanda (On-Demand)** | Pagas por cada operación de lectura/escritura | Tráfico nuevo o impredecible |
| **Capacidad Aprovisionada** | Defines RCU y WCU fijos (con auto-scaling opcional) | Tráfico predecible, mayor ahorro |

> **RCU** = Read Capacity Unit (1 lectura consistente de hasta 4 KB/seg)  
> **WCU** = Write Capacity Unit (1 escritura de hasta 1 KB/seg)

### Características clave de DynamoDB

**DynamoDB Accelerator (DAX):**
Caché en memoria que reduce la latencia de milisegundos a **microsegundos**. No requiere cambios en el código de la aplicación.

```
App → [DAX Cache] → respuesta en microsegundos  (cache hit)
App → [DAX Cache] → [DynamoDB] → milisegundos   (cache miss, guarda en caché)
```

**DynamoDB Streams:**
Captura cada cambio en la tabla (INSERT, UPDATE, DELETE) en tiempo real. Se integra directamente con AWS Lambda para arquitecturas event-driven.

```
[Usuario compra] ──► [DynamoDB] ──► [DynamoDB Streams] ──► [Lambda] ──► [Enviar email de confirmación]
```

**Global Tables:**
Replicación multi-región y multi-activa. Todas las regiones pueden leer y escribir. Disponibilidad de hasta **99.999%** (menos de 5 minutos de caída al año).

**TTL (Time to Live):**
Elimina automáticamente ítems pasada una fecha de expiración. Ideal para sesiones de usuario, tokens temporales, caché de datos.

### Índices en DynamoDB

Como DynamoDB solo consulta por clave primaria, los índices secundarios permiten buscar por otros atributos:

| Tipo | Clave de Partición | Clave de Orden | Cuándo se crea |
|---|---|---|---|
| **LSI** (Local Secondary Index) | Misma que la tabla | Diferente | Solo al crear la tabla |
| **GSI** (Global Secondary Index) | Diferente | Diferente | En cualquier momento |

### Capacidad de escala de DynamoDB

DynamoDB puede manejar:
- Más de **10 trillones de solicitudes por día**.
- **Petabytes** de datos almacenados.
- Escalado automático entre particiones sin intervención manual.

---

## 6. Modelo Serverless en bases de datos

### ¿Qué significa "Serverless" en una base de datos?

En el modelo serverless, **no hay servidores que gestionar ni capacidad que aprovisionar**. La base de datos escala automáticamente según la demanda real, y solo se paga por el uso efectivo.

```
MODELO TRADICIONAL (On-Premise)
┌──────────────────────────────────────────────────────┐
│ Tú gestionas: hardware + SO + motor + red + backups  │
│ Pagas: siempre, aunque nadie use la base de datos    │
└──────────────────────────────────────────────────────┘

MODELO GESTIONADO (Amazon RDS)
┌──────────────────────────────────────────────────────┐
│ AWS gestiona: hardware, backups, parches, HA          │
│ Tú defines: tamaño de instancia (ej: db.t3.medium)   │
│ Pagas: por la instancia mientras esté encendida      │
└──────────────────────────────────────────────────────┘

MODELO SERVERLESS (Aurora Serverless, DynamoDB)
┌──────────────────────────────────────────────────────┐
│ AWS gestiona: todo lo anterior + escalado automático │
│ Tú defines: solo tu esquema de datos y consultas     │
│ Pagas: solo por las operaciones que realmente usas   │
└──────────────────────────────────────────────────────┘
```

### Servicios serverless de bases de datos en AWS

| Servicio | Tipo | Qué hace serverless |
|---|---|---|
| **Amazon DynamoDB** | NoSQL clave-valor | Escala automáticamente particiones y capacidad |
| **Aurora Serverless v2** | Relacional MySQL/PostgreSQL | Escala el cómputo de 0.5 a 128 ACU |
| **Amazon Redshift Serverless** | Analytics | Escala el warehouse según las consultas |
| **Amazon Neptune Serverless** | Grafos | Escala el cómputo del grafo automáticamente |
| **Amazon Timestream** | Series temporales | Gestión automática de almacenamiento y cómputo |
| **Amazon Keyspaces** | Columnas anchas | Escala según el tráfico de lectura/escritura |

### ¿Cuándo conviene el modelo serverless?

- Tráfico **variable o impredecible** (picos y valles).
- Aplicaciones **nuevas** donde no conoces la demanda futura.
- Entornos de **desarrollo y pruebas** (puede escalar a cero).
- Apps de **uso intermitente** (reportes mensuales, procesos nocturnos).
- Cuando quieres **cero gestión** de infraestructura de base de datos.

---

## 7. Otros servicios especializados de AWS

### Amazon ElastiCache — Caché en Memoria

Servicio gestionado de caché que reduce la latencia de las consultas a la base de datos principal almacenando los resultados más frecuentes en memoria.

| Motor | Latencia | Características destacadas |
|---|---|---|
| **Redis / Valkey** | Microsegundos | Estructuras de datos avanzadas, persistencia, pub/sub, clustering |
| **Memcached** | Microsegundos | Simple, sin persistencia, fácil de escalar horizontalmente |

**Caso de uso típico:**

```
Sin caché:  App → Base de datos (50ms)  — Lento si hay miles de requests
Con caché:  App → ElastiCache (< 1ms)  — Respuesta instantánea
                    └─ Si no está en caché → Base de datos → guarda en caché
```

### Amazon DocumentDB — Compatible con MongoDB

Base de datos de documentos JSON totalmente gestionada, compatible con las APIs y drivers de MongoDB. Ideal para migrar aplicaciones MongoDB existentes a AWS sin cambiar el código.

- Almacena datos en formato **BSON/JSON**.
- Escala automáticamente el almacenamiento.
- Alta disponibilidad con réplicas en múltiples AZs.

### Amazon Neptune — Base de Datos de Grafos

Base de datos de grafos gestionada para datos con muchas relaciones entre entidades.

```
Modelo relacional (RDS):   Tabla Usuarios + Tabla Amistades + JOINs complejos
Modelo de grafo (Neptune): Nodos (usuarios) + Aristas (relaciones) — consultas naturales
```

**Casos de uso:**
- Redes sociales (quién sigue a quién, amigos de amigos).
- Detección de fraude (cadenas de transacciones sospechosas).
- Motores de recomendación (usuarios similares compraron...).
- Knowledge graphs para IA.

### Amazon Redshift — Data Warehouse

Base de datos analítica (OLAP) para procesar y analizar petabytes de datos históricos con SQL.

| | RDS / Aurora (OLTP) | Redshift (OLAP) |
|---|---|---|
| Diseñado para | Transacciones rápidas | Análisis de grandes volúmenes |
| Consultas típicas | INSERT, UPDATE, SELECT simple | SELECT con GROUP BY, JOINs complejos, agregaciones |
| Volumen de datos | GB a pocos TB | TB a PB |
| Latencia | Milisegundos | Segundos a minutos |
| Ejemplo de uso | App web en producción | Dashboard de ventas de los últimos 5 años |

### Amazon Timestream — Series Temporales

Base de datos especializada para datos que cambian a lo largo del tiempo (timestamp + valor).

- Almacena y analiza **billones de eventos por día**.
- Gestión automática del ciclo de vida: datos recientes en memoria, históricos en almacenamiento magnético.
- Funciones analíticas integradas: interpolación, suavizado, aproximaciones.
- Ideal para: **IoT**, métricas de aplicaciones, datos de sensores, logs de rendimiento.

### Amazon Keyspaces — Compatible con Apache Cassandra

Servicio gestionado compatible con Apache Cassandra para cargas de trabajo de alta escritura y escalabilidad lineal.

- Útil para migrar workloads Cassandra a AWS sin rediseñar la aplicación.
- Latencia de milisegundos de un dígito.
- Escala automáticamente según el tráfico.

---

## 8. Configuración y Administración

### Crear una base de datos en RDS (paso a paso conceptual)

```
1. Consola AWS → Servicio "RDS" → "Create database"

2. Elegir método:
   ├── Standard create  (control total de la configuración)
   └── Easy create      (configuración recomendada automática)

3. Elegir motor:
   MySQL / PostgreSQL / MariaDB / Oracle / SQL Server / Aurora

4. Configurar instancia:
   ├── Tipo de instancia: db.t3.micro (Free Tier) → db.r5.4xlarge (producción)
   ├── Almacenamiento: gp2 / gp3 / io1 (SSD de alto rendimiento)
   └── Habilitar autoscaling de almacenamiento

5. Configurar disponibilidad:
   └── Multi-AZ: Sí/No (recomendado Sí en producción)

6. Configurar conectividad:
   ├── VPC: en cuál red virtual estará
   ├── Subred: privada (recomendado) o pública
   └── Security Group: qué instancias pueden conectarse

7. Configurar autenticación:
   └── Usuario y contraseña del motor de BD

8. Configurar backups:
   ├── Retención: 1-35 días
   └── Ventana de mantenimiento: cuándo aplicar parches
```

### Herramientas de administración

| Herramienta | Para qué sirve |
|---|---|
| **Consola de AWS** | Crear, configurar y monitorear visualmente |
| **AWS CLI** | Administrar desde terminal y scripts |
| **Amazon CloudWatch** | Métricas, alarmas y logs de la base de datos |
| **AWS Performance Insights** | Análisis visual del rendimiento de consultas |
| **AWS DMS** | Migración de bases de datos a AWS |
| **NoSQL Workbench** | Cliente visual para DynamoDB |

### Backups y recuperación

**Backups automáticos (RDS/Aurora):**
- Se crean automáticamente durante la ventana de mantenimiento.
- Retención configurable: hasta **35 días**.
- Permiten **Point-in-Time Recovery (PITR)**: restaurar al estado exacto de cualquier segundo dentro del período de retención.

**Snapshots manuales:**
- Se crean cuando el usuario lo decide.
- Se conservan **indefinidamente** hasta que los elimines.
- Útiles antes de cambios grandes o migraciones.

```
Línea de tiempo de backups:
─────────────────────────────────────────────────────────────►
Día 1        Día 10         Día 25       Día 35 (límite PITR)
  │            │              │               │
[Snapshot]  [Snapshot]    [Snapshot]     [Hoy]
              ↑
   Puedes restaurar a CUALQUIER punto en esta línea
```

---

## 9. Escalabilidad en AWS

AWS ofrece tres estrategias de escalado según el servicio:

### Escalado Vertical (Scale Up / Down)

Aumentar o reducir los recursos de la instancia existente. Se aplica principalmente en **RDS** estándar.

```
db.t3.micro     db.t3.medium    db.r5.2xlarge   db.r5.4xlarge
(2 vCPU, 1GB) → (2 vCPU, 4GB) → (8 vCPU, 64GB) → (16 vCPU, 128GB)
     Más CPU, más RAM, más IOPS → más rendimiento
```

> ⚠️ El escalado vertical requiere un breve reinicio de la instancia.

### Escalado Horizontal (Scale Out)

Agregar instancias adicionales para distribuir la carga. Se implementa con **Réplicas de Lectura**.

```
                ┌──────────────────┐
                │  RDS/Aurora      │ ← Escrituras + Lecturas
                │  PRIMARY         │
                └────────┬─────────┘
                         │ replica asíncrona
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │ Read     │  │ Read     │  │ Read     │
   │ Replica 1│  │ Replica 2│  │ Replica 3│
   └──────────┘  └──────────┘  └──────────┘
        Solo lecturas → distribuye el tráfico
```

### Escalado Automático (Auto Scaling)

El servicio escala automáticamente sin intervención humana. Aplicado en servicios **serverless**.

```
DYNAMODB (Serverless)
Tráfico:    ─────────────╮          ╭─────────
                          ╰──────────╯
Capacidad: Ajuste automático en tiempo real ✅

AURORA SERVERLESS v2
ACU:    2 ──────────────────► 64 ───────────────► 2
                              ↑                   ↑
                        (pico de tráfico)   (tráfico baja)
                        escala en segundos  reduce automático
```

### Comparación de estrategias de escalado

| Estrategia | Servicio | Ventaja | Limitación |
|---|---|---|---|
| Vertical | RDS estándar | Simple, sin cambios en la app | Requiere reinicio, tiene límite máximo |
| Horizontal | RDS + Réplicas | Distribuye lecturas, sin downtime | Solo para lecturas, escrituras siguen en primary |
| Automático | DynamoDB, Aurora Serverless | Sin intervención, escala instantánea | Costo variable, no para todos los motores |

---

## 10. Seguridad en Bases de Datos AWS

AWS implementa un modelo de seguridad por capas para proteger los datos en todo momento.

### Las capas de seguridad

```
INTERNET
    │
    ▼
[1] VPC — Red virtual privada aislada
    │
    ▼
[2] NACL — Firewall a nivel de subred (stateless)
    │
    ▼
[3] Security Groups — Firewall a nivel de instancia (stateful)
    │
    ▼
[4] Subred PRIVADA — La BD no es accesible desde Internet directamente
    │
    ▼
[5] BASE DE DATOS
    ├── Cifrado en reposo (AWS KMS)
    ├── Cifrado en tránsito (SSL/TLS)
    └── Autenticación IAM o usuario/contraseña del motor
```

### Cifrado de datos

**En reposo:**
- Todos los datos, backups, snapshots y réplicas se cifran automáticamente.
- Usa **AWS KMS (Key Management Service)** para gestionar las claves de cifrado.
- Las claves pueden ser administradas por AWS o por el cliente (Customer Managed Keys).

**En tránsito:**
- Todas las conexiones entre la aplicación y la base de datos viajan cifradas con **SSL/TLS**.
- Nadie puede interceptar los datos mientras se transmiten por la red.

### Control de acceso con IAM

**IAM (Identity and Access Management)** controla quién puede *administrar* los recursos de base de datos en AWS:

```
IAM Policy ejemplo:
{
  "Effect": "Allow",
  "Action": [
    "rds:DescribeDBInstances",   ← Ver instancias
    "rds:CreateDBSnapshot"       ← Crear snapshots
  ],
  "Resource": "arn:aws:rds:us-east-1:123456:db:mi-base"
}
```

> ⚠️ IAM controla el plano de **administración** (crear, borrar, modificar la BD). Los permisos dentro de la BD (SELECT, INSERT, UPDATE) los controla el motor de base de datos directamente.

### Aislamiento de red

- Las bases de datos se despliegan **dentro de una VPC** en **subredes privadas**.
- Solo las instancias EC2 o servicios autorizados en el mismo Security Group pueden conectarse.
- Nunca se expone la base de datos directamente a Internet.

**RDS Proxy:**
Servicio que actúa como intermediario entre la aplicación y la base de datos:
- Reduce el número de conexiones abiertas (evita que la BD se sature).
- Hace el failover transparente para la aplicación (reduce el tiempo de corte a segundos).
- Fuerza el uso de IAM para autenticación.

### Cumplimiento normativo

Las bases de datos de AWS cumplen con las principales certificaciones internacionales:

| Certificación | Descripción |
|---|---|
| **SOC 1/2/3** | Controles de seguridad y operaciones |
| **PCI DSS** | Procesamiento de pagos con tarjeta |
| **ISO 27001** | Gestión de seguridad de la información |
| **HIPAA** | Datos médicos (salud) en EE. UU. |
| **GDPR** | Protección de datos en la Unión Europea |

---

## 11. ¿Cómo elegir la base de datos correcta?

### Preguntas clave para decidir

**1. ¿Mis datos son relacionales (tienen tablas con relaciones entre sí)?**
- Sí → RDS o Aurora
- No → DynamoDB, DocumentDB u otro NoSQL

**2. ¿Cuánto tráfico tendré y es predecible?**
- Predecible y constante → RDS o Aurora aprovisionado
- Variable o desconocido → Aurora Serverless o DynamoDB On-Demand

**3. ¿Qué tan importante es la latencia?**
- Milisegundos son aceptables → RDS/Aurora/DynamoDB
- Necesito microsegundos → ElastiCache (DAX para DynamoDB)

**4. ¿A qué escala operaré?**
- Pocos GB, carga moderada → RDS estándar
- Alta concurrencia, escala global → Aurora o DynamoDB

**5. ¿Qué tipo de datos almaceno?**
- Tablas relacionadas → RDS/Aurora
- Documentos JSON → DocumentDB
- Datos muy conectados → Neptune
- Series temporales/IoT → Timestream
- Analytics sobre millones de registros → Redshift

### Tabla de decisión rápida

| Necesidad | Servicio recomendado |
|---|---|
| App web con MySQL/PostgreSQL | Amazon RDS |
| Alto rendimiento, misión crítica | Amazon Aurora |
| Cargas variables, sin gestión | Aurora Serverless v2 |
| Millones de usuarios, baja latencia | Amazon DynamoDB |
| Migrar MongoDB a AWS | Amazon DocumentDB |
| Redes sociales, detección fraude | Amazon Neptune |
| IoT, datos de sensores | Amazon Timestream |
| Business Intelligence, reportes | Amazon Redshift |
| Acelerar cualquier BD (caché) | Amazon ElastiCache |

---

## 12. Ejercicios de Comprensión

### Ejercicio 1
Una startup lanza una app de delivery de comida. Necesita guardar usuarios, restaurantes, pedidos y calificaciones. El tráfico es impredecible (más uso los fines de semana). ¿Qué servicio de base de datos usarías?

<details>
<summary>Ver respuesta</summary>

**Aurora Serverless v2** para los datos relacionales (usuarios, pedidos, restaurantes) que requieren transacciones ACID, junto con escalado automático para los picos de fin de semana sin sobreaprovisionamiento.

Opcionalmente, **DynamoDB** para las sesiones de usuario activas y el historial de pedidos recientes con alta concurrencia.

</details>

---

### Ejercicio 2
Un banco necesita migrar su base de datos Oracle a AWS. El sistema es crítico, no puede tener más de 60 segundos de inactividad ante un fallo, y los datos deben estar cifrados. ¿Qué configuración usarías?

<details>
<summary>Ver respuesta</summary>

- **Amazon RDS para Oracle** con configuración **Multi-AZ** (failover automático en ~60 segundos).
- **Cifrado habilitado con AWS KMS**.
- Base de datos en **subred privada** dentro de una VPC.
- **Backups automáticos** con retención de 35 días y snapshots manuales antes de cambios.
- **RDS Proxy** para manejar conexiones y hacer el failover transparente.

</details>

---

### Ejercicio 3
Una plataforma de videojuegos necesita guardar el estado de partida de 50 millones de jugadores simultáneos con respuestas en menos de 5 milisegundos. ¿Qué servicio es el adecuado?

<details>
<summary>Ver respuesta</summary>

**Amazon DynamoDB** en modo **On-Demand** es la solución ideal. Está diseñado para millones de solicitudes simultáneas con latencia de un solo dígito en milisegundos a cualquier escala. Para las tablas de líderes globales, se puede agregar **DynamoDB Accelerator (DAX)** para reducir la latencia a microsegundos.

</details>

---

### Ejercicio 4
¿Cuál es la diferencia principal entre una base de datos con Multi-AZ y una con Réplicas de Lectura?

<details>
<summary>Ver respuesta</summary>

- **Multi-AZ:** Es para **alta disponibilidad**. La réplica standby no sirve tráfico en condiciones normales. Solo entra en acción si la instancia principal falla (failover automático). La replicación es **síncrona**.

- **Réplicas de Lectura:** Son para **escalado de rendimiento**. Sirven tráfico de lectura activamente, distribuyendo la carga. La replicación es **asíncrona**. No sirven para failover automático.

</details>

---

## 13. Glosario Rápido

| Término | Definición |
|---|---|
| **RDS** | Amazon Relational Database Service. BD relacional gestionada con múltiples motores. |
| **Aurora** | Motor relacional nativo de AWS. Compatible MySQL/PostgreSQL. 5x-3x más rápido. |
| **Aurora Serverless v2** | Aurora con escalado automático de capacidad en incrementos de 0.5 ACU. |
| **DynamoDB** | BD NoSQL serverless y gestionada. Latencia de milisegundos a cualquier escala. |
| **DAX** | DynamoDB Accelerator. Caché en memoria. Reduce latencia a microsegundos. |
| **DynamoDB Streams** | Captura cambios en tiempo real (INSERT/UPDATE/DELETE) para eventos. |
| **Global Tables** | Replicación multi-región y multi-activa de DynamoDB. SLA 99.999%. |
| **Multi-AZ** | Réplica síncrona en otra AZ para alta disponibilidad y failover automático. |
| **Réplica de Lectura** | Copia asíncrona para distribuir tráfico de solo lectura. |
| **PITR** | Point-In-Time Recovery. Restaurar la BD a cualquier segundo del pasado. |
| **ACU** | Aurora Capacity Unit. ~2 GB RAM + CPU proporcional. Unidad de Aurora Serverless. |
| **RCU / WCU** | Read / Write Capacity Units. Unidades de capacidad de DynamoDB. |
| **GSI / LSI** | Índices secundarios de DynamoDB para consultas por atributos no primarios. |
| **TTL** | Time to Live. Expiración automática de ítems en DynamoDB. |
| **KMS** | Key Management Service. Gestión de claves de cifrado en AWS. |
| **RDS Proxy** | Intermediario entre app y RDS. Reduce conexiones y mejora el failover. |
| **ElastiCache** | Caché en memoria gestionada (Redis/Valkey/Memcached). Latencia microsegundos. |
| **Neptune** | BD de grafos gestionada. Para datos con muchas relaciones entre entidades. |
| **Redshift** | Data Warehouse gestionado. SQL sobre petabytes para analytics. |
| **Timestream** | BD de series temporales. Para IoT, métricas, datos con timestamp. |
| **DocumentDB** | BD de documentos JSON gestionada. Compatible con MongoDB. |
| **Keyspaces** | BD de columnas anchas gestionada. Compatible con Apache Cassandra. |
| **ACID** | Atomicidad, Consistencia, Aislamiento, Durabilidad. Propiedades de transacciones fiables. |
| **Failover** | Conmutación automática a la instancia de respaldo cuando la principal falla. |
| **SLA** | Service Level Agreement. Garantía de disponibilidad del servicio (ej: 99.999%). |

---

*Documento generado para el módulo "Servicios de Bases de Datos" | CYMETRIA – El Futuro es Digital*