## Clase 2 · Bloques 7 y 8  
**Tema general**: Contenedores en la nube (Docker, Kubernetes, AWS ECS/EKS/Fargate) + Gestión, monitoreo, costos y próximos pasos en cloud.  
**Duración**: 3 horas (sesión virtual, asincrónica en vivo)  

---

## 1. Apertura y encuadre (10 min)
- **Objetivo del bloque**
  - Recordar que esta clase continúa lo visto en la clase 3 (bloques 5 y 6) y conecta con el uso práctico de la nube.
- **Guion**
  - Presentación rápida de la agenda:
    - Contenedores y servicios en AWS (Módulo 7).
    - Gestión, monitoreo, costos y próximos pasos (Módulo 8).
  - Explicar que la sesión es pensada para que:
    - Puedan seguirla aunque no participen activamente.
    - Tengan pequeñas preguntas “gancho” por si quieren opinar o escribir en el chat.
- **Pregunta opcional al grupo**
  - “¿Alguien ya ha usado Docker o Kubernetes en algún proyecto? ¿Para qué?”

---

## 2. Módulo 7 · Introducción a contenedores (70 min)

### 2.1. ¿Qué es un contenedor? (15 min)
- **Idea clave**
  - Contenedor = unidad estándar que empaqueta app + dependencias para correr igual en cualquier entorno.
- **Secuencia**
  - Explicar analogía del contenedor de barco (del HTML del módulo 7).
  - Diferencia **imagen vs contenedor**:
    - Imagen = plantilla inmutable.
    - Contenedor = instancia en ejecución.
  - Mostrar el flujo: `imagen nginx → docker run nginx → contenedor activo`.
- **Mini actividad**
  - Pedir que escriban en el chat/mentes:
    - “Piensa en una app de tu trabajo/estudios. ¿Qué cosas tendría que empaquetar dentro del contenedor (lenguaje, runtime, librerías, variables de entorno…)?”.  

### 2.2. Docker: componentes y Dockerfile (20 min)
- **Conceptos a cubrir**
  - Componentes: `Dockerfile`, Docker Engine, Docker Hub, redes, volúmenes (tabla del módulo 7).
  - Estructura básica de un `Dockerfile` (ejemplo Node 18 del HTML):
    - Imagen base (`FROM`).
    - Copia de archivos (`COPY`).
    - Instalación (`RUN`).
    - Comando de arranque (`CMD`).
- **Ejercicio práctico guiado (sin escribir código desde cero)**
  - Mostrar un `Dockerfile` sencillo (puedes reutilizar el de ejemplo del módulo 7).
  - Explicar línea por línea qué pasaría al hacer:
    - `docker build -t mi-app .`
    - `docker run -p 3000:3000 mi-app`
  - Comentar brevemente qué significan:
    - `-t` (tag / nombre de la imagen).
    - `-p` (mapeo de puertos).
- **Pregunta disparadora**
  - “Si su app corre hoy en su laptop en el puerto 3000, ¿qué ventaja tiene meterla en una imagen y correrla como contenedor?”

### 2.3. Comandos esenciales de Docker (15 min)
- **Contenido**
  - Tabla de comandos del módulo 7:
    - `docker build`, `docker run`, `docker ps`, `docker stop`, `docker logs`, `docker images`.
  - Flujo típico:
    - Escribir Dockerfile → `docker build` → `docker run` → `docker ps`.
- **Práctica corta tipo “simulación”**
  - Proponer un escenario:
    - “Tienes una app que ya está dockerizada. Quieres:
      1. Ver las imágenes que existen.
      2. Crear un contenedor.
      3. Ver si está corriendo.
      4. Pararlo.”
  - Pedir que escriban en el chat la secuencia de comandos que usarían (aunque se repitan):
    - Esperado: `docker images` → `docker run ...` → `docker ps` → `docker stop ...`.

### 2.4. Contenedores vs Máquinas Virtuales (10 min)
- **Puntos clave de la tabla del módulo 7**
  - Peso, tiempo de arranque, aislamiento, uso de recursos.
  - Cuándo seguir usando VMs (necesidad de SO completo, por ejemplo Windows sobre Linux).
- **Actividad de comparación rápida**
  - Presentar 2–3 escenarios y pedir que escriban en el chat:
    - “¿Resolverías esto mejor con contenedores o con VMs, y por qué?”
  - Escenarios ejemplo:
    - Migrar un monolito Windows legado.
    - Desplegar microservicios HTTP pequeños.

### 2.5. Kubernetes: orquestación de contenedores (15 min)
- **Contenido**
  - Rol de Kubernetes vs Docker:
    - Docker = corre contenedores.
    - K8s = orquesta, escala, hace self‑healing, actualizaciones sin downtime, balanceo.
  - Objetos principales (tabla módulo 7): Pod, Deployment, ReplicaSet, Service, Namespace, ConfigMap.
  - Ejemplo de `Service` tipo LoadBalancer (YAML del HTML).
- **Micro–actividad conceptual**
  - Preguntar:
    - “Si un Pod muere, ¿quién se asegura de levantar otro?” (Deployment / ReplicaSet).
    - “¿Qué objeto expone la app hacia afuera?” (Service).

### 2.6. Servicios de contenedores en AWS (15 min)
- **Contenido**
  - Comparar ECS, EKS y Fargate (tabla del módulo 7):
    - ECS: orquestador propio de AWS.
    - EKS: Kubernetes gestionado.
    - Fargate: ejecución serverless de contenedores.
  - Diferencia Fargate vs EC2 como motor de ejecución en ECS/EKS.
  - Aspectos clave: escalabilidad, seguridad (IAM, VPC, ECR), monitoreo (CloudWatch, X-Ray).
- **Ejercicio práctico guiado (alto nivel)**
  - Describir el **flujo típico en AWS** (ya está en el módulo):
    - Construir imagen → subir a ECR → desplegar con ECS/EKS → ejecutar en Fargate/EC2 → monitorear con CloudWatch.
  - Pedir que piensen en voz alta (chat):
    - “¿En qué parte del flujo pondrías una etapa de CI/CD (por ejemplo, GitHub Actions o CodePipeline)?”  

---

## 3. Módulo 7 · Ejercicio práctico integrador (20 min)

- **Objetivo**
  - Conectar conceptos: Dockerfile + comandos + comparación con VMs + visión de AWS.
- **Propuesta de ejercicio (para que lo hagan en su entorno)**
  1. Tomar una app sencilla (por ejemplo, una API Node o Python ya preparada en el curso).
  2. Crear/repasar un `Dockerfile` similar al mostrado:
     - Imagen base.
     - `COPY` del código.
     - `RUN` de instalación de dependencias.
     - `CMD` de arranque.
  3. Ejecutar localmente:
     - `docker build -t mi-api .`
     - `docker run -p 8080:8080 mi-api`
  4. Validar que la app responde en el navegador o con `curl`.
- **Indicaciones para la clase**
  - Explicar el ejercicio paso a paso en pantalla.
  - Aclarar que pueden intentarlo durante o después de la sesión.
  - Invitar a que compartan en el chat si alguien logra levantar el contenedor durante la clase.

---

## 4. Módulo 8 · Gestión, monitoreo y costos (70 min)

### 4.1. Gestión de recursos en la nube (Bloque 1 módulo 8) (15 min)
- **Ideas clave**
  - Gestión de recursos = ciclo de vida de instancias, almacenamiento, redes y evitar gastos innecesarios.
  - Señales de alerta en uso de CPU:
    - CPU > 85% sostenido → falta capacidad.
    - CPU < 10% varios días → sobredimensionamiento.
  - Recursos inactivos como costo oculto (tabla: instancias detenidas, volúmenes EBS huérfanos, Elastic IP sin usar, load balancers vacíos).
- **Actividad**
  - Mostrar la tabla de “recursos inactivos” y pedir:
    - “Escribe en el chat si en tu empresa/equipo has visto alguno de estos casos (aunque sea en on‑premise).”

### 4.2. Monitoreo y métricas clave (Bloque 2) (15 min)
- **Contenido**
  - ¿Por qué monitorear? (del módulo 8: datos → información accionable).
  - Categorías de métricas:
    - Rendimiento, disponibilidad, latencia, errores, tráfico, costo.
  - Disponibilidad y SLA:
    - Fórmula y tabla de “tres nueves”, “cuatro nueves”, “cinco nueves”.
  - Herramientas en AWS:
    - CloudWatch, X-Ray, Health Dashboard, Trusted Advisor.
- **Pregunta de reflexión**
  - “Si tuvieras que elegir SOLO 3 métricas para vigilar un servicio crítico, ¿cuáles serían y por qué?”  
    - Dejar unos minutos de silencio para que piensen y, si quieren, respondan en el chat.

### 4.3. Control y optimización de costos (Bloque 3) (15 min)
- **Contenido**
  - Causas de sobrecostos (módulo 8):
    - Recursos inactivos.
    - Sobredimensionamiento.
    - Falta de visibilidad.
  - Tipos de instancias y ahorro típico:
    - On‑Demand, Reserved, Savings Plans, Spot (tabla).
  - Data Lifecycle Management (DLM) en S3:
    - Flujo Standard → Infrequent Access → Glacier → expiración.
  - Herramientas de costo:
    - Cost Explorer, Budgets, Cost Allocation Tags, Trusted Advisor.
- **Ejercicio conceptual**
  - Plantear un caso:
    - “Tienes muchos logs en S3 de más de 6 meses que casi nunca consultas, y el costo de S3 sube cada mes.  
       ¿Qué política de ciclo de vida aplicarías? ¿A qué clase de almacenamiento los moverías?”

### 4.4. Dashboards efectivos y alertas financieras (Bloques 4 y 5) (15 min)
- **Dashboards (Bloque 4)**
  - Un dashboard es herramienta de decisión, no volcado de datos.
  - Buenas prácticas (tarjetas Hacer/No hacer):
    - Gráficos adecuados (líneas para tendencias, barras para comparación, gauges para umbrales).
    - Agrupar por categorías: rendimiento, costos, disponibilidad.
    - Colores con significado (rojo, amarillo, verde).
  - Estructura recomendada de un dashboard (tabla: estado general, rendimiento, disponibilidad, costos, almacenamiento).
- **Alertas financieras (Bloque 5)**
  - Rol de las alertas en evitar sorpresas de factura.
  - Ejemplo de presupuesto vs gasto (caja de $1200 → $1500).
  - Umbrales recomendados (50%, 80%, 100%) y acciones esperadas.
  - Políticas de apagado automático de entornos no productivos.
- **Actividad**
  - Pedir que imaginen el dashboard ideal de su proyecto:
    - “Si tuvieras un solo dashboard en CloudWatch para tu app, ¿qué 5 gráficas pondrías en la primera pantalla?”

### 4.5. Próximos pasos y madurez en gestión cloud (Bloque 6) (10 min)
- **Contenido**
  - Niveles de madurez (tabla: Básico, Intermedio, Avanzado).
  - Mejores prácticas consolidadas:
    - Rendimiento (Auto Scaling 60–80%, rightsizing, instancias reservadas).
    - Disponibilidad (SLA, latencia + uptime, health checks).
    - Costos (tags, Budgets, revisión periódica).
    - Almacenamiento (políticas de ciclo de vida).
    - Seguridad (IAM mínimo privilegio, CloudTrail, Security Hub).
    - Automatización (apagado automático, IaC).
- **Cierre conceptual**
  - Reforzar la idea del módulo 8:
    - “Monitoreo sin alertas es ruido; alertas sin presupuesto son números; la gestión efectiva une rendimiento, disponibilidad y costos para tomar decisiones antes del problema.”

---

## 5. Módulo 8 · Ejercicio práctico sugerido (20 min)

- **Objetivo**
  - Aterrizar gestión/monitoreo/costos en un escenario concreto de AWS, conectando con los ejercicios del módulo 8.
- **Ejercicio guiado (alto nivel, adaptable a la guía práctica)**
  1. Escenario base:
     - Una aplicación web desplegada en AWS (por ejemplo, en ECS/EKS o incluso en EC2 simple).
  2. Tareas:
     - Definir 3–5 métricas clave para monitorear en CloudWatch (CPU, memoria, latencia, RPS, errores 5xx).
     - Proponer un dashboard con:
       - Sección de estado general (uptime, errores activos).
       - Sección de rendimiento.
       - Sección de costos (gasto vs presupuesto).
     - Diseñar 2–3 alertas:
       - Una de rendimiento (CPU > 80% sostenido).
       - Una financiera (80% del presupuesto mensual).
       - Una por recursos inactivos (bajo uso de CPU por varios días).
     - Pensar una política sencilla de apagado automático para entornos dev/staging.
  3. Entregable sugerido:
     - Un esquema en texto o diagrama (no hace falta implementarlo todo en la sesión).
- **Indicaciones para la clase**
  - Explicar cómo se podría mapear esto a la **Guía de Ejercicios Prácticos Módulo 8**:
    - Revisar qué parte de la guía habla de presupuestos, alertas, dashboards, DLM.
    - Pedir que al menos bosquejen mentalmente (o en notas) cómo lo aplicarían en un proyecto propio.

---

## 6. Cierre de la clase (10–15 min)

- **Resumen rápido**
  - De Módulo 7:
    - Contenedor vs imagen.
    - Dockerfile + comandos esenciales.
    - Diferencias con VMs.
    - Rol de Kubernetes y servicios AWS (ECS, EKS, Fargate, ECR).
  - De Módulo 8:
    - Gestión de recursos, señales de alerta (CPU, recursos inactivos).
    - Monitoreo y métricas clave (rendimiento, disponibilidad, costos).
    - Optimización de costos (tipos de instancias, DLM, Budgets, Cost Explorer).
    - Dashboards efectivos y alertas financieras.
    - Niveles de madurez y mejores prácticas.
- **Preguntas abiertas para quien quiera responder**
  - “¿Qué concepto de contenedores te fue más útil o aclarador hoy?”
  - “¿Qué acción concreta podrías tomar mañana en tu entorno cloud para mejorar monitoreo o costos?”
- **Cierre**
  - Recordar que pueden revisar las guías de ejercicios de los módulos 7 y 8 para practicar:
    - Módulo 7: trabajar con contenedores (creación, despliegue, orquestación).
    - Módulo 8: optimizar recursos, monitorear rendimiento y costos, y planear próximos pasos.
  - Indicar próximos contenidos o la siguiente clase del curso, conectando con lo ya aprendido.

