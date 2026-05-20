## Bloque 4 · Módulo 8 · Gestión, monitoreo y costos (70 min)

### 4.1. Gestión de recursos en la nube (15 min)

#### Guion hablado
- “Ahora que sabemos cómo desplegar aplicaciones con contenedores, tenemos que ver cómo las gestionamos bien para que no se nos vaya la factura ni el rendimiento.”
- “Gestionar recursos en la nube significa controlar el ciclo de vida de instancias, almacenamiento, redes y servicios para que sean suficientes pero no excesivos.”
- “Hay dos señales de alerta clásicas en CPU:”
  - “CPU > 85% de forma sostenida: la máquina está sufriendo; probablemente falta capacidad o falta escalado automático.”
  - “CPU < 10% durante varios días: seguramente esa instancia está sobredimensionada; estás pagando de más por capacidad que no usas.”
- “Aquí nacen las decisiones de escalado:
  - “Escalado horizontal: más instancias detrás del balanceador.”
  - “Escalado vertical: cambiar a una instancia más grande.”
- “Otro gran agujero de gestión son los recursos **inactivos** que siguen generando costo sin aportar valor.”
- “Ejemplos típicos:”
  - “Instancias EC2 detenidas pero con volúmenes EBS que siguen cobrando.”
  - “Volúmenes EBS sin instancias asociadas.”
  - “Elastic IPs sin asociar.”
  - “Load balancers vacíos sin tráfico pero activos.”

#### Pregunta al grupo
- “¿En su entorno han visto alguna vez recursos ‘olvidados’ que seguían consumiendo, aunque nadie los usara?”

<!-- VISUAL:
  - Tabla con dos columnas:
    - Recurso | Problema / Acción recomendada
  - Debajo, un gráfico de barras simple con 2 barras: 
    - CPU muy alta, CPU muy baja, para ilustrar sobrecarga vs sobredimensionamiento. -->

---

### 4.2. Monitoreo y métricas clave (15 min)

#### Guion hablado
- “Monitorear no es ver grafiquitas por verlas; es transformar datos en decisiones.”
- “Si no monitoreamos, nos enteramos de los problemas cuando el usuario ya está sufriendo.”
- “Las categorías de métricas que más nos importan son:”
  - “Rendimiento: CPU, memoria, I/O, red.”
  - “Disponibilidad: uptime vs downtime.”
  - “Latencia: tiempo de respuesta.”
  - “Errores: tasas de HTTP 4xx/5xx.”
  - “Tráfico: requests por segundo.”
  - “Costo: cuánto estoy gastando por servicio, región o proyecto.”
- “La **disponibilidad** es clave para SLAs. Recordemos algunos números:”
  - “99.9% (‘tres nueves’) permite casi 8.7 horas de caída al año.”
  - “99.99% (‘cuatro nueves’), solo ~52 minutos.”
  - “99.999% (‘cinco nueves’), ~5 minutos al año.”
- “En AWS tenemos herramientas como:”
  - “**CloudWatch** para métricas, logs, alarmas y dashboards.”
  - “**X-Ray** para tracing distribuido entre microservicios.”
  - “**Health Dashboard** para ver el estado de los servicios de AWS.”
  - “**Trusted Advisor** para recomendaciones de rendimiento, seguridad y costos.”

#### Pregunta de reflexión
- “Si solo pudieras monitorear 3 métricas para tu servicio crítico, ¿cuáles elegirías y por qué?”

<!-- VISUAL:
  - Diagrama con 6 cajas etiquetadas: Rendimiento, Disponibilidad, Latencia, Errores, Tráfico, Costo.
  - Debajo, una cajita con “SLA” y la tabla de 99.9 / 99.99 / 99.999 con sus tiempos de caída. -->

---

### 4.3. Control y optimización de costos (15 min)

#### Guion hablado
- “Pasemos a costos, que es donde más duele cuando se hace mal.”
- “Los sobrecostos en la nube normalmente vienen de tres fuentes:”
  - “Recursos inactivos que se quedaron encendidos o almacenando datos.”
  - “Recursos sobredimensionados (máquinas demasiado grandes para la carga real).”
  - “Falta de visibilidad: nadie mira los reportes.”
- “En compute, AWS ofrece varios modelos para ahorrar:”
  - “On‑Demand: sin compromiso, ideal para pruebas y cargas impredecibles.”
  - “Reserved Instances: compromiso de 1 o 3 años; ahorros grandes para cargas estables.”
  - “Savings Plans: te comprometes a un nivel de gasto/hora, con más flexibilidad que las reservadas.”
  - “Spot Instances: capacidad sobrante de AWS con grandes descuentos, pero con riesgo de interrupción; útiles para procesos batch, CI/CD, etc.”
- “En almacenamiento, el concepto clave es **Data Lifecycle Management (DLM)**.”
- “No todo dato tiene que vivir en la clase de almacenamiento más cara toda su vida:”
  - “Datos activos en S3 Standard.”
  - “Datos poco accedidos en S3 Infrequent Access.”
  - “Logs históricos o archivos fríos en S3 Glacier.”
  - “Y finalmente, eliminación cuando ya no tienen valor.”
- “Para ver y controlar esos costos tenemos:”
  - “**Cost Explorer**: visualiza el gasto histórico por servicio, región, tag.”
  - “**AWS Budgets**: define presupuestos y configura alertas por umbrales.”
  - “**Cost Allocation Tags**: etiquetar recursos para saber quién gasta qué.”
  - “**Trusted Advisor** nuevamente, para detectar ineficiencias.”

#### Caso práctico verbal
- “Tienes un bucket de logs de más de 6 meses al que casi nunca accedes, pero tu factura de S3 no para de subir.”
- “Solución típica: política de ciclo de vida que mueva automáticamente los objetos viejos a S3 Glacier y, pasado cierto tiempo, los elimine.”

<!-- VISUAL:
  - Diagrama de flujo de datos:
    - S3 Standard → S3 IA → S3 Glacier → Eliminación.
  - Tabla pequeña con tipos de instancias (On‑Demand, Reserved, Savings Plans, Spot) y una columna de “Uso típico”. -->

---

### 4.4. Dashboards efectivos y alertas financieras (15 min)

#### Dashboards de monitoreo
- “Un dashboard no es un collage de gráficos; es una herramienta para tomar decisiones en menos de 30 segundos.”
- “Buenas prácticas de diseño:”
  - “Usar gráficos de líneas para tendencias en el tiempo (CPU, latencia).”
  - “Usar barras para comparar servicios o periodos (top 5 servicios por costo).”
  - “Usar gauges o indicadores de semáforo para métricas con umbral crítico (uso de presupuesto, error rate).”
  - “Agrupar métricas por categoría: rendimiento, disponibilidad, costos, almacenamiento.”
  - “Colores con significado consistente: rojo = crítico, amarillo = advertencia, verde = OK.”
- “Una estructura muy útil de dashboard incluye secciones como:”
  - “Estado general: uptime, errores activos, alertas abiertas.”
  - “Rendimiento: CPU, RAM, latencia, RPS.”
  - “Disponibilidad: % de uptime últimos 30 días, incidentes.”
  - “Costos: gasto actual vs presupuesto, top 5 servicios.”
  - “Almacenamiento: uso por bucket/volumen, datos sin acceso reciente.”

#### Alertas financieras
- “Las alertas financieras convierten el monitoreo en algo preventivo.”
- “Configuraciones típicas de umbrales de presupuesto:”
  - “Alerta informativa al 50% del presupuesto.”
  - “Alerta de advertencia al 80%.”
  - “Alerta crítica al 100%.”
- “Además, puedes disparar alertas por comportamiento de recursos, como CPU muy alta o muy baja durante cierto tiempo.”
- “Un ejemplo potente es combinar alertas de uso de CPU con alertas de presupuesto; así atacas tanto rendimiento como costo.”
- “Una práctica sencilla pero con gran impacto: políticas de apagado automático para entornos de desarrollo y pruebas fuera de horario laboral.”

#### Actividad breve
- “Imagina que tienes que diseñar un solo dashboard en CloudWatch para tu proyecto. ¿Qué cinco gráficas pondrías en la primera pantalla?”

<!-- VISUAL:
  - Mock de un dashboard:
    - Fila 1: tarjetas de estado (verde/amarillo/rojo) con uptime, error rate, presupuestos.
    - Fila 2: gráfico de CPU/latencia.
    - Fila 3: gráfico de costos por servicio.
  - Tabla adicional con umbrales 50% / 80% / 100% y la acción esperada. -->

---

### 4.5. Próximos pasos y madurez en gestión cloud (10 min)

#### Guion hablado
- “Para cerrar este módulo, pensemos en la madurez de gestión de nube como una escalera.”
- “En un nivel **básico**, la organización mira métricas y costos de forma manual, de vez en cuando, sin alertas automáticas.”
- “En un nivel **intermedio**, ya hay dashboards, alertas importantes configuradas y políticas de escalado razonables.”
- “En un nivel **avanzado**, hablamos de FinOps, automatización de rightsizing, políticas de ciclo de vida bien definidas, y presupuestos por equipo o proyecto.”
- “Algunas mejores prácticas consolidadas a las que queremos apuntar:”
  - “Rendimiento: Auto Scaling con umbrales realistas (por ejemplo 60–80% de CPU), revisión mensual de tamaño de instancias, uso de instancias reservadas para cargas estables.”
  - “Disponibilidad: SLA mínimo definido (99.9% suele ser un buen punto de partida), monitorear latencia y uptime juntos, health checks en balanceadores.”
  - “Costos: etiquetar todos los recursos, usar AWS Budgets, revisar Cost Explorer periódicamente.”
  - “Almacenamiento: políticas de ciclo de vida en S3, limpieza de snapshots y volúmenes sin uso.”
  - “Seguridad: IAM de mínimo privilegio, CloudTrail activo, revisión periódica de Security Hub.”
  - “Automatización: apagado automático en dev/staging, uso de Infrastructure as Code para reproducir entornos.”
- “La meta no es llegar a ‘perfecto’ de un día para otro, sino ir subiendo de peldaño poco a poco.”

<!-- VISUAL:
  - Gráfico de escalera con 3 peldaños: Básico → Intermedio → Avanzado.
  - En cada peldaño, 2–3 bullets cortos de características.
  - Llamar la atención con un recuadro: “¿En qué nivel estás hoy?” -->

