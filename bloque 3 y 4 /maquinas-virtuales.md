# Módulo 3 – Cómputo: Máquinas Virtuales

## Introducción
En este módulo se profundiza en el concepto de **máquinas virtuales dentro del entorno cloud**.  
En los módulos anteriores se abordaron:

- **Módulo 1 y 2:** Importancia y necesidad del entorno cloud.
- **Módulo 2:** Seguridad en la nube.

En este **Módulo 3** se explica el **cómputo en la nube**, principalmente a través de las **máquinas virtuales**.

---

# ¿Qué son las Máquinas Virtuales?

Las **máquinas virtuales (VM)** son recursos de cómputo disponibles en la nube que funcionan como **servidores remotos**.

También se conocen como:

- Instancias
- Recursos de cómputo

En esencia:

> Una máquina virtual es un **servidor ubicado en algún centro de datos del mundo al cual el usuario puede acceder de forma remota**.

Estos servidores se encuentran distribuidos en **regiones geográficas** y **zonas de disponibilidad**.

---

# Tipos de servidores en la nube

Existen diferentes tipos de servidores según la infraestructura:

### Servidores Bare Metal
- Se entregan **completos al usuario**.
- No se comparten ni se particionan.
- Funcionan como si fuera un servidor físico dedicado.
- Se utilizan para necesidades específicas de alto rendimiento.

---

# Selección de una Máquina Virtual

Antes de crear una máquina virtual se deben analizar varios factores técnicos.

## 1. Tipo de uso del servidor
No todos los servidores tienen el mismo propósito.

Ejemplos:

- **File Server:** almacenamiento de archivos.
- **Servidor de base de datos**
- **Servidor de aplicaciones**
- **Servidor para desarrollo**
- **Data warehouse**
- **Machine learning**

Cada tipo de aplicación requiere **diferentes recursos y configuraciones**.

---

## 2. Recursos de la máquina

Es necesario definir:

- **Disco (almacenamiento)**
- **Sistema operativo**
- **Memoria RAM**
- **CPU**

Estos recursos deben ajustarse **exactamente a la necesidad de la aplicación**.

---

## 3. Sistema Operativo

Las máquinas virtuales pueden ejecutar distintos sistemas operativos:

- **Linux**
- **Windows**

Las aplicaciones normalmente están diseñadas para ejecutarse sobre un **sistema operativo específico**.

Actualmente muchas aplicaciones modernas pueden ejecutarse en distintos entornos, pero aún existen dependencias específicas.

---

# Bases de Datos en Entornos Empresariales

El video menciona que existen bases de datos ampliamente utilizadas en industrias específicas.

Bases de datos comunes:

- SQL Server
- Oracle
- MySQL

Sin embargo, existen otras menos conocidas, como las de **IBM**, usadas especialmente en sectores como:

- **Banca**
- Sistemas financieros

Estas bases de datos suelen ser **muy robustas** y optimizadas para alto rendimiento.

---

# Importancia del costo en el Cloud

Uno de los factores más importantes al elegir una máquina virtual es el **costo**.

La filosofía del cloud se basa en:

> Lograr que una solución funcione correctamente **con el menor costo posible**.

Esto implica:

- No usar más RAM de la necesaria
- No usar más CPU de la necesaria
- No usar más almacenamiento del requerido

---

# Ventaja del Cloud Computing

Antes del cloud era común comprar infraestructura que **no siempre se utilizaba completamente**.

En la nube:

- Se paga solo por lo que se usa.
- Los recursos pueden escalar según la necesidad.
- Se evita invertir en infraestructura innecesaria.

---

# Desafíos del Cloud

Muchas organizaciones temen migrar a la nube porque creen que:

- Puede ser **más costoso**.
- Puede generar **gastos mayores si no se administra correctamente**.

Por eso es fundamental **dimensionar correctamente las máquinas virtuales**.

---

# Próximos temas del módulo

En las siguientes secciones del módulo se profundizará en:

- Diferentes **proveedores de nube**
- Otros modelos de infraestructura como **serverless**
- Arquitecturas modernas de computación en la nube

---

# Puntos Clave

- Las **máquinas virtuales son servidores remotos disponibles en la nube**.
- Se encuentran distribuidas en **regiones y zonas de disponibilidad**.
- Existen servidores dedicados llamados **bare metal**.
- Cada tipo de aplicación requiere **diferentes recursos de cómputo**.
- Es importante definir:
  - CPU
  - RAM
  - Disco
  - Sistema operativo
- Las bases de datos empresariales pueden variar según el sector.
- En el cloud es fundamental **optimizar costos**.
- El éxito de una arquitectura cloud depende de **usar solo los recursos necesarios**.

---

# Conclusión

Las máquinas virtuales son la base del **cómputo en la nube**, permitiendo a los usuarios disponer de servidores en cualquier parte del mundo sin necesidad de adquirir infraestructura física. Su correcta configuración y dimensionamiento es clave para lograr **rendimiento, eficiencia y optimización de costos** en entornos cloud.
