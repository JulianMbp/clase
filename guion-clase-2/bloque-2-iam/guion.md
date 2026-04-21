## Bloque 2 – Identidad, Acceso y Gobernanza (0:15 – 1:00)

> Objetivo: que vean IAM como algo cotidiano y esencial para cualquier solución en la nube.

### 2.1. Conectar con la vida diaria (5–7 min)

Texto sugerido (modo historia):

- “Antes de hablar de nubes y proveedores, quiero aterrizar algo muy simple: todos aquí ya usan sistemas de identidad y acceso todos los días, aunque no lo llamen así.”
- “Piensen un momento en su celular. ¿Cómo lo protegen? ¿PIN, patrón, huella, reconocimiento facial?”
- “Cuando el celular les pide una huella o un código, en realidad está respondiendo a dos preguntas:  
  1) ¿Quién eres?  
  2) ¿Te dejo entrar y qué te dejo hacer?”

Explica con frases cortas y claras:

- “Identidad es **quién eres** para el sistema: puede ser tu usuario, tu correo, tu huella, tu rostro, tu número de documento.”
- “Acceso es **a qué puedes entrar y qué puedes hacer** una vez que el sistema cree que eres tú: leer, escribir, borrar, cambiar configuraciones, ver tu saldo, hacer transferencias.”
- “Si tu celular no tuviera ningún tipo de bloqueo, cualquiera podría entrar, ver tus mensajes, tus fotos, tu banca móvil. Eso sería un ejemplo perfecto de **mala gestión de identidad y acceso**.”
- “Fíjense que no basta con tener identidad; también hay que tener reglas de acceso razonables.”

<!-- Sugerencia visual:
Diapositiva partida en dos:
  - Lado izquierdo: ícono de teléfono con candado.
  - Lado derecho: bullets cortos:
      - Identidad = "quién eres"
      - Acceso = "qué puedes hacer"
      - Gobernanza = "reglas y control contínuo"
-->

### 2.2. Llevarlo a la nube (5–7 min)

Ahora haces la traducción al cloud, muy paso a paso:

- “En la nube pasa exactamente lo mismo, solo que en vez de personas entrando a un celular, tenemos personas y servicios entrando a recursos de nube.”
- “Un recurso de nube puede ser una máquina virtual, una base de datos, un bucket de almacenamiento, una cola de mensajes, etc.”
- “Alguien tiene que decidir quién entra a cada recurso, con qué permisos y bajo qué condiciones. Ese ‘alguien’ no es una persona, es un sistema: **IAM, Identity and Access Management**.”

Define con frases simples:

- “IAM es el sistema que nos permite:
  - Crear y administrar usuarios.
  - Agrupar esos usuarios en grupos.
  - Definir roles con conjuntos de permisos.
  - Escribir políticas que dicen qué se puede hacer sobre qué recursos.”
- “Un **rol** es como un ‘puesto de trabajo’ dentro de la nube: por ejemplo, ‘administrador de base de datos’, ‘operador de lectura de reportes’, ‘devops de producción’.”
- “Una **política** es un documento técnico que responde a tres preguntas:
  - ¿Quién? (o qué rol/grupo/servicio).
  - ¿Sobre qué recurso?
  - ¿Con qué acciones? (leer, escribir, borrar, administrar…).”

Frase para fijar la idea:

- “Sin IAM bien diseñado, cualquier solución en cloud es un castillo de arena: puede verse profesional desde afuera, pero se cae con la primera ola de un error humano o un ataque.”
- “Cuando vean noticias de ‘empresa X expone datos en la nube’, muchas veces detrás hay un problema de IAM mal configurado.”

<!-- Sugerencia visual:
Diagrama muy simple:
  User/Service → Role → Policy → Resource
Ponerlo como flechas horizontales, con texto corto debajo de cada elemento.
-->

### 2.3. Principio de menor privilegio (5–7 min)

Explicación simple, pero muy clara:

- “Dentro de IAM hay una regla de oro que se repite en todas las buenas prácticas de seguridad: el **principio de menor privilegio**.”
- “Este principio dice literalmente: **da solo los permisos estrictamente necesarios para que alguien haga su trabajo y nada más**.”
- “Eso significa, por ejemplo, que:
  - Si alguien solo necesita leer reportes, no le das permisos para borrar bases de datos.
  - Si una aplicación solo necesita leer de un bucket S3, no le das permiso para borrar objetos en ese bucket.”

Ejemplo cotidiano:

- “Imaginemos una empresa donde hay un analista de reportes financieros. Su trabajo es entrar a un panel, ver gráficos y exportar algunos informes a Excel.”
- “Aplicando menor privilegio, a esa persona:
  - Le das acceso de solo lectura al panel de reportes.
  - No le das acceso a la consola de administración de la nube.
  - No le das permiso para crear usuarios nuevos ni cambiar parámetros de seguridad.”

Pregunta rápida (puede quedar retórica, tú mismo contestas):

- “¿Qué puede pasar si a alguien le damos permisos de más, o si una cuenta con muchos privilegios se ve comprometida?”
- “Podríamos tener:
  - Robo o filtración de datos sensibles.
  - Borrado accidental o malicioso de recursos en producción.
  - Incumplimiento de normas y multas por protección de datos.”
- “Por eso, las guías modernas de seguridad en la nube insisten tanto en que configuremos permisos muy específicos y evitemos permisos tipo ‘admin total’ salvo en casos muy controlados.”

<!-- Sugerencia visual:
Diapositiva con un semáforo:
  - Rojo: "Permisos de más" (riesgos altos).
  - Verde: "Solo lo necesario" (menor superficie de ataque).
Y una frase: "Menos permisos = menos riesgo".
-->

### 2.4. Mini-ejercicios guiados (con base en `pdf2.md`) (10–15 min)

Aquí usas 3–4 ejercicios como diálogo guiado. La idea es que el estudiante piense, aunque no responda en voz alta:

1. **Ejercicio 1 – Fundamentos de IAM**
   - “Les voy a leer un ejercicio rápido sobre autenticación, políticas y roles.”
   - Lees el enunciado tal como está en `pdf2.md`.
   - Dices: “Piensen un momento cuál creen que es la relación correcta, les doy 10–15 segundos.”
   - Luego dices: “La respuesta correcta es: a → 3, b → 2, c → 1” y explicas con calma:
     - “La **autenticación** es la parte que verifica quién eres. Es el famoso ‘login’: usuario y contraseña, o huella, o código de verificación.”
     - “Las **políticas** son los documentos que definen qué permisos se conceden. Por ejemplo: ‘puede leer objetos en este bucket, pero no puede borrarlos’.”
     - “Los **roles** agrupan esos permisos para un tipo de usuario o servicio. Así no asignamos permisos uno por uno, sino paquetes de permisos coherentes.”

2. **Ejercicio 2 – Menor privilegio**
   - Lees la situación del analista que solo debe ver reportes.
   - Preguntas: “¿Qué principio de seguridad se aplica aquí?”.
   - Luego respondes: “El **principio de menor privilegio**.”
   - Lo conectas: “No tiene sentido darle acceso de administrador de toda la organización a alguien que solo necesita ver reportes. Le damos exactamente lo que necesita, nada más.”

3. **Ejercicios 3 y 4 – Factores de autenticación y MFA**
   - Explicas los tres tipos de factores:
     - “Algo que sabes: una contraseña, un PIN.”
     - “Algo que tienes: tu teléfono con una app de códigos, un token físico, una llave de seguridad.”
     - “Algo que eres: tu huella, tu rostro, tu voz.”
   - Luego explicas MFA:
     - “MFA, o autenticación multifactor, combina al menos dos de estos factores. Por ejemplo: tu contraseña **y** un código que llega a tu teléfono.”
     - “Hoy en día las mejores prácticas recomiendan usar MFA al menos para cuentas muy sensibles, como la cuenta raíz de un proveedor cloud o los administradores.”

4. **Ejercicio 5 u 8 – Gobernanza y riesgos**
   - Elige uno donde se vea qué pasa si no hay buena gobernanza.
   - Lees el caso y preguntas: “¿Qué consecuencias ven aquí de no tener reglas claras ni supervisión?”
   - Luego enumeras tú mismo:
     - “Pérdida de control sobre quién tiene acceso a qué cosas.”
     - “Filtración de información sensible, muchas veces sin que nadie se dé cuenta al principio.”
     - “Dificultad para pasar auditorías y cumplir regulaciones.”

<!-- Sugerencia visual:
Use una sola diapositiva para todos los mini-ejercicios:
  - Título: "Mini-ejercicios IAM"
  - Cuatro recuadros numerados (1 a 4) con una frase clave:
      1. "Autenticación / Políticas / Roles"
      2. "Menor privilegio"
      3. "MFA: 2 o más factores"
      4. "Gobernanza: evitar caos y filtraciones"
Luego vas marcando verbalmente cada recuadro.
-->

### 2.5. Gobernanza como ciclo (5–7 min)

Explicación simple pero contextualizada:

- “Cuando hablamos de **gobernanza en la nube**, no hablamos de una herramienta específica, sino de todo el conjunto de políticas, procesos y controles que una organización define para que su entorno cloud no se convierta en un desorden.”
- “La gobernanza no es algo que se configura una vez y se olvida; es un proceso cíclico.”

Puedes explicarlo así:

1. “Primero, **definimos políticas**: por ejemplo, ‘todas las cuentas con acceso a producción deben tener MFA’, o ‘ningún bucket de almacenamiento con datos sensibles puede estar público en internet’.”
2. “Luego, **aseguramos que se cumplan**: usando herramientas de la nube que revisan configuraciones, aplicando plantillas estándar, usando automatizaciones que corrigen configuraciones inseguras.”
3. “Después, **auditamos actividades**: revisamos logs de acceso, quién creó qué recurso, quién cambió qué política, desde qué lugar se conectaron.”
4. “Finalmente, **mejoramos continuamente**: ajustamos las políticas cuando vemos que algo se queda corto o es demasiado permisivo, aprendemos de incidentes y de nuevas amenazas.”

Conecta con ejemplos concretos:

- “Por ejemplo, una buena práctica es revisar cada cierto tiempo:
  - Usuarios que ya no trabajan en la organización y siguen teniendo cuentas activas.
  - Permisos que se dieron temporalmente para un proyecto y nunca se retiraron.
  - Buckets de almacenamiento que alguien dejó públicos ‘solo para una prueba’ y se olvidó de cerrarlos.”

Frase de cierre del bloque:

- “Podemos resumir así: **IAM responde a quién entra y qué puede hacer hoy; la gobernanza se asegura de que eso siga siendo correcto mañana, pasado mañana y dentro de un año**.”

<!-- Sugerencia visual:
Diagrama circular de 4 pasos con flechas:
  1. Definir políticas
  2. Implementar
  3. Auditar
  4. Mejorar
En el centro: "Gobernanza cloud".
-->

### 2.6. Transición a máquinas virtuales (2–3 min)

Usa una frase de puente:

- “Ya sabemos quién puede entrar y con qué permisos. Ahora necesitamos un lugar donde corran las aplicaciones y servicios de esa organización en la nube.”
- “Ese lugar, en muchos casos, son las máquinas virtuales. Vamos a verlas.”

<!-- Sugerencia visual:
Diapositiva de transición:
  - Arriba: "IAM / Gobernanza" (con un check ✔).
  - Una flecha hacia abajo.
  - Abajo: "Máquinas virtuales (cómputo)".
Muy poco texto, solo sirve para cambiar el foco mental.
-->

