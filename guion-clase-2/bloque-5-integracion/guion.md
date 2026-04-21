## Bloque 5 – Mini caso de arquitectura (2:30 – 2:50)

> Objetivo: que vean todas las piezas juntas en un escenario sencillo y realista.

### 5.1. Presentar el caso (3–4 min)

Cuenta el caso como una pequeña historia:

- “Imaginemos una pequeña tienda online que quiere montar su e‑commerce en la nube.”
- “Necesita que sus usuarios se registren e inicien sesión, ver productos, hacer compras, y que todo eso sea razonablemente seguro y no arruine el presupuesto.”

Lista los componentes que va a necesitar:

- Usuarios autenticados.
- Una aplicación web.
- Una base de datos.
- Almacenamiento para imágenes de productos.
- Controle de costos y seguridad básica.

<!-- Sugerencia visual:
Diapositiva con dibujo muy simple de la tienda:
  - Ícono de tienda.
  - Flecha hacia una nube.
  - Dentro de la nube, 4 íconos:
      1. IAM (usuario con candado).
      2. App web (pantalla).
      3. Base de datos (cilindro).
      4. Storage de imágenes (ícono de foto).
-->

### 5.2. Preguntas guiadas sobre IAM (5 min)

Lanza las preguntas, aunque nadie responda, y tú mismo vas construyendo la respuesta:

- “Primero: ¿qué roles mínimos definirían?”
  - Propuesta:
    - Admin cloud (muy restringido, pocas personas).
    - Operador de la app (puede desplegar versiones, ver logs).
    - Lector/reportes (solo lectura de ciertos datos).
- “¿Dónde aplicarías MFA?”
  - En:
    - Cuentas de administradores.
    - Cuentas con acceso a datos sensibles o a la consola de la nube.
- “¿Cómo aplicas el principio de menor privilegio?”
  - Cada rol solo con los permisos estrictamente necesarios.
  - Evitar usar cuentas “root” o súper admin para tareas del día a día.

Frase clave:

- “Desde IAM definimos quién toca qué, y eso ya pone un límite muy fuerte a los posibles daños.”

<!-- Sugerencia visual:
Tabla pequeña:
  - Columnas: Rol | Qué puede hacer | MFA.
  - Filas: Admin, Operador, Lector.
Así ven rápidamente la idea de separación de responsabilidades.
-->

### 5.3. Preguntas guiadas sobre VMs (5–7 min)

Conéctalo con cómputo:

- “Ahora pensemos dónde va a correr esta aplicación.”
  - Opción simple: una VM de uso general (web + backend en la misma máquina).
  - Sistema operativo Linux (por ejemplo).

Preguntas que te haces en voz alta:

- “¿Qué tamaño de VM usaría al inicio?”
  - Pequeña, porque el tráfico de una tienda nueva no es masivo.
  - Basada en CPU/RAM que cubran el uso normal sin sobrar demasiado.
- “¿Configuro autoescalado desde el inicio?”
  - Puedes comentar que al principio puede que no sea crítico, pero debe estar en el diseño para el futuro.
- “¿Qué prácticas aplico para resiliencia?”
  - Backups.
  - Posible réplica en otra zona de disponibilidad.
  - Monitoreo de CPU, memoria, errores.

Frase:

- “Aquí se ve la conexión entre rendimiento y costo: si pongo una VM enorme ‘por si acaso’, estoy quemando dinero.”

<!-- Sugerencia visual:
Diagrama simple:
  - Usuario → Internet → VM (App web).
Al lado de la VM:
  - Iconitos de CPU y RAM con texto "tamaño pequeño / general purpose".
-->

### 5.4. Preguntas guiadas sobre almacenamiento (5–7 min)

Conecta con los datos:

- “¿Dónde guardo la información de los pedidos, usuarios, etc.?”
  - En una base de datos (podría ser un servicio gestionado), respaldada por almacenamiento por bloques.
- “¿Dónde guardo las imágenes de los productos?”
  - En almacenamiento de objetos (S3/Blob/Cloud Storage) por:
    - Escalabilidad.
    - Bajo costo para muchos archivos.
    - Facilidad de distribución.
- “¿Qué hago con logs y datos históricos?”
  - Políticas de ciclo de vida para moverlos a almacenamiento frío después de cierto tiempo.

Frase de resumen:

- “Cada tipo de dato va a su lugar ideal, y eso reduce costos y mejora el rendimiento.”

<!-- Sugerencia visual:
Diagrama de tres flechas que salen de la VM:
  - Hacia un cilindro (DB) → "Datos transaccionales (bloques)".
  - Hacia un ícono de foto → "Imágenes (objetos)".
  - Hacia un archivo con reloj → "Logs históricos (frío / ciclo de vida)".
-->

### 5.5. Dibujo mental de la arquitectura completa (3–5 min)

Vuelves a recorrer todo de forma narrativa:

- “Un usuario se registra y entra a la app → eso pasa por IAM y autenticación.”
- “La app corre en una VM en la nube, en una región cercana al país.”
- “La VM habla con una base de datos donde guarda pedidos y usuarios.”
- “Las imágenes de productos se guardan en almacenamiento de objetos.”
- “Los logs de la app se van moviendo a almacenamiento más barato con el tiempo.”
- “Roles y políticas controlan quién puede tocar cada cosa.”

Mensaje:

- “Esto ya es una mini arquitectura cloud bastante cercana a algo real que podríamos hacer en cualquier proveedor.”

<!-- Sugerencia visual:
Una sola diapositiva resumen de arquitectura:
  - Usuario → IAM → App (VM) → DB (bloques)
                                   ↘ Storage objetos (imágenes)
                                   ↘ Storage frío (logs)
Con flechas claras y nombres cortos.
-->

### 5.6. Conexión con el perfil profesional (2–3 min)

Remata este bloque conectando con el futuro laboral:

- “El tipo de preguntas que acabamos de hacernos son las que se hace un arquitecto cloud en la vida real.”
- “No es solo saber qué es una VM o qué es S3, sino decidir cuándo usar cada cosa y cómo combinarlas cuidando seguridad y costos.”

Frase final del bloque:

- “Mientras avanzamos en el curso, la idea es que ustedes ganen la confianza para proponer arquitecturas así, con criterio propio.”

<!-- Sugerencia visual:
Diapositiva final del bloque:
  - Título: "Pensando como arquitecto cloud".
  - 3 bullets:
      - Decidir tecnologías.
      - Balancear costo y seguridad.
      - Comunicar la solución con diagramas claros.
-->

