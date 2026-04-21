# Módulo 5: Redes Virtuales en AWS
> **Guía de Estudio — Taller Práctico** | CYMETRIA – El Futuro es Digital

---

## 📌 Tabla de Contenidos

1. [Red Virtual Privada (VPC)](#1-red-virtual-privada-vpc)
2. [Subredes: Pública vs Privada](#2-subredes-pública-vs-privada)
3. [Grupos de Seguridad (Security Groups)](#3-grupos-de-seguridad-security-groups)
4. [Tablas de Ruteo](#4-tablas-de-ruteo)
5. [Conectividad Híbrida: VPN y Direct Connect](#5-conectividad-híbrida-vpn-y-direct-connect)
6. [Protección de Datos con Security Groups](#6-protección-de-datos-con-security-groups)
7. [NACL vs Security Group](#7-nacl-vs-security-group)
8. [NAT Gateway](#8-nat-gateway)
9. [Zonas de Disponibilidad y Alta Disponibilidad](#9-zonas-de-disponibilidad-y-alta-disponibilidad)
10. [Balanceo de Carga (Load Balancer)](#10-balanceo-de-carga-load-balancer)
11. [Resumen Visual de la Arquitectura](#11-resumen-visual-de-la-arquitectura)
12. [Glosario](#12-glosario)

---

## 1. Red Virtual Privada (VPC)

### ¿Qué es una VPC?

Una **VPC (Virtual Private Cloud)** es una red privada virtual dentro de la infraestructura de AWS. Permite a las empresas aislar completamente sus recursos en la nube, como si tuvieran su propia red corporativa, pero alojada en AWS.

### ¿Para qué sirve?

- **Aislar** la infraestructura de red del resto de Internet y de otras cuentas AWS.
- **Definir rangos de IP personalizados** mediante bloques CIDR.
- **Controlar el acceso** a cada recurso con reglas de seguridad.
- **Organizar recursos** en subredes según su función (web, base de datos, backend, etc.).

### Comparación con otras opciones:

| Opción | ¿Aísla la red? | ¿Control de IPs? | ¿Recomendada? |
|---|---|---|---|
| Red pública compartida | ❌ No | ❌ No | ❌ No |
| **VPC** | ✅ Sí | ✅ Sí | ✅ Sí |
| Almacenamiento de objetos | ❌ No aplica | ❌ No | ❌ No |
| Red local tradicional | ✅ Sí | ✅ Sí | ⚠️ No en la nube |

> ✅ **Conclusión del ejercicio 1:** Cuando una empresa necesita aislar su infraestructura y tener control total de la red, la respuesta siempre es **VPC**.

---

## 2. Subredes: Pública vs Privada

### ¿Qué es una subred?

Una **subred (subnet)** es una división de la red dentro de una VPC. Permite organizar los recursos según su nivel de exposición a Internet.

### Subred Pública

- Tiene acceso a Internet a través de un **Internet Gateway (IGW)**.
- Se usa para recursos que **deben ser accesibles desde el exterior**:
  - Servidores web
  - Balanceadores de carga
  - Proxies

### Subred Privada

- **No tiene acceso directo a Internet**.
- Se usa para recursos que deben estar **protegidos del exterior**:
  - Bases de datos (RDS, MySQL, PostgreSQL)
  - Servidores de aplicaciones (backend)
  - Sistemas internos

### Arquitectura típica de 3 capas:

```
Internet
    │
    ▼
[Internet Gateway]
    │
    ▼
┌─────────────────────┐
│   Subred Pública    │  ← Servidor Web / Load Balancer
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│   Subred Privada    │  ← Servidor de Aplicaciones (Backend)
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│   Subred Privada    │  ← Base de Datos (RDS)
└─────────────────────┘
```

> ✅ **Conclusión del ejercicio 2:** La arquitectura correcta es **subred pública para la app web + subred privada para la base de datos**. Nunca ambas en la misma subred pública.

---

## 3. Grupos de Seguridad (Security Groups)

### ¿Qué es un Security Group?

Un **Security Group** es un **firewall virtual** que controla el tráfico de entrada y salida de una instancia (servidor) dentro de una VPC.

### Características clave:

- Opera a **nivel de instancia** (no de subred).
- Es **estatal (stateful):** si permites tráfico entrante, la respuesta saliente se permite automáticamente.
- Por defecto, **niega todo el tráfico entrante** y permite todo el saliente.
- Puedes definir reglas por **protocolo, puerto y rango de IP**.

### Ejemplo de reglas típicas:

| Tipo | Protocolo | Puerto | Origen | Descripción |
|---|---|---|---|---|
| Inbound | TCP | 80 | 0.0.0.0/0 | Permitir tráfico HTTP desde cualquier IP |
| Inbound | TCP | 443 | 0.0.0.0/0 | Permitir tráfico HTTPS |
| Inbound | TCP | 22 | 10.0.0.0/24 | SSH solo desde la red interna |
| Outbound | All | All | 0.0.0.0/0 | Permitir todo el tráfico de salida |

> ✅ **Conclusión del ejercicio 3:** Los Security Groups **filtran tráfico según reglas de entrada y salida**, actuando como un firewall por instancia.

---

## 4. Tablas de Ruteo

### ¿Qué es una tabla de ruteo?

Una **tabla de ruteo (Route Table)** es un conjunto de reglas que determinan **hacia dónde se dirige el tráfico de red** dentro de una VPC.

### ¿Cómo funciona?

Cada subred tiene asociada una tabla de ruteo. Cuando un paquete de red sale de una instancia, AWS consulta la tabla de ruteo para decidir a dónde enviarlo.

### Entradas típicas de una tabla de ruteo:

| Destino | Objetivo | Descripción |
|---|---|---|
| `10.0.0.0/16` | local | Tráfico interno dentro de la VPC |
| `0.0.0.0/0` | igw-xxxxxxx | Todo el tráfico externo → Internet Gateway |
| `0.0.0.0/0` | nat-xxxxxxx | Tráfico saliente de subredes privadas → NAT Gateway |

### Comunicación entre subredes:

Si tienes dos subredes dentro de la misma VPC:

```
Subred A: 10.0.1.0/24
Subred B: 10.0.2.0/24
```

Para que se comuniquen, debes agregar una **ruta interna** que las conecte:

```
Destino: 10.0.0.0/16  →  Target: local
```

Esto ya está configurado automáticamente dentro de la misma VPC.

> ✅ **Conclusión del ejercicio 4:** Para conectar dos subredes dentro de una VPC, basta con **agregar una ruta en la tabla de ruteo**. No se necesita crear una nueva VPC.

---

## 5. Conectividad Híbrida: VPN y Direct Connect

### ¿Qué es la conectividad híbrida?

La **conectividad híbrida** permite extender la red local (on-premises) de una empresa hacia la nube de AWS, de forma **privada y segura**, sin exponer los recursos a Internet.

### Opciones disponibles:

#### AWS VPN (Virtual Private Network)
- Crea un **túnel cifrado** entre la red local y la VPC.
- Usa el protocolo IPsec para cifrar todo el tráfico.
- Es más económica y fácil de configurar.
- Adecuada para conexiones con menor volumen de tráfico.

#### AWS Direct Connect
- Establece un **enlace físico dedicado** entre el data center de la empresa y AWS.
- No pasa por Internet pública → más seguro y predecible.
- Mayor ancho de banda y menor latencia.
- Ideal para empresas con alto volumen de datos o requisitos estrictos de seguridad.

### Comparación:

| Característica | VPN | Direct Connect |
|---|---|---|
| Tipo de conexión | Túnel cifrado por Internet | Enlace físico dedicado |
| Costo | Bajo | Alto |
| Latencia | Variable | Predecible y baja |
| Seguridad | Alta (cifrado) | Muy alta (red privada) |
| Velocidad de implementación | Rápida (horas) | Lenta (semanas) |

> ✅ **Conclusión del ejercicio 5:** Para conectar una red local a AWS de forma privada sin pasar por Internet público, se usa **VPN o Direct Connect**.

---

## 6. Protección de Datos con Security Groups

### Caso de uso: Base de datos protegida

Uno de los usos más comunes y críticos de los Security Groups es **restringir el acceso a las bases de datos** para que solo el backend autorizado pueda conectarse.

### ¿Cómo se configura?

En el Security Group de la base de datos, se agrega una regla de entrada que solo permite tráfico desde las IPs del backend:

```
Inbound Rules del Security Group (Base de Datos):
┌────────────┬──────────┬────────┬──────────────────┐
│ Tipo       │ Protocol │ Puerto │ Origen           │
├────────────┼──────────┼────────┼──────────────────┤
│ Custom TCP │ TCP      │ 5432   │ 10.0.2.0/24      │  ← Solo el backend
│            │          │        │ (Subred Backend) │
└────────────┴──────────┴────────┴──────────────────┘
```

### ¿Por qué no usar las otras opciones?

| Opción | Problema |
|---|---|
| Ruta hacia Internet para todas las instancias | Expone la BD públicamente ❌ |
| NACL con acceso total | Elimina toda restricción de seguridad ❌ |
| Deshabilitar autenticación del servidor | Gravísimo riesgo de seguridad ❌ |

> ✅ **Conclusión del ejercicio 6:** La práctica de seguridad correcta es **permitir solo las IPs del backend en el Security Group de la base de datos**.

---

## 7. NACL vs Security Group

### ¿Qué es una NACL?

Una **Network ACL (NACL)** es una capa adicional de seguridad que opera a nivel de **subred**, filtrando el tráfico que entra y sale de ella.

### Diferencias clave:

| Característica | Security Group | NACL |
|---|---|---|
| **Nivel de aplicación** | Instancia (servidor) | Subred |
| **Estado (Stateful/Stateless)** | ✅ Estatal (recuerda conexiones) | ❌ No estatal (evalúa cada paquete) |
| **Reglas por defecto** | Denegar todo entrada, permitir salida | Permitir todo (entrada y salida) |
| **Orden de reglas** | Todas se evalúan juntas | Se evalúan en orden numérico |
| **Soporte para reglas de denegación** | ❌ Solo permite | ✅ Permite y deniega |

### ¿Cuándo usar cada uno?

- Usa **Security Group** para controlar el tráfico a nivel de instancia (lo más común).
- Usa **NACL** como capa adicional para bloquear rangos de IPs sospechosas a nivel de subred.

### Flujo de tráfico con ambas capas:

```
Internet
    │
    ▼
[NACL] ← Primer filtro (nivel subred)
    │
    ▼
[Security Group] ← Segundo filtro (nivel instancia)
    │
    ▼
[Instancia EC2]
```

> ✅ **Conclusión del ejercicio 7:** La diferencia clave es que los **Security Groups son estatales** (recuerdan las conexiones activas) y las **NACL son no estatales** (evalúan cada paquete de forma independiente).

---

## 8. NAT Gateway

### ¿Qué es un NAT Gateway?

El **NAT Gateway (Network Address Translation Gateway)** permite que las instancias en una **subred privada** puedan **salir a Internet** para tareas como descargar actualizaciones, sin que Internet pueda iniciar conexiones hacia ellas.

### ¿Cómo funciona?

```
[Instancia en Subred Privada]
        │
        ▼ (tráfico saliente)
[NAT Gateway] ← ubicado en subred pública
        │
        ▼
[Internet Gateway]
        │
        ▼
    Internet 🌐
        │
        ✖ (No pueden entrar conexiones desde fuera)
```

### NAT Gateway vs Internet Gateway:

| Característica | Internet Gateway | NAT Gateway |
|---|---|---|
| Dirección del tráfico | Entrada y salida | Solo salida |
| Uso típico | Subred pública | Subred privada |
| Expone la instancia | ✅ Sí | ❌ No |
| Costo adicional | ❌ No | ✅ Sí (tiene costo por hora y datos) |

### Casos de uso del NAT Gateway:

- Descargar actualizaciones del sistema operativo desde Internet.
- Consultar APIs externas desde un servidor backend privado.
- Sincronizar datos con servicios externos.

> ✅ **Conclusión del ejercicio 8:** Para que una instancia privada salga a Internet **sin exponerse públicamente**, se usa un **NAT Gateway**.

---

## 9. Zonas de Disponibilidad y Alta Disponibilidad

### ¿Qué es una Zona de Disponibilidad (AZ)?

Una **Zona de Disponibilidad** es un centro de datos físicamente separado dentro de una misma región de AWS, diseñado para estar aislado de fallas en otras zonas.

### ¿Por qué distribuir recursos en múltiples AZs?

Si una zona sufre una falla eléctrica, un desastre natural o un problema de red, los recursos en las otras zonas **siguen funcionando normalmente**.

### Arquitectura de Alta Disponibilidad (HA):

```
Región: US East (N. Virginia)
├── Zona A (us-east-1a)
│   ├── Subred Pública A  → Instancia Web 1
│   └── Subred Privada A  → Base de Datos 1 (Primary)
│
└── Zona B (us-east-1b)
    ├── Subred Pública B  → Instancia Web 2
    └── Subred Privada B  → Base de Datos 2 (Standby)
```

Si la Zona A falla → la Zona B continúa atendiendo las solicitudes.

### Beneficios de usar múltiples AZs:

| Beneficio | Descripción |
|---|---|
| **Resiliencia** | Si una zona falla, la otra mantiene los servicios activos |
| **Continuidad del negocio** | No hay interrupción del servicio para los usuarios |
| **Cumplimiento normativo** | Muchas regulaciones exigen redundancia geográfica |
| **Reducción del riesgo** | Menor impacto ante desastres naturales o cortes de luz |

> ✅ **Conclusión del ejercicio 9:** Distribuir recursos en dos o más AZs proporciona **mayor resiliencia ante fallas**, clave en arquitecturas de alta disponibilidad.

---

## 10. Balanceo de Carga (Load Balancer)

### ¿Qué es un Load Balancer?

Un **Balanceador de Carga (Load Balancer)** es un componente que **distribuye automáticamente el tráfico entrante** entre múltiples instancias de una aplicación, evitando que una sola instancia se sobrecargue.

### ¿Cómo funciona?

```
Usuario → [Load Balancer]
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
Instancia 1  Instancia 2  Instancia 3
(Zona A)     (Zona B)     (Zona A)
```

### Tipos de Load Balancer en AWS:

| Tipo | Nivel OSI | Uso principal |
|---|---|---|
| **Application Load Balancer (ALB)** | Capa 7 (HTTP/HTTPS) | Aplicaciones web, microservicios |
| **Network Load Balancer (NLB)** | Capa 4 (TCP/UDP) | Alto rendimiento, baja latencia |
| **Gateway Load Balancer (GWLB)** | Capa 3 | Inspección de tráfico, firewalls |

### Beneficios:

- **Optimiza el rendimiento:** Ninguna instancia se satura.
- **Alta disponibilidad:** Si una instancia falla, el tráfico se redirige a las sanas.
- **Escalabilidad:** Se pueden agregar instancias dinámicamente.
- **Health checks:** Detecta instancias no saludables y deja de enviarles tráfico.

> ✅ **Conclusión del ejercicio 10:** Para distribuir solicitudes entre múltiples instancias automáticamente se usa un **Load Balancer**, no un NAT Gateway ni Internet Gateway.

---

## 11. Resumen Visual de la Arquitectura

La siguiente arquitectura combina todos los conceptos del módulo en un escenario de producción real:

```
                        INTERNET 🌐
                            │
                    [Internet Gateway]
                            │
               ┌────────────┴────────────┐
               │                         │
        [Load Balancer]             [VPN/Direct Connect]
               │                         │
    ┌──────────┴──────────┐         Red Local (On-Premises)
    │                     │
[Subred Pública A]   [Subred Pública B]
 Servidor Web 1       Servidor Web 2
    │                     │
    └──────────┬──────────┘
               │
         [NAT Gateway]
               │
    ┌──────────┴──────────┐
    │                     │
[Subred Privada A]   [Subred Privada B]
 Backend 1             Backend 2
    │                     │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │                     │
[Subred Privada A]   [Subred Privada B]
Base de Datos Primary  Base de Datos Standby
```

**Capas de seguridad presentes:**
- 🔒 **NACL** → Nivel de subred
- 🔒 **Security Groups** → Nivel de instancia
- 🔒 **Reglas de acceso** → Solo IPs autorizadas a la BD

---

## 12. Glosario

| Término | Definición |
|---|---|
| **VPC** | Virtual Private Cloud. Red privada virtual en AWS. |
| **Subred Pública** | Subred con acceso a Internet vía Internet Gateway. |
| **Subred Privada** | Subred sin acceso directo a Internet. |
| **Internet Gateway (IGW)** | Componente que conecta la VPC con Internet. |
| **NAT Gateway** | Permite salida a Internet desde subredes privadas sin exponer las instancias. |
| **Security Group** | Firewall virtual a nivel de instancia. Es estatal (stateful). |
| **NACL** | Network Access Control List. Firewall a nivel de subred. Es no estatal (stateless). |
| **Tabla de Ruteo** | Conjunto de reglas que define hacia dónde va el tráfico de red. |
| **VPN** | Túnel cifrado para conectar la red local con la VPC. |
| **Direct Connect** | Enlace físico dedicado entre la red local y AWS. |
| **Load Balancer** | Distribuye el tráfico entre múltiples instancias automáticamente. |
| **Alta Disponibilidad (HA)** | Arquitectura diseñada para mantener servicios activos incluso ante fallas. |
| **Zona de Disponibilidad (AZ)** | Centro de datos físicamente separado dentro de una región de AWS. |
| **CIDR** | Notación para definir rangos de IPs (ej: `10.0.0.0/16`). |
| **Health Check** | Verificación automática del estado de las instancias por parte del Load Balancer. |

---

*Documento basado en la Guía de Ejercicios Prácticos — Módulo 5: Redes Virtuales | CYMETRIA, El Futuro es Digital.*