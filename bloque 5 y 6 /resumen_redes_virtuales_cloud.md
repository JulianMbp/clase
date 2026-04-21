# Resumen --- Redes Virtuales: La Columna Vertebral del Cloud

## Introducción

En esta clase se introduce el concepto de **redes virtuales en entornos
cloud**, explicando por qué son la base de la arquitectura en la nube.
El enfoque del curso es **aprender haciendo**, combinando teoría con
práctica en plataformas cloud.

El curso trabajará principalmente con **AWS**, aunque también se
mencionan similitudes con **GCP**.

------------------------------------------------------------------------

# Conceptos Principales

## 1. Importancia de las Redes Virtuales

Una red virtual es uno de los componentes más importantes dentro de
cualquier infraestructura en la nube.

Permite: - Organizar recursos dentro del cloud. - Controlar el acceso
entre servicios. - Administrar la comunicación entre sistemas. -
Conectar infraestructura privada con internet.

Sin una red correctamente diseñada, una arquitectura cloud no puede
funcionar correctamente.

------------------------------------------------------------------------

## 2. VPC (Virtual Private Cloud)

La **VPC** es el espacio de red aislado dentro de la nube donde se
despliega la infraestructura.

Características principales: - Proporciona **aislamiento de red**. -
Permite definir **rangos de direcciones IP**. - Contiene subredes. -
Permite configurar reglas de seguridad. - Permite comunicación con
internet o redes externas.

La VPC actúa como el **perímetro de seguridad de la infraestructura**.

------------------------------------------------------------------------

## 3. Subredes

Las **subredes** son divisiones dentro de una VPC.

Sirven para: - Separar recursos. - Organizar arquitecturas. - Controlar
tráfico de red.

El diseño de subredes determina cuántos recursos podrán desplegarse.

Ejemplo: - Un bloque de red con **64 IPs** permite menos recursos. - Un
bloque con **128 IPs** permite más máquinas o servicios.

Por eso **la planificación del direccionamiento IP es clave**.

------------------------------------------------------------------------

## 4. Máquinas Virtuales y Redes

Las máquinas virtuales se despliegan dentro de las redes creadas.

La red funciona como una **estructura base** que permite construir
arquitecturas más grandes.

En otras palabras: - Las redes son la base - Las máquinas virtuales
viven dentro de ellas

------------------------------------------------------------------------

## 5. Acceso a Internet

Por defecto, una red privada en la nube **no tiene acceso directo a
internet**.

Para permitirlo se deben configurar componentes de seguridad como:

-   Gateways
-   Reglas de firewall
-   Rutas de red

Esto asegura que el acceso sea **controlado y seguro**.

------------------------------------------------------------------------

## 6. Seguridad en Redes Cloud

La seguridad es uno de los elementos centrales en la arquitectura de
red.

Se utilizan mecanismos como:

-   Firewalls
-   Reglas de seguridad
-   Control de tráfico
-   Políticas de acceso

Esto permite decidir: - Qué servicios pueden comunicarse - Qué tráfico
entra o sale de la red

------------------------------------------------------------------------

## 7. Conexión entre Redes

### VPN

Permite conectarse a una red privada desde internet de forma segura.

Ejemplo: Un empleado puede conectarse desde su casa a la red de la
empresa.

### Conexión Site-to-Site

Permite conectar: - Una red on‑premise - Con una red en la nube

Esto permite integrar infraestructura local con cloud.

### Direct Connect

Es una conexión dedicada entre: - Infraestructura local -
Infraestructura cloud

Ofrece: - Mayor velocidad - Menor latencia - Mayor estabilidad

------------------------------------------------------------------------

## 8. Regiones y Zonas de Disponibilidad

Los recursos en la nube se despliegan en:

-   **Regiones**
-   **Zonas de disponibilidad**

Las redes pueden diseñarse para permitir comunicación: - Dentro de una
región - Entre diferentes regiones

Esto es importante para arquitecturas **distribuidas y resilientes**.

------------------------------------------------------------------------

# Puntos Importantes de la Clase

-   Las redes virtuales son la **base de cualquier arquitectura cloud**.
-   La **VPC** proporciona aislamiento y seguridad.
-   El diseño de **subredes y rangos de IP** es fundamental.
-   Las redes permiten **controlar el acceso a internet**.
-   Los mecanismos de seguridad incluyen **firewalls y reglas de red**.
-   Existen distintas formas de conectar infraestructuras:
    -   VPN
    -   Site‑to‑Site
    -   Direct Connect
-   Las arquitecturas cloud se distribuyen en **regiones y zonas de
    disponibilidad**.

------------------------------------------------------------------------

# Conclusión

El diseño de redes en la nube es uno de los aspectos más importantes
para construir arquitecturas escalables, seguras y eficientes.

Comprender cómo funcionan: - las VPC - las subredes - las conexiones de
red - la seguridad

permite construir infraestructuras cloud profesionales.

La siguiente parte del curso se enfocará en **llevar estos conceptos a
la práctica**, creando y configurando redes directamente en la nube.
