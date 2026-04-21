# Módulo 3 – Cómputo en la Nube: Máquinas Virtuales

## Resumen General

En este módulo se profundiza en el concepto de **máquinas virtuales dentro del entorno cloud**. Después de haber visto en módulos anteriores la importancia del **cloud computing** y los temas de **seguridad**, ahora se explica cómo funciona el **cómputo en la nube**, principalmente a través de **máquinas virtuales (VMs)**.

Las máquinas virtuales representan recursos de cómputo que funcionan como **servidores remotos ubicados en distintas regiones del mundo**. Estos servidores pueden ser utilizados por los usuarios para ejecutar aplicaciones, almacenar información o administrar sistemas sin necesidad de tener hardware físico propio.

Además, el módulo también enfatiza la importancia de la **gestión de identidades, accesos y gobernanza dentro de entornos cloud**, así como las **buenas prácticas de seguridad** relacionadas con contraseñas, roles y control del tráfico de red.

---

# Máquinas Virtuales en Cloud

Las **máquinas virtuales (VMs)** son instancias de cómputo que funcionan como servidores dentro de la infraestructura de la nube.

### Características principales

- Son **servidores ubicados en centros de datos alrededor del mundo**.
- Se accede a ellos **de forma remota a través de internet**.
- Pueden desplegar aplicaciones, bases de datos y sistemas completos.
- También se les puede llamar:
  - Instancias
  - Recursos de cómputo

### Ubicación y disponibilidad

Los servidores cloud están organizados en:

- **Regiones geográficas**
- **Zonas de disponibilidad**

Esto permite que los usuarios elijan **dónde desplegar sus recursos** dependiendo de factores como:

- Latencia
- Disponibilidad
- Regulaciones
- Proximidad a los usuarios

---

# Tipos de Servidores

Existen diferentes tipos de infraestructura dentro del cloud.

### Bare Metal

Un tipo especial de servidor es el **servidor Bare Metal**, el cual:

- Se entrega **completo al usuario**
- No se comparte con otras máquinas
- No está particionado ni virtualizado

Este tipo de servidores se usa cuando se necesitan:

- Altos niveles de rendimiento
- Control total del hardware
- Configuraciones específicas

---

# Componentes a Considerar al Crear una Máquina Virtual

Cuando se elige o configura una máquina virtual se deben considerar varios aspectos importantes:

- Configuración de usuarios
- Roles
- Grupos
- Políticas de acceso
- Seguridad de las credenciales

Esto garantiza que el sistema se mantenga **seguro y correctamente administrado**.

---

# Seguridad y Gestión de Identidades

Un punto clave en el uso de la nube es la **gestión de identidades y accesos (IAM)**.

Esto incluye:

- Control de usuarios
- Definición de roles
- Asignación de permisos
- Administración de credenciales

### Buenas prácticas para contraseñas

El módulo menciona ejemplos de **contraseñas inseguras**, como:

- `1234`
- `País + Año`

En su lugar se deben usar contraseñas:

- Complejas
- Difíciles de adivinar
- Administradas correctamente

---

# Gobernanza en Entornos Cloud

La gobernanza cloud sigue un **proceso cíclico** que incluye:

1. **Definir políticas**
2. **Asegurar su cumplimiento**
3. **Auditar los sistemas**
4. **Mejorar continuamente**

Este ciclo permite mantener un **entorno controlado, seguro y optimizado**.

---

# Seguridad de Red

También se menciona la importancia de controlar el **tráfico de red dentro del entorno cloud**.

### Buenas prácticas

- Limitar el acceso a internet de ciertos servidores
- Evitar exponer recursos innecesariamente
- Controlar puertos abiertos
- Implementar firewalls

Por ejemplo:

Una **base de datos no debería tener acceso directo a internet** si no es necesario.

Solo debería poder comunicarse con:

- La aplicación que utiliza esos datos
- Recursos dentro de la misma red

---

# Firewalls y Protección

Se pueden implementar soluciones de seguridad como:

- Firewalls de red
- Sistemas de inspección de tráfico
- Control de accesos

Estos sistemas permiten **filtrar y proteger el tráfico dentro de la infraestructura cloud**.

---

# Objetivo del Módulo

El objetivo del curso no es únicamente responder ejercicios, sino formar profesionales capaces de:

- Comprender los conceptos cloud
- Investigar términos desconocidos
- Tomar decisiones técnicas informadas
- Diseñar soluciones tecnológicas

---

# Puntos Importantes

- Las **máquinas virtuales son la base del cómputo en la nube**.
- Funcionan como **servidores remotos accesibles desde cualquier lugar**.
- Existen **diferentes tipos de infraestructura**, incluyendo Bare Metal.
- La **gestión de identidades y accesos es fundamental para la seguridad**.
- Las contraseñas deben seguir **buenas prácticas de seguridad**.
- La gobernanza cloud requiere **definir, cumplir, auditar y mejorar políticas**.
- Es fundamental **controlar el tráfico de red y evitar exposiciones innecesarias**.
- Los profesionales cloud deben desarrollar **criterio técnico para tomar decisiones**.

---

# Conclusión

Las máquinas virtuales permiten aprovechar el poder del cloud computing al proporcionar **infraestructura flexible, escalable y accesible globalmente**. Sin embargo, su uso requiere una **correcta gestión de seguridad, identidades y gobernanza**, ya que estos elementos garantizan la estabilidad y protección de los sistemas en la nube.
