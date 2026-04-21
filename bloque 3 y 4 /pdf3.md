# Guía de Ejercicios Prácticos — Módulo 3  
## Cómputo y Máquinas Virtuales

---

# Ejercicio 1 – Selección de instancias

## Situación
Una aplicación web de e-commerce tiene **picos de tráfico los fines de semana** y **bajo uso entre semana**.

## Pregunta
¿Qué tipo de instancia sería más adecuada para este caso?

A) Instancia de uso general permanente.  
B) Instancia optimizada para memoria con autoescalado activado.  
C) Instancia de cómputo fijo sin escalabilidad.  
D) Instancia reservada por largo plazo sin ajuste automático.

## Respuesta
**B) Instancia optimizada para memoria con autoescalado activado.**

## Explicación
Las aplicaciones con **demanda variable** necesitan flexibilidad y capacidad de **escalar según la carga**, evitando sobrecostos cuando el tráfico disminuye.

---

# Ejercicio 2 – Dimensionamiento adecuado (Sizing)

## Pregunta
Si una máquina virtual utiliza en promedio un **40% de CPU** y el tráfico aumenta **un 80% en temporada alta**, ¿qué estrategia de dimensionamiento deberías aplicar?

A) Aumentar la instancia base al doble de capacidad todo el año.  
B) Implementar escalado automático basado en **CPU >70%**.  
C) Contratar instancias más potentes solo durante el fin de año.  
D) Mantener la misma configuración y aceptar menor rendimiento.

## Respuesta
**B) Implementar escalado automático basado en CPU >70%.**

## Proceso
El monitoreo del uso de CPU permite **activar instancias adicionales cuando la carga aumenta**, manteniendo eficiencia y control de costos.

---

# Ejercicio 3 – Costo vs Rendimiento

## Pregunta
¿Cuál de los siguientes factores influye más en el **costo total de una máquina virtual**?

A) Tipo de almacenamiento (SSD o HDD).  
B) Número de zonas de disponibilidad.  
C) Cantidad de CPU virtuales y RAM asignadas.  
D) Longitud del nombre del servidor.

## Respuesta
**C) Cantidad de CPU virtuales y RAM asignadas.**

## Explicación
Los **recursos de cómputo** (CPU y memoria) son los principales responsables del costo. Elegirlos correctamente evita **sobredimensionar la infraestructura**.

---

# Ejercicio 4 – Monitoreo y resiliencia

## Situación
Una empresa detecta que su **servidor principal se cayó por una falla en el sistema operativo**.

## Pregunta
¿Qué acción preventiva habría evitado el impacto total del servicio?

A) Tener un sistema de **monitoreo con alertas y respaldo automatizado**.  
B) Desactivar los registros para ahorrar espacio.  
C) Aumentar el tamaño de la instancia indefinidamente.  
D) Ignorar errores menores hasta que ocurra una caída.

## Respuesta
**A) Tener un sistema de monitoreo con alertas y respaldo automatizado.**

## Explicación
La **resiliencia** se logra con:

- Monitoreo activo  
- Respaldos frecuentes  
- Redundancia de sistemas

---

# Ejercicio 5 – Autoescalado

## Pregunta
¿Cuál es el principal beneficio del **autoescalado en entornos cloud**?

A) Garantiza que las instancias nunca fallen.  
B) Ajusta automáticamente la capacidad según la demanda real.  
C) Reduce la velocidad de respuesta para equilibrar cargas.  
D) Permite programar tareas sin importar el tráfico.

## Respuesta
**B) Ajusta automáticamente la capacidad según demanda real.**

## Explicación
El autoescalado permite:

- Mantener rendimiento óptimo
- Evitar costos innecesarios
- Escalar sin intervención manual

---

# Ejercicio 6 – Escenario de costo optimizado

## Situación
Un servicio de **análisis de datos** solo se ejecuta **los lunes y jueves durante 3 horas**.

## Pregunta
¿Qué tipo de instancia sería más rentable?

A) Instancias reservadas de 24/7.  
B) Instancias bajo demanda (**On-Demand**).  
C) Instancias dedicadas permanentes.  
D) Instancias compartidas sin escalado.

## Respuesta
**B) Instancias bajo demanda (On-Demand).**

## Explicación
Permiten **pagar únicamente por el tiempo real de uso**, lo que las hace ideales para cargas de trabajo **intermitentes**.

---

# Ejercicio 7 – Backups y continuidad

## Pregunta
Selecciona **las dos prácticas más efectivas** para garantizar continuidad ante fallos de una máquina virtual.

A) Monitoreo de logs y copias automáticas.  
B) Incrementar el tamaño de CPU.  
C) Replicación de la VM en otra zona.  
D) Deshabilitar el acceso remoto.

## Respuesta
**A) y C)**

## Explicación
La combinación de:

- Monitoreo y copias automáticas
- Replicación geográfica

permite garantizar **alta disponibilidad incluso ante fallos locales**.

---

# Ejercicio 8 – Cálculo de eficiencia

## Ejemplo práctico

Una instancia con:

- **4 vCPU**
- **8 GB RAM**
- Costo de **$0.15 por hora**

La aplicación usa **solo el 50% de recursos** y está activa **12 horas al día durante 30 días**.

---

## 1. Cálculo del costo mensual

Costo mensual:


0.15 × 12 × 30 = $54


---

## 2. Cálculo del desperdicio

Uso real: **50%**

Desperdicio:


$54 × 0.5 = $27


## Respuesta
**$27 al mes se desperdician por recursos no utilizados.**

## Conclusión
El **sobreaprovisionamiento** aumenta el costo sin mejorar el rendimiento real.

---

# Ejercicio 9 – Evaluación de rendimiento

## Pregunta
¿Qué métrica es más útil para decidir si una máquina virtual necesita escalar?

A) Porcentaje de uso de CPU  
B) Nombre del sistema operativo  
C) Número de usuarios registrados  
D) Dirección IP asignada

## Respuesta
**A) Porcentaje de uso de CPU**

## Explicación
Las métricas clave para escalado incluyen:

- CPU
- Memoria
- Latencia

---

# Ejercicio 10 – Análisis reflexivo

## Pregunta
¿Cómo lograrías un **equilibrio entre costo, rendimiento y resiliencia** en una infraestructura basada en máquinas virtuales?

## Orientación para la respuesta

- Usar instancias adecuadas al perfil de carga (evitar sobredimensionamiento).
- Implementar **autoescalado** y **monitoreo proactivo**.
- Aplicar **copias de seguridad y redundancia zonal**.
- Utilizar **instancias reservadas o spot** cuando el uso sea predecible o flexible.

## Conclusión
El equilibrio se logra combinando:

- Automatización
- Análisis de consumo
- Resiliencia estructurada