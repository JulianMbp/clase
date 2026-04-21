# Introducción a la Consola de AWS y Creación de una VPC
> **Curso:** Módulo 5 — Clase 2 | **Canal:** CYMETRIA – El Futuro es Digital

---

## 📌 Tabla de Contenidos

1. [Registro y Acceso a AWS](#1-registro-y-acceso-a-aws)
2. [La Consola de AWS](#2-la-consola-de-aws)
3. [Regiones y Zonas de Disponibilidad](#3-regiones-y-zonas-de-disponibilidad)
4. [¿Qué es una VPC?](#4-qué-es-una-vpc)
5. [Bloques CIDR e IPs](#5-bloques-cidr-e-ips)
6. [Subredes: Públicas y Privadas](#6-subredes-públicas-y-privadas)
7. [Creación de una VPC paso a paso](#7-creación-de-una-vpc-paso-a-paso)
8. [Eliminar una VPC](#8-eliminar-una-vpc)
9. [Recomendaciones y Reflexiones Finales](#9-recomendaciones-y-reflexiones-finales)

---

## 1. Registro y Acceso a AWS

Para comenzar a usar AWS es necesario crear una cuenta en [aws.amazon.com](https://aws.amazon.com).

### Pasos para registrarse:
- Ingresar un correo electrónico válido.
- Proporcionar datos personales y de facturación.
- **Vincular una tarjeta de crédito o débito** — AWS la requiere para verificar identidad, aunque muchos servicios del nivel gratuito (*Free Tier*) no generan cobros.
  - > 💡 **Tip:** Es posible usar una **tarjeta recargable** si no se desea asociar una tarjeta de crédito principal.

### Tiempo estimado de registro:
El proceso completo toma aproximadamente **5 minutos**.

---

## 2. La Consola de AWS

La **AWS Management Console** es la interfaz web desde la cual se administran todos los servicios de Amazon Web Services.

### Acceso:
```
https://console.aws.amazon.com
```

### Elementos principales de la consola:

| Elemento | Descripción |
|---|---|
| **ID de cuenta** | Identificador único e irrepetible para cada usuario. Nadie más tiene el mismo. |
| **Nombre de usuario** | Configurable por el usuario (ej. "Devot Junior"). |
| **Barra de búsqueda** | Permite encontrar cualquier servicio rápidamente (EC2, S3, VPC, etc.). |
| **Selector de región** | Permite cambiar entre las regiones geográficas disponibles. |
| **Historial de servicios** | Muestra los servicios a los que has accedido recientemente. |

> ⚠️ **Importante:** Al ingresar a la consola por primera vez, verás un ID de cuenta único. Este ID **no se comparte** con ningún otro usuario en toda la plataforma de AWS.

---

## 3. Regiones y Zonas de Disponibilidad

Uno de los conceptos más críticos al trabajar con AWS es entender **en qué región estás trabajando**.

### ¿Qué es una Región?

Una **región** es una ubicación geográfica donde AWS tiene centros de datos. Ejemplos:

- 🇺🇸 **US East (N. Virginia)** — `us-east-1`
- 🇺🇸 **US East (Ohio)** — `us-east-2`
- 🇯🇵 **Asia Pacific (Tokyo)** — `ap-northeast-1`
- 🇪🇺 **Europe (Frankfurt)** — `eu-central-1`

### ¿Por qué es importante la región?

- Los **recursos que creas en una región NO son visibles desde otra región**.
- Si despliegas una instancia EC2 en N. Virginia y luego cambias a Tokio, **no verás esa instancia**.
- Debes asegurarte siempre de estar en **la región correcta** antes de crear o buscar recursos.

> 🔁 **Ejemplo del instructor:** "Si entro a la región de Tokio, no veré los servicios que tengo desplegados en Norte de Virginia."

### Regiones recomendadas en el curso:
- **US East (N. Virginia)** — Generalmente la más económica y con más servicios disponibles.
- **US East (Ohio)** — Alternativa también dentro de Estados Unidos.

### ¿Qué es una Zona de Disponibilidad (AZ)?

Dentro de cada región existe una o más **Zonas de Disponibilidad (Availability Zones)**:

- Son centros de datos físicamente separados dentro de la misma región.
- Están diseñadas para garantizar **alta disponibilidad** y **tolerancia a fallos**.
- Una región puede tener **2 o 3 zonas de disponibilidad**.
- Están conectadas entre sí con redes de baja latencia pero separadas físicamente por distancia.

```
Región: US East (N. Virginia)
├── Zona de Disponibilidad A (us-east-1a)
├── Zona de Disponibilidad B (us-east-1b)
└── Zona de Disponibilidad C (us-east-1c)
```

---

## 4. ¿Qué es una VPC?

**VPC** significa **Virtual Private Cloud** (Nube Privada Virtual).

> 📌 En el video el instructor usa la pronunciación "BPC", que corresponde al término inglés **VPC**.

### Definición:

Una VPC es una **red virtual aislada** dentro de la infraestructura de AWS donde puedes desplegar y controlar tus recursos (servidores, bases de datos, etc.). Es como tener tu propia red privada dentro de la nube.

### Características de una VPC:

- Cada cuenta de AWS viene con una **VPC predeterminada** ya creada en cada región.
- Puedes crear **múltiples VPCs** según tus necesidades.
- Dentro de una VPC puedes definir:
  - **Subredes** (públicas y privadas)
  - **Tablas de enrutamiento**
  - **Gateways de internet**
  - **Grupos de seguridad**

### VPC por defecto:
Al ingresar a AWS por primera vez, ya existe una VPC predeterminada con **6 subredes** configuradas automáticamente.

---

## 5. Bloques CIDR e IPs

Al crear una VPC es necesario definir un **bloque CIDR** (Classless Inter-Domain Routing).

### ¿Qué es un bloque CIDR?

Es una **notación que define el rango de direcciones IP** disponibles dentro de tu VPC.

### Ejemplos comunes:

| Bloque CIDR | Cantidad de IPs disponibles |
|---|---|
| `10.0.0.0/16` | 65,536 IPs |
| `10.0.0.0/24` | 256 IPs |
| `10.0.0.0/28` | 16 IPs |

> 🧮 **Regla general:** Entre más pequeño el número después de la `/`, más IPs tendrás disponibles.

### Recomendación del instructor:
- Usar `/16` para tener **65,536 IPs** disponibles — suficiente para proyectos de cualquier tamaño.
- Es importante definir bien el bloque CIDR desde el inicio, ya que **modificarlo después puede ser complejo**.

---

## 6. Subredes: Públicas y Privadas

Dentro de una VPC, los recursos se organizan en **subredes (subnets)**.

### Subred Pública:
- Tiene **salida a Internet** a través de un Internet Gateway.
- Se usa para recursos que deben ser accesibles desde el exterior (servidores web, balanceadores de carga, etc.).

### Subred Privada:
- **No tiene acceso directo a Internet**.
- Se usa para recursos internos que deben estar protegidos (bases de datos, servidores de aplicaciones, etc.).

### Configuración recomendada:

```
VPC (ej: 10.0.0.0/16)
├── Subred Pública 1  (us-east-1a) — Acceso a Internet ✅
├── Subred Pública 2  (us-east-1b) — Acceso a Internet ✅
├── Subred Privada 1  (us-east-1a) — Sin acceso a Internet ❌
└── Subred Privada 2  (us-east-1b) — Sin acceso a Internet ❌
```

> 💡 La configuración típica es **2 subredes públicas + 2 subredes privadas**, distribuidas en al menos 2 zonas de disponibilidad para alta disponibilidad.

---

## 7. Creación de una VPC paso a paso

### Opciones al crear una VPC:

AWS ofrece dos modos al crear una VPC:

| Opción | Descripción |
|---|---|
| **Solo VPC** | Crea únicamente la VPC sin subredes ni configuraciones adicionales. |
| **VPC and More** | Crea la VPC + subredes + tablas de enrutamiento + gateways automáticamente. |

> ✅ **Recomendación del instructor:** Usar **"VPC and More"** para crear todo el entorno de red de forma completa y estructurada.

### Pasos para crear una VPC con "VPC and More":

1. Ingresar a la consola de AWS en la región deseada (ej. **N. Virginia**).
2. Buscar el servicio **VPC** en la barra de búsqueda.
3. Hacer clic en **"Create VPC"**.
4. Seleccionar la opción **"VPC and more"**.
5. Configurar los siguientes parámetros:

```
Nombre del proyecto:     proyecto (ej: "mi-proyecto")
Bloque CIDR IPv4:        10.0.0.0/16  →  65,536 IPs disponibles
Número de AZs:           2
Subredes públicas:       2
Subredes privadas:       2
NAT Gateway:             Según necesidad
```

6. Revisar el **diagrama de red** que AWS genera automáticamente.
7. Hacer clic en **"Create VPC"**.

> 🗺️ AWS muestra un mapa visual de la VPC con todas las subredes y conexiones antes de confirmar la creación.

---

## 8. Eliminar una VPC

Si necesitas eliminar una VPC que ya no usas:

1. Ir al servicio **VPC** en la consola.
2. Seleccionar la VPC que deseas eliminar.
3. Ir a **Acciones → Eliminar VPC**.

> ⚠️ **Advertencia:** Antes de eliminar una VPC, AWS verificará si tiene recursos asociados (instancias EC2, bases de datos RDS, buckets S3 asociados, etc.). Si existen recursos activos, primero deberás eliminarlos.

---

## 9. Recomendaciones y Reflexiones Finales

### Para el registro:
- Seguir la **guía paso a paso** disponible en la documentación del curso.
- Usar una cuenta propia para aprender, o acceder a través de la cuenta corporativa si tu empresa ya usa AWS.

### Para el aprendizaje:
- **La práctica es fundamental.** No hay manera de aprender cloud sin hacer el despliegue real.
- AWS tiene un **nivel gratuito (Free Tier)** que permite experimentar con muchos servicios sin costo durante 12 meses.
- No limites tu aprendizaje por falta de acceso: con una cuenta personal puedes llegar muy lejos.

### Reflexión del instructor:
> *"Con temas de tecnología, el límite es hasta donde tú quieras llegar. Nuestra profesión tiene una gran diferencia: lo que tú te imaginas, lo puedes hacer."*

---

## 📚 Glosario Rápido

| Término | Definición |
|---|---|
| **AWS** | Amazon Web Services — Plataforma de servicios en la nube de Amazon. |
| **Consola** | Interfaz web para administrar todos los servicios de AWS. |
| **Región** | Ubicación geográfica con múltiples centros de datos de AWS. |
| **AZ (Availability Zone)** | Centro de datos físicamente separado dentro de una región. |
| **VPC** | Virtual Private Cloud — Red virtual privada en la nube. |
| **CIDR** | Notación para definir rangos de IPs en una red. |
| **Subred Pública** | Subred con acceso a Internet a través de un Internet Gateway. |
| **Subred Privada** | Subred sin acceso directo a Internet, para recursos internos. |
| **Free Tier** | Nivel gratuito de AWS para aprender y experimentar. |
| **IAM** | Identity and Access Management — Gestión de usuarios y permisos en AWS. |

---

*Documento generado a partir del video "Consola AWS" — CYMETRIA, El Futuro es Digital.*