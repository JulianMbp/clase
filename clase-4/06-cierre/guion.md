## Bloque 6 · Cierre de la clase (10–15 min)

### 6.1. Recap rápido de Módulo 7 (contenedores)

#### Guion hablado
- “Antes de cerrar, hagamos un repaso muy rápido de lo que vimos hoy.”
- “En contenedores (Módulo 7):”
  - “Aprendimos qué es un contenedor y su diferencia con una imagen.”
  - “Vimos el rol del `Dockerfile` y los comandos esenciales: `docker build`, `docker run`, `docker ps`, `docker stop`, `docker logs`, `docker images`.”
  - “Compararmos contenedores con máquinas virtuales: cuándo conviene cada uno.”
  - “Introdujimos Kubernetes como la capa de orquestación que escala, repara y expone contenedores.”
  - “Conectamos todo eso con los servicios de contenedores en AWS: ECS, EKS, Fargate y ECR.”

<!-- VISUAL:
  - Diapositiva de resumen con 3 columnas:
    - Columna 1: Docker (imagen, contenedor, Dockerfile, comandos).
    - Columna 2: Kubernetes (Pods, Deployments, Services).
    - Columna 3: AWS (ECS, EKS, Fargate, ECR). -->

---

### 6.2. Recap rápido de Módulo 8 (gestión, monitoreo y costos)

#### Guion hablado
- “En la segunda parte (Módulo 8):”
  - “Vimos cómo gestionar recursos en la nube, detectando sobrecarga y sobredimensionamiento con métricas como la CPU.”
  - “Identificamos recursos inactivos típicos que generan costo sin valor (instancias detenidas, volúmenes huérfanos, IPs sin usar, balanceadores vacíos).”
  - “Revisamos categorías de métricas clave: rendimiento, disponibilidad, latencia, errores, tráfico y costo.”
  - “Hablamos de control de costos con tipos de instancias (On‑Demand, Reserved, Savings Plans, Spot) y Data Lifecycle Management en S3.”
  - “Diseñamos dashboards efectivos y alertas financieras basadas en presupuestos y comportamiento de recursos.”
  - “Vimos la escalera de madurez en gestión cloud: básico, intermedio, avanzado, y algunas mejores prácticas para cada dimensión.”

<!-- VISUAL:
  - Diapositiva con un checklist:
    - Gestión de recursos (CPU, recursos inactivos)
    - Monitoreo y métricas
    - Optimización de costos (instancias, DLM)
    - Dashboards + alertas
    - Madurez y buenas prácticas -->

---

### 6.3. Preguntas de reflexión final

#### Guion hablado
- “Me gustaría dejarles dos preguntas para que reflexionen y, si quieren, las respondan por el chat o en sus notas:”
  - “¿Qué concepto de contenedores te aclaró más el panorama hoy? ¿Imagen vs contenedor, Dockerfile, Kubernetes, ECS/EKS/Fargate…?”
  - “¿Qué acción concreta podrías tomar en tu entorno cloud (o en un proyecto futuro) para mejorar monitoreo o costos a partir de lo que vimos hoy?”
- “Responder estas preguntas, aunque sea en privado, les ayuda a fijar el aprendizaje y a traducirlo en pasos accionables.”

<!-- VISUAL:
  - Diapositiva con las dos preguntas escritas en grande.
  - Espacio en blanco para que la audiencia imagine que “escribe” sus respuestas. -->

---

### 6.4. Cierre y próximos pasos

#### Guion hablado
- “Para cerrar, recuerden que tienen dos cosas importantes para practicar:”
  - “La guía de ejercicios del Módulo 7, donde pueden jugar con contenedores, imágenes, despliegues y orquestación.”
  - “La guía de ejercicios del Módulo 8, donde pueden practicar la parte de monitoreo, dashboards, presupuestos y alertas.”
- “Mi recomendación es que elijan un servicio o mini‑proyecto realista y traten de aplicarle al menos:
  - Un Dockerfile bien hecho.
  - Un par de dashboards básicos.
  - Y al menos un presupuesto con alertas.”
- “Muchas gracias por el tiempo y la atención. Ojalá que a partir de hoy vean la nube no solo como un lugar donde desplegar cosas, sino como un entorno que se puede orquestar, medir y optimizar de forma continua.”

<!-- VISUAL:
  - Diapositiva final con:
    - “Gracias” en grande.
    - Bullet corto: “Practica → Docker + Monitoreo + Costos”.
    - Referencia simple: “Revisa las guías prácticas de los Módulos 7 y 8”. -->

