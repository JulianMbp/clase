# Bases de Datos Gestionadas y Serverless en AWS
> **Módulo 6 | CYMETRIA – El Futuro es Digital**
> Aprende cómo las bases de datos administradas y serverless simplifican la gestión, escala, disponibilidad y seguridad de tus datos en la nube.

---

## 📌 Tabla de Contenidos

1. [¿Qué es una Base de Datos Gestionada?](#1-qué-es-una-base-de-datos-gestionada)
2. [On-Premise vs Base de Datos Gestionada en la Nube](#2-on-premise-vs-base-de-datos-gestionada-en-la-nube)
3. [¿Qué es una Base de Datos Serverless?](#3-qué-es-una-base-de-datos-serverless)
4. [Amazon RDS — Bases de Datos Relacionales Gestionadas](#4-amazon-rds--bases-de-datos-relacionales-gestionadas)
5. [Amazon Aurora — El Motor Nativo de AWS](#5-amazon-aurora--el-motor-nativo-de-aws)
6. [Amazon Aurora Serverless — Escalado Automático Sin Gestión](#6-amazon-aurora-serverless--escalado-automático-sin-gestión)
7. [Amazon DynamoDB — NoSQL Serverless a Cualquier Escala](#7-amazon-dynamodb--nosql-serverless-a-cualquier-escala)
8. [Otros Servicios de Bases de Datos en AWS](#8-otros-servicios-de-bases-de-datos-en-aws)
9. [Los 4 Pilares: Gestión, Escalabilidad, Disponibilidad y Seguridad](#9-los-4-pilares-gestión-escalabilidad-disponibilidad-y-seguridad)
10. [¿Cómo Elegir la Base de Datos Correcta?](#10-cómo-elegir-la-base-de-datos-correcta)
11. [Casos de Uso Reales](#11-casos-de-uso-reales)
12. [Glosario](#12-glosario)

---

## 1. ¿Qué es una Base de Datos Gestionada?

### Definición

Una **base de datos gestionada (managed database)** es un servicio en la nube donde el proveedor (en este caso AWS) se encarga de todas las tareas operativas de infraestructura, permitiendo que los desarrolladores se concentren exclusivamente en trabajar con los datos y construir aplicaciones.

### ¿Qué tareas asume AWS por ti?

Cuando usas una base de datos gestionada, AWS se responsabiliza de:

| Tarea | Sin gestionar (On-Premise) | Con Base de Datos Gestionada (AWS) |
|---|---|---|
| Aprovisionamiento de hardware | 👨‍💻 Tú | ✅ AWS |
| Instalación del motor de BD | 👨‍💻 Tú | ✅ AWS |
| Actualizaciones y parches | 👨‍💻 Tú | ✅ AWS |
| Copias de seguridad (backups) | 👨‍💻 Tú | ✅ AWS |
| Recuperación ante fallos | 👨‍💻 Tú | ✅ AWS |
| Monitoreo del rendimiento | 👨‍💻 Tú | ✅ AWS |
| Escalado de capacidad | 👨‍💻 Tú | ✅ AWS |
| Alta disponibilidad Multi-AZ | 👨‍💻 Tú | ✅ AWS |
| Cifrado de datos | 👨‍💻 Tú | ✅ AWS |

> 💡 **Resultado:** Los equipos de desarrollo pueden dedicar el 100% de su tiempo a crear funcionalidades de negocio, en lugar de administrar infraestructura.

---

## 2. On-Premise vs Base de Datos Gestionada en la Nube

### ¿Qué significa "On-Premise"?

**On-Premise** significa que la empresa tiene sus propios servidores físicos en sus instalaciones, y es responsable de toda la infraestructura: hardware, software, red, seguridad y mantenimiento.

### Comparación detallada:

| Dimensión | On-Premise | Base de Datos Gestionada (AWS) |
|---|---|---|
| **Inversión inicial** | Alta (servidores, licencias, datacenter) | Ninguna — pago por uso |
| **Escalado** | Manual, lento, costoso (comprar más hardware) | Automático, en segundos |
| **Mantenimiento** | Equipo de TI interno dedicado | AWS lo gestiona |
| **Disponibilidad** | Depende de la redundancia que construyas | Hasta 99.999% SLA |
| **Backups** | Configuración manual, riesgo de pérdida | Automáticos, con Point-In-Time Recovery |
| **Seguridad física** | Tú controlas el hardware | AWS gestiona los centros de datos |
| **Acceso global** | Difícil sin infraestructura en múltiples zonas | Multi-región nativo |
| **Costo operativo** | Fijo (pagas aunque no uses los recursos) | Variable — pagas por lo que consumes |
| **Tiempo para desplegar** | Días o semanas | Minutos |

### ¿Cuándo sigue siendo válido el On-Premise?

- Cuando la empresa tiene requisitos regulatorios muy estrictos sobre la ubicación física de los datos.
- Cuando ya se tiene una inversión grande en infraestructura y no hay justificación para migrar.
- Cuando se necesita control total sobre el hardware (sectores militares, gubernamentales, financieros con normativas especiales).

---

## 3. ¿Qué es una Base de Datos Serverless?

### Definición

Una **base de datos serverless** lleva el concepto de base de datos gestionada un paso más allá: **no hay servidores que gestionar ni capacidad que aprovisionar**. La base de datos escala automáticamente según la demanda real, y solo se paga por el uso efectivo.

### Diferencia entre Gestionada y Serverless:

```
BASE DE DATOS TRADICIONAL (On-Premise)
  ├── Tú gestionas: hardware, SO, motor de BD, red, backups, parches
  └── Pagas: siempre, aunque no haya tráfico

BASE DE DATOS GESTIONADA (ej: Amazon RDS)
  ├── AWS gestiona: hardware, SO, backups, parches, HA
  ├── Tú gestionas: capacidad de la instancia (tamaño), configuración del motor
  └── Pagas: por la instancia mientras esté encendida

BASE DE DATOS SERVERLESS (ej: Aurora Serverless, DynamoDB)
  ├── AWS gestiona: todo lo anterior + escalado automático de capacidad
  ├── Tú gestionas: solo tu esquema de datos y las consultas
  └── Pagas: solo por las operaciones y capacidad que realmente consumes
```

### Beneficios clave del modelo Serverless:

- **Escalado instantáneo:** Se adapta a picos de tráfico en fracciones de segundo.
- **Sin gestión de infraestructura:** No hay instancias que encender, apagar ni redimensionar.
- **Costo optimizado:** Pagas solo por lo que usas — ideal para cargas de trabajo variables o intermitentes.
- **Sin planificación de capacidad:** No necesitas predecir el tamaño del servidor.
- **Sin ventanas de mantenimiento:** Las actualizaciones no generan tiempo de inactividad.

---

## 4. Amazon RDS — Bases de Datos Relacionales Gestionadas

### ¿Qué es Amazon RDS?

**Amazon Relational Database Service (RDS)** es el servicio de bases de datos relacionales gestionadas de AWS. Permite ejecutar motores de base de datos conocidos en la nube, sin preocuparse por la infraestructura.

### Motores compatibles:

| Motor | Características | Casos de uso típicos |
|---|---|---|
| **MySQL** | Popular, open source, alta compatibilidad | Aplicaciones web, CMS, e-commerce |
| **PostgreSQL** | Robusto, soporte ACID avanzado, extensible | Aplicaciones con consultas complejas, analytics |
| **MariaDB** | Fork de MySQL, rendimiento mejorado | Alternativa a MySQL con más features |
| **SQL Server** | Motor Microsoft, integración con ecosistema .NET | Aplicaciones empresariales Windows |
| **Oracle** | Alto rendimiento empresarial, licenciamiento especial | Sistemas bancarios, ERP corporativos |
| **Db2** | Motor IBM, para migraciones de sistemas legacy | Sistemas empresariales IBM |

### Funcionalidades que RDS automatiza:

- ✅ **Backups automáticos** con retención configurable (hasta 35 días).
- ✅ **Snapshots manuales** que puedes conservar indefinidamente.
- ✅ **Point-in-Time Recovery (PITR):** Restaura la BD al estado que tenía en cualquier segundo del pasado.
- ✅ **Actualizaciones de parches** aplicadas en ventanas de mantenimiento configuradas.
- ✅ **Monitoreo** integrado con Amazon CloudWatch.
- ✅ **Multi-AZ:** Réplica síncrona en otra zona de disponibilidad para alta disponibilidad.
- ✅ **Réplicas de lectura:** Hasta 5 réplicas para distribuir el tráfico de lectura.

### Alta Disponibilidad con Multi-AZ:

```
Zona A (us-east-1a)          Zona B (us-east-1b)
┌────────────────────┐        ┌────────────────────┐
│  RDS Primary       │◄──────►│  RDS Standby       │
│  (Escrituras y     │ replica │  (Solo failover)   │
│   lecturas)        │ sínc.  │                    │
└────────────────────┘        └────────────────────┘
         │
         │ Si falla la Zona A...
         ▼
   Failover automático
   (~60 segundos)
         │
         ▼
   Zona B asume el rol de Primary
```

> ⚠️ **Importante:** Con Multi-AZ, la instancia standby **no sirve tráfico** en condiciones normales — solo se activa en caso de fallo. Para distribuir lecturas, se usan las **Réplicas de Lectura**.

### Casos de uso ideales para RDS:

- Aplicaciones con tráfico predecible y constante.
- Sistemas que ya usan MySQL, PostgreSQL u otros motores estándar.
- Aplicaciones empresariales con requisitos de transacciones ACID.
- Migraciones de bases de datos on-premise a la nube con mínimo cambio de código.

---

## 5. Amazon Aurora — El Motor Nativo de AWS

### ¿Qué es Amazon Aurora?

**Amazon Aurora** es el motor de base de datos relacional diseñado y construido nativamente por AWS para la nube. Es compatible con MySQL y PostgreSQL, pero con una arquitectura distribuida de alto rendimiento que supera significativamente a las versiones estándar.

### Ventajas de rendimiento:

- **5x más rápido que MySQL estándar.**
- **3x más rápido que PostgreSQL estándar.**
- Almacenamiento escalable automáticamente hasta **128 TB** sin tiempo de inactividad.
- Hasta **15 réplicas de lectura** con latencia mínima.

### Arquitectura distribuida de Aurora:

```
┌─────────────────────────────────────────────────┐
│              AURORA CLUSTER                      │
│                                                  │
│  Writer Instance          Reader Instances       │
│  (Escritura + Lectura)    (Solo lectura x15 max) │
│         │                       │               │
│         └───────────────────────┘               │
│                       │                         │
│              Storage Layer (Distribuido)         │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ AZ-A │ │ AZ-A │ │ AZ-B │ │ AZ-B │ │ AZ-C │  │ ← 6 copias en 3 AZs
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
└─────────────────────────────────────────────────┘
```

> 🔒 Aurora almacena **6 copias** de los datos distribuidas en **3 zonas de disponibilidad**, garantizando durabilidad máxima.

### Aurora Global Database:

Para empresas que operan a nivel mundial, Aurora ofrece **bases de datos globales**:

- **1 región primaria** para escritura.
- Hasta **5 regiones secundarias** de solo lectura.
- Replicación con **latencia inferior a 1 segundo** entre regiones.
- Conmutación por error entre regiones en **menos de 1 minuto**.

```
Región Principal (us-east-1)     Región Secundaria (eu-west-1)
┌─────────────────────────┐      ┌─────────────────────────┐
│  Aurora Primary Cluster  │─────►│  Aurora Read Replica    │
│  (Escritura + Lectura)  │<1seg │  (Solo Lectura)         │
└─────────────────────────┘      └─────────────────────────┘
                                        │
                              Región Secundaria (ap-northeast-1)
                              ┌─────────────────────────┐
                              │  Aurora Read Replica    │
                              │  (Solo Lectura)         │
                              └─────────────────────────┘
```

### ¿Cuándo elegir Aurora sobre RDS estándar?

- Cuando necesitas el máximo rendimiento en MySQL o PostgreSQL.
- Aplicaciones de misión crítica con muy alta disponibilidad.
- Cargas de trabajo que requieren muchas lecturas (puedes agregar hasta 15 réplicas).
- Proyectos globales que necesitan replicación multi-región.

---

## 6. Amazon Aurora Serverless — Escalado Automático Sin Gestión

### ¿Qué es Aurora Serverless?

**Aurora Serverless** es una configuración de Amazon Aurora donde **la capacidad de cómputo se escala automáticamente** según la demanda, sin que el desarrollador tenga que gestionar el tamaño de la instancia.

### Versiones disponibles:

| Versión | Características | Estado actual |
|---|---|---|
| **Aurora Serverless v1** | Escala en múltiplos de la ACU (duplica o reduce a la mitad) | Legado — en proceso de migración |
| **Aurora Serverless v2** | Escala en incrementos de 0.5 ACU, más granular y rápido | ✅ Recomendada (2024-2025) |

> 📐 **ACU (Aurora Capacity Unit):** Unidad de medida de capacidad de Aurora. Cada ACU corresponde aproximadamente a 2 GB de RAM con CPU y red proporcionales.

### ¿Cómo escala Aurora Serverless v2?

```
Carga baja (noche)         Pico de tráfico (tarde)       Carga baja (madrugada)
      │                           │                              │
   2 ACU ──────────────────► 64 ACU ──────────────────────► 2 ACU
      │                           │                              │
  (Poca capacidad)          (Alta capacidad)             (Poca capacidad)
  (Poca facturación)        (Mayor facturación)          (Poca facturación)
```

**El escalado se produce en fracciones de segundo**, incluso mientras hay transacciones SQL abiertas o bloqueos de tabla, sin interrumpir el servicio.

### Casos de uso ideales para Aurora Serverless:

- **Cargas de trabajo impredecibles:** Un e-commerce con picos en Black Friday.
- **Aplicaciones nuevas:** Cuando no sabes qué capacidad necesitarás.
- **Entornos de desarrollo/pruebas:** Escala a cero cuando no se usa, reduciendo costos.
- **Aplicaciones de múltiples tenants (multi-tenant):** Muchos clientes con patrones de uso distintos.
- **Aplicaciones con tráfico intermitente:** Un sistema de reportes que se usa solo en ciertos momentos.

### Ahorro de costos con Aurora Serverless:

- Puede generar hasta **90% de ahorro** comparado con aprovisionar capacidad para el pico máximo.
- Una empresa reportó un **40% de reducción en costos** y **50% menos trabajo operativo** al migrar a Aurora Serverless v2.

---

## 7. Amazon DynamoDB — NoSQL Serverless a Cualquier Escala

### ¿Qué es DynamoDB?

**Amazon DynamoDB** es una base de datos NoSQL, completamente serverless y administrada, que ofrece latencia de **milisegundos de un solo dígito** a cualquier escala. Es uno de los servicios más utilizados en arquitecturas modernas y aplicaciones de alta demanda.

### Modelo de datos de DynamoDB:

DynamoDB no usa tablas relacionales con esquemas fijos. En cambio, usa un modelo **clave-valor y documentos**:

```
TABLA: Usuarios
┌──────────────┬─────────────────────────────────────────────┐
│  Clave (PK)  │  Atributos (flexibles, sin esquema fijo)    │
├──────────────┼─────────────────────────────────────────────┤
│  user#001    │  nombre: "Juan", edad: 28, ciudad: "Bogotá" │
│  user#002    │  nombre: "Ana", email: "ana@mail.com"       │
│  user#003    │  nombre: "Carlos", rol: "admin", activo: true│
└──────────────┴─────────────────────────────────────────────┘
```

> 🔑 Cada ítem puede tener **atributos completamente diferentes** — no hay esquema rígido.

### Componentes principales de DynamoDB:

| Componente | Equivalente SQL | Descripción |
|---|---|---|
| **Tabla** | Tabla | Contenedor de ítems |
| **Ítem** | Fila | Conjunto de atributos |
| **Atributo** | Columna | Dato individual |
| **Clave de Partición** | Clave primaria | Identifica el ítem de forma única |
| **Clave de Ordenación** | Índice | Permite ordenar ítems con la misma partición |

### Escalabilidad casi ilimitada:

DynamoDB puede manejar:
- Más de **10 trillones de solicitudes por día**.
- Petabytes de datos almacenados.
- Millones de solicitudes por segundo.

Todo esto sin que el desarrollador configure nada adicional — AWS distribuye automáticamente los datos en particiones.

### Modelos de capacidad:

| Modo | Cómo funciona | Cuándo usarlo |
|---|---|---|
| **Bajo Demanda (On-Demand)** | Pagas por cada solicitud de lectura/escritura | Tráfico impredecible, apps nuevas |
| **Capacidad Aprovisionada** | Defines RCU y WCU (unidades de lectura/escritura) | Tráfico predecible, mayor control de costos |

> 📊 **RCU (Read Capacity Unit):** Una lectura fuertemente consistente de hasta 4 KB por segundo.
> 📊 **WCU (Write Capacity Unit):** Una escritura de hasta 1 KB por segundo.

### Características avanzadas de DynamoDB:

**DynamoDB Accelerator (DAX):**
- Caché en memoria que reduce la latencia de microsegundos.
- **10x más rápido** que DynamoDB estándar.
- Compatible con las APIs de DynamoDB — no requiere cambios de código.

**DynamoDB Streams:**
- Captura todos los cambios (INSERT, UPDATE, DELETE) en tiempo real.
- Se integra con **AWS Lambda** para arquitecturas event-driven.
- Ideal para sincronización de datos y auditoría.

```
[Aplicación] ──► [DynamoDB] ──► [DynamoDB Streams] ──► [Lambda] ──► [Otros servicios]
                               (Captura cambios)      (Procesa)
```

**Global Tables:**
- Replicación multiregional y multi-activa.
- Disponibilidad de hasta **99.999%** (menos de 5 minutos de caída al año).
- Todas las regiones pueden leer y escribir simultáneamente.

**TTL (Time to Live):**
- Elimina automáticamente ítems expirados basándose en un timestamp.
- Útil para sesiones de usuario, caché temporal, logs con expiración.

### Índices secundarios para consultas avanzadas:

Como DynamoDB solo permite consultas por clave primaria, los índices permiten consultar por otros atributos:

| Tipo | Clave de partición | Clave de ordenación | Cuándo crear |
|---|---|---|---|
| **LSI (Local Secondary Index)** | Igual que la tabla | Diferente | Al crear la tabla (obligatorio) |
| **GSI (Global Secondary Index)** | Diferente | Diferente | En cualquier momento |

### Seguridad en DynamoDB:

- **Cifrado en reposo** activado por defecto con AWS KMS.
- **Control de acceso granular** con IAM (puedes restringir el acceso a items específicos).
- **VPC Endpoints** para mantener el tráfico dentro de la red privada de AWS.
- **Point-in-Time Recovery (PITR)** para restaurar la tabla a cualquier segundo en los últimos 35 días.

### Casos de uso de DynamoDB:

- 🛒 **E-commerce:** Carritos de compra, catálogos de productos, gestión de inventario.
- 🎮 **Videojuegos:** Perfiles de jugadores, tablas de líderes, estado de partidas.
- 📱 **Aplicaciones móviles:** Sesiones de usuario, preferencias, notificaciones.
- 🔗 **IoT:** Datos de sensores a gran escala con alta frecuencia.
- 📡 **Streaming:** Metadatos de contenido, historial de visualización.

---

## 8. Otros Servicios de Bases de Datos en AWS

AWS ofrece un ecosistema completo de bases de datos especializadas para diferentes casos de uso:

### Amazon ElastiCache — Caché en Memoria

Un servicio gestionado de caché que reduce la carga de las bases de datos principales.

| Motor | Características | Casos de uso |
|---|---|---|
| **Redis** | Estructuras de datos avanzadas, persistencia, pub/sub | Sesiones, colas, contadores en tiempo real |
| **Valkey** | Fork open source de Redis, alternativa más económica | Mismos casos que Redis |
| **Memcached** | Simple, sin persistencia, alta velocidad | Caché de objetos simples |

### Amazon Redshift — Data Warehouse

Base de datos analítica (OLAP) para procesar petabytes de datos con consultas SQL.

- Ideal para **Business Intelligence** y análisis de grandes volúmenes.
- Integración con herramientas como Tableau, Power BI y Looker.
- **Redshift Serverless** disponible para cargas de trabajo analíticas intermitentes.

### Amazon DocumentDB — Compatible con MongoDB

Servicio gestionado compatible con MongoDB, ideal para migrar aplicaciones existentes.

- Almacena datos en formato JSON.
- Compatible con los drivers y herramientas de MongoDB.

### Amazon Neptune — Base de Datos de Grafos

Servicio gestionado de base de datos de grafos para datos altamente conectados.

- Compatible con **Apache TinkerPop (Gremlin)** y **SPARQL (RDF)**.
- Casos de uso: redes sociales, detección de fraude, recomendaciones, knowledge graphs.

### Amazon Keyspaces — Compatible con Apache Cassandra

Servicio gestionado compatible con Cassandra para cargas de trabajo de alta escritura.

- Escalabilidad lineal.
- Latencia de milisegundos de un dígito.

### Amazon Timestream — Series Temporales

Base de datos especializada para datos de series temporales (tiempo + valor).

- Ideal para datos de **IoT, métricas de aplicaciones, monitoreo**.
- Almacena y consulta trillones de eventos por día.

### Resumen visual del ecosistema:

```
¿Qué tipo de datos necesitas almacenar?

├── Datos relacionales (SQL, transacciones ACID)
│   ├── Múltiples motores → Amazon RDS
│   └── Máximo rendimiento MySQL/PostgreSQL → Amazon Aurora
│       └── Con escalado automático → Aurora Serverless
│
├── Datos no estructurados / alta escala
│   ├── Clave-Valor / Documentos → Amazon DynamoDB (Serverless)
│   └── Documentos JSON (MongoDB) → Amazon DocumentDB
│
├── Caché / Baja latencia extrema
│   └── Redis / Valkey / Memcached → Amazon ElastiCache
│
├── Analytics / Big Data
│   └── SQL sobre petabytes → Amazon Redshift
│
├── Datos conectados / Relaciones complejas
│   └── Grafos → Amazon Neptune
│
├── Alta escritura / Cassandra
│   └── Amazon Keyspaces
│
└── Datos temporales / IoT / Métricas
    └── Amazon Timestream
```

---

## 9. Los 4 Pilares: Gestión, Escalabilidad, Disponibilidad y Seguridad

### 🔧 Pilar 1: Gestión Simplificada

Las bases de datos gestionadas eliminan las tareas operativas más complejas:

- No hay que instalar ni actualizar el motor de base de datos.
- Los parches de seguridad se aplican automáticamente.
- Los backups se crean y gestionan sin intervención humana.
- La monitorización y las alertas están preconfiguradas con CloudWatch.

> **Impacto real:** Los equipos de desarrollo pueden dedicar el 100% de su tiempo a construir valor para el negocio en lugar de operar infraestructura.

### 📈 Pilar 2: Escalabilidad

AWS ofrece dos tipos de escalado:

**Escalado Vertical (Scale Up):**
Aumentar la capacidad de una instancia existente (más CPU, RAM).

```
db.t3.micro (2 vCPU, 1 GB RAM)
        ↓ (unos clics en la consola)
db.r5.4xlarge (16 vCPU, 128 GB RAM)
```

**Escalado Horizontal (Scale Out):**
Agregar más instancias para distribuir la carga.

```
[Base de Datos Principal]
        ├── [Réplica de Lectura 1]
        ├── [Réplica de Lectura 2]
        └── [Réplica de Lectura 3]
```

**Escalado Serverless (Scale Automatically):**
La base de datos ajusta su capacidad automáticamente según el tráfico real.

```
Tráfico bajo  ──► Capacidad mínima (barato)
Pico de tráfico ──► Capacidad máxima (automático, en segundos)
Tráfico bajo  ──► Vuelve a capacidad mínima (ahorro automático)
```

### 🔄 Pilar 3: Alta Disponibilidad

AWS construye la alta disponibilidad directamente en sus servicios de base de datos:

| Característica | Descripción | Tiempo de recuperación |
|---|---|---|
| **Multi-AZ (RDS)** | Réplica síncrona en otra zona de disponibilidad | ~60 segundos (failover automático) |
| **Aurora Multi-AZ** | 6 copias en 3 AZs en la capa de almacenamiento | ~30 segundos (failover automático) |
| **DynamoDB Global Tables** | Multi-región y multi-activo | Sin interrupción (99.999% SLA) |
| **Backups automáticos** | Snapshots diarios + logs de transacciones | Restauración PITR a cualquier segundo |

### 🔒 Pilar 4: Seguridad

AWS implementa múltiples capas de seguridad en todas las bases de datos gestionadas:

**Cifrado:**
- **En reposo:** Todos los datos se cifran con AWS KMS (Key Management Service).
- **En tránsito:** Conexiones SSL/TLS para proteger los datos mientras viajan por la red.

**Aislamiento de red:**
- Las bases de datos se despliegan dentro de una **VPC privada**.
- Se configuran en **subredes privadas** (sin acceso directo desde Internet).
- Los **Security Groups** controlan qué instancias pueden conectarse.

**Control de acceso:**
- **IAM** gestiona quién puede administrar los recursos de base de datos.
- Los motores usan sus propios sistemas de usuarios y permisos.
- **RDS Proxy** reduce el número de conexiones abiertas y mejora la seguridad.

**Auditoría y cumplimiento:**
- AWS cumple con certificaciones: **SOC 1/2/3, PCI DSS, ISO 27001, HIPAA, GDPR**.
- Los logs de auditoría se envían a **CloudWatch** y **CloudTrail**.

```
CAPAS DE SEGURIDAD EN UNA BASE DE DATOS AWS

Internet
    │
[Internet Gateway]
    │
[NACL - Nivel Subred]
    │
[Security Group - Nivel Instancia/BD]
    │
[VPC - Subred Privada]
    │
[Base de Datos] ← Cifrado en reposo (KMS)
    │              Cifrado en tránsito (SSL/TLS)
[AWS KMS]          IAM para acceso administrativo
```

---

## 10. ¿Cómo Elegir la Base de Datos Correcta?

### Árbol de decisión:

```
¿Necesitas transacciones ACID con SQL?
├── SÍ → ¿Tráfico predecible o necesitas múltiples motores?
│         ├── Predecible / múltiples motores → Amazon RDS
│         └── Máximo rendimiento MySQL/PostgreSQL → Amazon Aurora
│               └── ¿Tráfico variable/impredecible? → Aurora Serverless
│
└── NO → ¿Qué tipo de datos manejas?
          ├── Clave-valor / documentos a gran escala → Amazon DynamoDB
          ├── Documentos JSON (compatible MongoDB) → Amazon DocumentDB
          ├── Grafos → Amazon Neptune
          ├── Series temporales → Amazon Timestream
          ├── Analytics / Big Data → Amazon Redshift
          └── Caché → Amazon ElastiCache
```

### Comparación de los servicios principales:

| Característica | RDS | Aurora | Aurora Serverless | DynamoDB |
|---|---|---|---|---|
| Tipo | Relacional | Relacional | Relacional | NoSQL |
| SQL | ✅ Sí | ✅ Sí | ✅ Sí | ❌ No (PartiQL limitado) |
| Escalado automático | ⚠️ Manual | ⚠️ Manual | ✅ Automático | ✅ Automático |
| Serverless | ❌ No | ❌ No | ✅ Sí | ✅ Sí |
| Pago por uso exacto | ❌ No | ❌ No | ✅ Sí | ✅ Sí (on-demand) |
| Latencia | Milisegundos | Milisegundos | Milisegundos | Milisegundos de 1 dígito |
| Alta disponibilidad | ✅ Multi-AZ | ✅ 6 copias, 3 AZs | ✅ Igual que Aurora | ✅ 99.999% |
| Multi-región | ⚠️ Limitado | ✅ Global Database | ✅ Global Database | ✅ Global Tables |
| Transacciones ACID | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí (limitado) |
| Ideal para | Apps SQL conocidas | Alto rendimiento SQL | Carga variable | Escala masiva NoSQL |

---

## 11. Casos de Uso Reales

### Caso 1: Startup de E-Commerce

**Situación:** Una startup lanza un e-commerce pero no sabe cuánto tráfico tendrá. Espera picos en fechas especiales.

**Solución:**
- **Aurora Serverless v2** para el catálogo de productos y órdenes (SQL).
- **DynamoDB** para el carrito de compras y sesiones de usuario (alta velocidad, escala masiva).
- **ElastiCache (Redis)** para cachear productos más visitados.

**Por qué:** Aurora Serverless escala automáticamente durante los picos (Black Friday, Navidad) sin sobreaprovisionamiento. DynamoDB maneja millones de sesiones simultáneas con latencia mínima.

---

### Caso 2: Plataforma de Streaming (como Netflix o Spotify)

**Situación:** Plataforma que necesita gestionar metadatos de millones de contenidos y el historial de visualización de usuarios en todo el mundo.

**Solución:**
- **Aurora Global Database** para datos transaccionales con replicación global.
- **DynamoDB Global Tables** para el historial de visualización y perfiles de usuario.
- **Amazon Redshift** para análisis de datos de uso y recomendaciones.

**Por qué:** La replicación con menos de 1 segundo de latencia garantiza que los usuarios en cualquier parte del mundo vean información consistente.

---

### Caso 3: Sistema Empresarial de Recursos Humanos (ERP)

**Situación:** Una corporación con miles de empleados necesita migrar su sistema de RR. HH. a la nube. El sistema usa SQL Server con datos sensibles.

**Solución:**
- **Amazon RDS para SQL Server** con Multi-AZ habilitado.
- Instancias en **VPC privada** con acceso solo desde la red corporativa vía **Direct Connect**.
- **Cifrado KMS** y **backups automáticos** con retención de 30 días.

**Por qué:** RDS permite usar SQL Server sin cambiar el código de la aplicación, con alta disponibilidad y seguridad enterprise.

---

### Caso 4: Aplicación IoT Industrial

**Situación:** Una fábrica genera datos de sensores cada segundo, con millones de lecturas diarias.

**Solución:**
- **Amazon Timestream** para almacenar y consultar los datos de series temporales.
- **DynamoDB** para el estado actual de cada sensor en tiempo real.
- **Lambda + DynamoDB Streams** para disparar alertas cuando un sensor sale del rango normal.

**Por qué:** Timestream está optimizado para consultar datos con timestamps. DynamoDB maneja las escrituras de alta frecuencia con baja latencia.

---

## 12. Glosario

| Término | Definición |
|---|---|
| **Base de Datos Gestionada** | Servicio donde el proveedor cloud gestiona la infraestructura de la BD. |
| **Serverless** | Modelo donde no hay servidores que gestionar; el servicio escala automáticamente. |
| **RDS** | Amazon Relational Database Service. BD relacional gestionada. |
| **Aurora** | Motor de BD relacional nativo de AWS, compatible con MySQL/PostgreSQL. |
| **Aurora Serverless v2** | Versión de Aurora que escala automáticamente en incrementos de 0.5 ACU. |
| **DynamoDB** | BD NoSQL serverless y gestionada de AWS. Latencia de milisegundos a cualquier escala. |
| **ACU** | Aurora Capacity Unit. Unidad de capacidad de Aurora (~2 GB RAM + CPU). |
| **Multi-AZ** | Configuración con réplica en otra zona de disponibilidad para alta disponibilidad. |
| **Failover** | Proceso automático de conmutación a la instancia de respaldo cuando la principal falla. |
| **PITR** | Point-In-Time Recovery. Restaurar la BD a un momento específico del pasado. |
| **RCU / WCU** | Read/Write Capacity Units. Unidades de capacidad de lectura/escritura en DynamoDB. |
| **DAX** | DynamoDB Accelerator. Caché en memoria para DynamoDB. Latencia de microsegundos. |
| **TTL** | Time to Live. Eliminar automáticamente ítems expirados en DynamoDB. |
| **DynamoDB Streams** | Captura de cambios en tiempo real en DynamoDB (INSERT, UPDATE, DELETE). |
| **Global Tables** | Replicación multi-región y multi-activa de DynamoDB. |
| **GSI / LSI** | Global/Local Secondary Index. Índices adicionales en DynamoDB para consultas. |
| **ACID** | Atomicidad, Consistencia, Aislamiento, Durabilidad. Propiedades de transacciones fiables. |
| **KMS** | AWS Key Management Service. Gestión de claves de cifrado. |
| **On-Premise** | Infraestructura alojada en los servidores físicos propios de la empresa. |
| **Réplica de Lectura** | Copia de la BD que solo acepta lecturas, para distribuir la carga. |
| **ElastiCache** | Servicio gestionado de caché en memoria (Redis/Memcached). |
| **Redshift** | Data Warehouse gestionado de AWS para analytics sobre grandes volúmenes. |
| **SLA** | Service Level Agreement. Acuerdo de nivel de servicio (ej: 99.999% de disponibilidad). |

---

*Documento generado con base en los conceptos del módulo "Bases de Datos Gestionadas y Serverless" | CYMETRIA, El Futuro es Digital.*