## Bloque 2 · Módulo 7 · Introducción a contenedores (70 min)

### 2.1. ¿Qué es un contenedor? (15 min)

#### Guion hablado
- “Vamos a empezar por lo más importante: ¿qué es exactamente un contenedor?”
- “Un contenedor es una unidad estándar de software que empaqueta la aplicación con todas sus dependencias: el runtime, librerías, configuraciones… todo lo necesario para que corra igual en cualquier entorno.”
- “La analogía clásica es la de los contenedores de carga en un barco: no importa si el contenedor va en barco, tren o camión; el contenido llega igual. En software pasa lo mismo: da igual si corres en tu laptop, en un servidor on‑premise o en AWS, mientras tengas Docker.”
- “Ojo con esta distinción: **imagen** vs **contenedor**.”
  - “La **imagen** es la plantilla inmutable: un archivo o conjunto de capas que describen qué contiene la app.”
  - “El **contenedor** es esa imagen en ejecución: una instancia viva, con procesos corriendo.”
- “Desde una sola imagen puedes tener muchos contenedores corriendo; por ejemplo, muchos ‘nginx’ sirviendo tráfico en paralelo.”
- “Piensen en este flujo: tengo la imagen `nginx`, ejecuto `docker run nginx` y eso se convierte en un contenedor activo escuchando en un puerto.”

#### Pregunta rápida
- “Si tuvieran que explicarle a alguien la diferencia entre imagen y contenedor en una frase, ¿cómo lo dirían?”

<!-- VISUAL: 
  - Diagrama con 2 cajas:
    - Caja 1: “Imagen (plantilla) → nginx:latest” 
    - Flecha con texto “docker run nginx”
    - Varias cajas 2: “Contenedor A”, “Contenedor B”, todos con el logo de nginx.
  - Al lado, una pequeña ilustración de un contenedor de barco para reforzar la analogía. -->

---

### 2.2. Docker: componentes y Dockerfile (20 min)

#### Guion hablado
- “Ahora vamos a ver qué piezas componen ese mundo de contenedores con Docker.”
- “Primero, los componentes principales de Docker”:
  - “`Dockerfile`: el archivo de instrucciones. Es como la receta que dice qué imagen base usar, qué copiar, qué instalar y qué comando ejecutar.”
  - “Docker Engine: el motor que corre en tu máquina y es el que realmente crea y ejecuta contenedores.”
  - “Docker Hub: el registro público donde se almacenan imágenes como `nginx`, `node`, `postgres`.”
  - “Redes y volúmenes: redes para que contenedores hablen entre sí por nombre, volúmenes para que los datos sobrevivan cuando muere un contenedor.”
- “La pieza central a nivel de desarrollo es el `Dockerfile`.”
- “Un `Dockerfile` básico para una app Node puede verse así: imagen base `FROM node:18`, luego `COPY . /app`, luego `RUN npm install`, y al final un `CMD ["npm", "start"]`.”
- “Cuando corres `docker build` con ese `Dockerfile`, Docker toma esas instrucciones por capas y construye la imagen final que luego vas a ejecutar.”

#### Detalle de comandos del Dockerfile
- “`FROM node:18` define desde dónde partes; es tu sistema base, con Node ya instalado.”
- “`COPY . /app` copia tu código dentro del contenedor, en la carpeta `/app`.”
- “`RUN npm install` se ejecuta en tiempo de construcción; instala dependencias una vez y esa capa se cachea.”
- “`CMD ["npm", "start"]` dice qué comando se ejecuta cuando el contenedor arranca.”

#### Mini ejercicio guiado
- “Imaginemos que ejecutamos:
  - `docker build -t mi-app .`
  - `docker run -p 3000:3000 mi-app`”
- “¿Qué significa `-t mi-app`? Es el nombre (tag) con el que etiquetamos la imagen.”
- “¿Qué significa `-p 3000:3000`? Que mapeamos el puerto 3000 del host al puerto 3000 del contenedor; así podemos entrar desde el navegador a `http://localhost:3000`.”

<!-- VISUAL:
  - Mostrar un snippet real de `Dockerfile` con colores.
  - Debajo, una flecha: “Dockerfile → docker build → Imagen ‘mi-app’”.
  - A la derecha, un recuadro con “docker run -p 3000:3000 mi-app”. -->

---

### 2.3. Comandos esenciales de Docker (15 min)

#### Guion hablado
- “Con el `Dockerfile` listo, el día a día se resume en unos pocos comandos clave.”
- “Los más importantes que quiero que recuerden son:”
  - “`docker build` → construye la imagen a partir del `Dockerfile`.”
  - “`docker run` → crea y arranca un contenedor desde una imagen.”
  - “`docker ps` → lista los contenedores que están corriendo.”
  - “`docker stop` → detiene un contenedor por nombre o ID.”
  - “`docker logs` → muestra los logs de salida de un contenedor, super útil para debug.”
  - “`docker images` → lista las imágenes que tienes descargadas/locales.”
- “El flujo típico de trabajo es: escribir/ajustar el `Dockerfile`, luego `docker build`, luego `docker run` y finalmente `docker ps` para verificar que está arriba.”

#### Simulación guiada
- “Supongamos que ya te dieron una app dockerizada y quieres probarla localmente.”
- “Secuencia que deberías pensar:
  1. `docker images` para ver qué imágenes tienes.
  2. `docker run -p 8080:8080 nombre-imagen` para lanzarla.
  3. `docker ps` para ver que efectivamente está corriendo.
  4. `docker stop <id>` cuando ya terminaste de probar.”

<!-- VISUAL:
  - Tabla simple estilo terminal con 2 columnas:
    - Comando | ¿Para qué sirve?
  - Debajo, un diagrama tipo flujo:
    Dockerfile → `docker build` → Imagen → `docker run` → Contenedor → `docker ps` -->

---

### 2.4. Contenedores vs Máquinas Virtuales (10 min)

#### Guion hablado
- “Es muy común confundir contenedores con máquinas virtuales; vamos a compararlos rápido.”
- “En una VM tienes un sistema operativo completo dentro de otro sistema operativo: más pesado, arranca más lento, pero con aislamiento muy fuerte.”
- “En un contenedor compartes el mismo kernel del host; solo encapsulas lo necesario para la app. Eso lo hace mucho más ligero y rápido de arrancar.”
- “Diferencias clave:”
  - “Peso: contenedores en megabytes vs VMs en gigabytes.”
  - “Arranque: contenedores en segundos vs VMs en minutos.”
  - “Uso de recursos: contenedores aprovechan mejor la máquina porque comparten más cosas.”
- “¿Cuándo siguen teniendo sentido las VMs? Cuando necesitas un SO completo diferente (por ejemplo, Windows dentro de un host Linux) o cuando por requisitos de seguridad quieres aislamiento fuerte a nivel de hipervisor.”

#### Actividad mental
- “Piensen en este escenario: tienes un monolito legado que solo corre en Windows Server 2012. Ahí probablemente una VM tiene más sentido.”
- “En cambio, si tienes muchos microservicios HTTP pequeños, contenedores son casi siempre la mejor opción.”

<!-- VISUAL:
  - Tabla comparativa con filas: SO, peso, arranque, aislamiento, uso de recursos.
  - Dos diagramas apilados:
    - Diagrama 1: Hardware → SO host → Hypervisor → VMs (cada una con su SO).
    - Diagrama 2: Hardware → SO host → Docker → Contenedores. -->

---

### 2.5. Kubernetes: orquestación de contenedores (15 min)

#### Guion hablado
- “Docker nos sirve para crear y correr contenedores individuales, pero en producción casi nunca tenemos uno solo.”
- “Cuando tienes docenas o cientos de contenedores, necesitas alguien que los orqueste: que los escale, los repare cuando fallan, distribuya el tráfico y haga despliegues sin tumbar el servicio. Ahí entra Kubernetes.”
- “Kubernetes (K8s) automatiza cosas como:”
  - “Escalado automático de pods según CPU/memoria.”
  - “Self‑healing: si un contenedor muere, levanta otro.”
  - “Actualizaciones graduales (rolling updates).”
  - “Balanceo de carga interno entre pods.”
- “Objetos clave que debes tener en el radar:”
  - “**Pod**: la unidad mínima, uno o más contenedores que corren juntos.”
  - “**Deployment**: define cuántos pods deben existir y gestiona las actualizaciones.”
  - “**ReplicaSet**: se asegura de que haya el número deseado de pods.”
  - “**Service**: expone un conjunto de pods hacia dentro o fuera del clúster con una IP/DNS estable.”
  - “**Namespace**: particiona el clúster por entornos o equipos.”
  - “**ConfigMap**: separa configuración del código.”
- “Un ejemplo típico es el `Service` tipo `LoadBalancer` que expone la app al exterior a través de un balanceador de carga de la nube.”

#### Preguntas rápidas
- “Si un Pod falla y desaparece, ¿quién se encarga de crear uno nuevo?”  
  - Reforzar: “El Deployment, a través del ReplicaSet.”
- “Si quiero que mi app sea accesible desde internet, ¿qué objeto debo crear?”  
  - Reforzar: “Un Service, usualmente tipo LoadBalancer o Ingress en nubes.”

<!-- VISUAL:
  - Diagrama de Kubernetes con:
    - Varios Pods dentro de un nodo.
    - Un Deployment arriba indicando el número de réplicas.
    - Un Service al frente actuando como puerta de entrada.
  - Resumen lateral en bullets: Pod, Deployment, Service, Namespace, ConfigMap. -->

---

### 2.6. Servicios de contenedores en AWS (15 min)

#### Guion hablado
- “Ahora conectamos todo esto con AWS: ¿cómo llevo mis contenedores a la nube de Amazon?”
- “AWS tiene tres piezas principales para trabajar con contenedores:”
  - “**ECS (Elastic Container Service)**: orquestador nativo de AWS para contenedores Docker; más sencillo si ya estás 100% en AWS.”
  - “**EKS (Elastic Kubernetes Service)**: Kubernetes gestionado; ideal si ya usas K8s o quieres portabilidad multi‑nube.”
  - “**Fargate**: motor serverless de contenedores; no gestionas servidores, solo declaras CPU y RAM por tarea.”
- “ECS y EKS pueden correr sobre EC2 o sobre Fargate. EC2 te da más control sobre los nodos; Fargate te simplifica la gestión a cambio de delegar la infraestructura.”
- “Otras piezas importantes en AWS:”
  - “**ECR (Elastic Container Registry)**: registro privado de imágenes, el ‘Docker Hub’ de AWS.”
  - “Seguridad con IAM y VPC: roles específicos para tareas/servicios, redes privadas para aislar.”
  - “Monitoreo con CloudWatch y tracing distribuido con X‑Ray.”
- “El flujo típico es: construyo mi imagen localmente o en CI, la subo a ECR, desde ECS/EKS creo una tarea/Deployment que use esa imagen, y la ejecuto en Fargate o EC2, mientras CloudWatch se encarga de las métricas y logs.”

#### Pregunta de integración
- “Piensa en tu pipeline ideal: ¿en qué punto pondrías la etapa de CI/CD que construye la imagen y la sube a ECR? Normalmente ocurre después de los tests automatizados y antes del despliegue en ECS/EKS.”

<!-- VISUAL:
  - Diagrama de flujo con cajas:
    1. Código en repo
    2. CI/CD → build imagen
    3. Push a ECR
    4. ECS/EKS toma la imagen
    5. Fargate/EC2 ejecuta contenedores
    6. CloudWatch/X-Ray monitorean
  - Iconos de AWS (opcionales) para cada servicio, o al menos nombres en cajas de color. -->

