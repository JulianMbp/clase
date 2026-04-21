## Bloque 5 · Módulo 8 · Ejercicio práctico sugerido (20 min)

### 5.1. Planteamiento del escenario

#### Guion hablado
- “Vamos a imaginar un escenario realista para aplicar todo lo de gestión, monitoreo y costos.”
- “Tenemos una aplicación web corriendo en AWS: puede estar en ECS, EKS o incluso en una instancia EC2 simple detrás de un balanceador.”
- “Lo que queremos es diseñar cómo la monitoreamos y cómo controlamos sus costos, sin entrar al detalle de cada clic en la consola.”

<!-- VISUAL:
  - Diagrama simple:
    Usuario → ALB (load balancer) → App (ECS/EKS/EC2).
  - Debajo, iconos o cajas de CloudWatch, Budgets y Cost Explorer conectadas a la app. -->

---

### 5.2. Diseño de métricas y dashboard

#### Guion hablado
- “Primero, pensemos en las métricas clave que queremos en un dashboard de CloudWatch.”
- “Para rendimiento de la app:”
  - “CPU promedio de las instancias o tareas.”
  - “Memoria usada.”
  - “Requests por segundo (RPS).”
  - “Latencia promedio y p95 (cola alta).”
  - “Errores HTTP 5xx.”
- “Para disponibilidad:”
  - “Porcentaje de uptime en los últimos 7 y 30 días.”
  - “Número de incidentes o alertas críticas activas.”
- “Para costos:”
  - “Gasto diario o mensual del stack de la aplicación (por etiquetas).”
  - “Comparación gasto actual vs presupuesto definido.”
- “Con esto, queremos un dashboard mínimo viable con 4 secciones: estado general, rendimiento, disponibilidad y costos.”

#### Actividad guiada
- “Piensa y, si quieres, anota: ¿qué gráfica específica pondrías arriba a la izquierda de tu dashboard? Esa suele ser la más importante.”

<!-- VISUAL:
  - Mock de dashboard dividido en 4 cuadrantes:
    1. Estado general (tarjetas de uptime, error rate).
    2. Rendimiento (líneas de CPU, memoria, latencia).
    3. Costos (barras de gasto por servicio o tag).
    4. Almacenamiento (barras de uso por bucket/volumen). -->

---

### 5.3. Diseño de alertas

#### Guion hablado
- “Después del dashboard, definimos las alertas que queremos que nos despierten cuando algo se sale de lo normal.”
- “Alertas de rendimiento típicas:”
  - “CPU > 80% durante N minutos → revisar escalado automático.”
  - “Latencia p95 por encima de X ms → investigar cuellos de botella.”
  - “Tasa de errores 5xx por encima de cierto porcentaje.”
- “Alertas financieras típicas usando AWS Budgets:”
  - “Al 50% del presupuesto mensual: aviso informativo.”
  - “Al 80%: señal de advertencia para revisar qué está pasando.”
  - “Al 100%: alerta crítica para tomar acción inmediata.”
- “También podemos disparar alertas por comportamiento ineficiente:”
  - “CPU < 10% durante más de 3 días en una instancia de producción → candidata a rightsizing.”

#### Caso guiado
- “Diseñemos al menos 2 alertas juntos:
  1. Una de rendimiento (por ejemplo, CPU o errores 5xx).
  2. Una financiera (porcentaje del presupuesto mensual).”

<!-- VISUAL:
  - Tabla con columnas: Tipo de alerta | Umbral | Acción esperada.
  - Ejemplos llenos: CPU > 80% / 10 min → revisar escalado; 80% presupuesto → revisar Cost Explorer; 100% presupuesto → escalar a equipo de decisión. -->

---

### 5.4. Política de apagado automático y ciclo de vida de datos

#### Guion hablado
- “Una palanca sencilla pero poderosa para ahorrar es el apagado automático de entornos no productivos.”
- “Muchos equipos dejan encendidos los entornos de desarrollo y pruebas 24/7 aunque solo se usen 8 horas al día.”
- “Si logras que esos entornos se apaguen automáticamente fuera de horario laboral, puedes reducir fácilmente más del 60% del costo de compute en esos entornos.”
- “En paralelo, definimos políticas de ciclo de vida de datos para S3:”
  - “Por ejemplo, logs de menos de 30 días en Standard.”
  - “De 30 a 90 días en Infrequent Access.”
  - “Más de 90 días en Glacier.”
  - “Y eliminación después de X meses o años, según el compliance.”
- “Este mix de apagado automático + ciclo de vida de datos suele dar resultados rápidos en la factura sin tocar la arquitectura central.”

<!-- VISUAL:
  - Gráfico de barras comparando costo de un entorno dev encendido 24h vs 8h.
  - Diagrama de línea de tiempo para datos en S3: 0–30d Standard, 30–90d IA, >90d Glacier, luego delete. -->

---

### 5.5. Cómo conectarlo con la guía de ejercicios del módulo 8

#### Guion hablado
- “La guía de ejercicios del módulo 8 probablemente tiene pasos concretos para crear presupuestos, alertas y dashboards en AWS.”
- “La idea es que lo que hicimos aquí de forma conceptual sea el mapa mental que luego ustedes aterrizan siguiendo esa guía paso a paso.”
- “Mi recomendación es que, mientras hagan los ejercicios, mantengan presente:
  - Las métricas clave que definimos.
  - El diseño del dashboard mínimo viable.
  - Los umbrales de alertas que les hagan sentido en su contexto.”
- “Así no se trata solo de hacer clics, sino de implementar algo que realmente podrían usar en un proyecto real.”

<!-- VISUAL:
  - Diapositiva con 3 bullets grandes:
    - “Definir métricas clave”
    - “Diseñar dashboard”
    - “Configurar alertas + presupuestos”
  - Nota lateral: “Usar la guía práctica del Módulo 8 como paso a paso técnico.” -->

