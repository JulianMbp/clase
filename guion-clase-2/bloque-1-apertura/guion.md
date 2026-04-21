## Bloque 1 – Apertura y encuadre (0:00 – 0:15)

> Objetivo: romper el hielo, conectar con la clase anterior y explicar el mapa del día.

### 1.1. Saludo e introducción (2–3 min)

Texto sugerido (puedes leer casi literal y ajustar tu tono):

- “Hola a todos, bienvenidos a esta segunda clase de cloud computing.”
- “Quiero empezar con un pequeño recordatorio de lo que vimos en la **Clase 1**.”
- “En la clase pasada hablamos de que esta no es solo una clase de cloud, sino una clase de **poder** para ingenieros: entendimos que la IA puede escribir código, pero no decide arquitectura, costos, resiliencia ni escalabilidad; eso sigue siendo trabajo humano.”
- “Vimos que la nube nació como una necesidad interna (almacenamiento como S3, cómputo reutilizable) y terminó convertida en negocio: de 4 servicios a más de 400 en AWS, y lo mismo en Azure y GCP.”
- “Repasamos los modelos **IaaS, PaaS y SaaS**, quién administra qué en cada uno, y cómo una mala elección de modelo puede romper sistemas o inflar costos.”
- “También vimos que la nube **no es automáticamente** segura, barata ni escalable: amplifica las buenas decisiones, pero también las malas.”
- “Con esa base, hoy vamos a dar un paso más: vamos a juntar varias piezas que normalmente se estudian por separado: identidades y accesos, máquinas virtuales y almacenamiento.”
- “La idea es que al final de la sesión ustedes puedan mirar una solución en la nube y decir: ‘entiendo quién entra, dónde corre la aplicación y dónde viven los datos, y además cuánto puede costar hacerlo mal o hacerlo bien’.”
- “No se preocupen si algunos términos todavía suenan nuevos, la clase está pensada para ir conectando conceptos poco a poco.”

<!-- Sugerencia visual:
Diapositiva muy simple con título grande:
  - Título: "Clase 2 – De la teoría a la arquitectura"
  - Subtítulo: "IAM · Máquinas virtuales · Almacenamiento"
  - Fondo claro, sin mucho texto.
-->

### 1.2. Alinear expectativas (3–5 min)

Puntos clave a mencionar (puedes leerlos tal cual):

- “La meta de hoy **no** es que se aprendan de memoria nombres de servicios como si esto fuera un examen de vocabulario.”
- “La meta es que empiecen a pensar como arquitecto o ingeniero cloud. Es decir, que se acostumbren a hacerse preguntas como:  
  ‘¿Quién entra?’, ‘¿A qué recursos entra?’, ‘¿En qué máquina está corriendo esto?’, ‘¿Dónde se están guardando los datos?’ y ‘¿Cuánto me está costando esta decisión?’.”
- “Vamos a tener una mezcla de explicación, mini ejercicios y un caso sencillo de arquitectura para que todo tenga sentido junto.”
- “Si pueden participar en el chat, perfecto, voy a ir leyendo algunos comentarios; si no, igual voy a ir explicando todo paso a paso, como si estuviéramos construyendo la solución juntos sobre una pizarra.”
- “También les voy a ir dando ideas de laboratorios para que ustedes mismos puedan practicar luego en su cuenta de nube, especialmente aprovechando las capas gratuitas.”

<!-- Sugerencia visual:
Diapositiva tipo lista con tres bullets grandes:
  1. "Entender IAM y gobernanza"
  2. "Entender VMs y costo"
  3. "Entender almacenamiento y ciclo de vida"
Y abajo una flecha que apunte a: "Mini arquitectura final".
-->

### 1.3. Pregunta activadora (5 min)

Lanza la pregunta y guía tú mismo la reflexión:

- “Antes de arrancar con definiciones, quiero que pensemos un momento en algo que todos hacemos varias veces al día.”
- “Piensa en una app que uses todos los días: puede ser la app de tu banco, Netflix, Spotify, Instagram, TikTok… la que quieras.”
- “Cuando tú simplemente **tocas el ícono y la app se abre**, ¿qué cosas crees que están pasando en la nube detrás de ese gesto tan sencillo?”
- (Aquí haces una pausa de 10–15 segundos para que piensen o escriban en el chat).
- Si hay respuestas, las lees y las conectas. Si no, continúas así:
  - “Detrás de ese gesto tan simple están pasando muchas cosas:
     - Hay un sistema que te reconoce como usuario, eso es identidad.
     - Hay reglas que deciden a qué partes de la aplicación puedes entrar y a cuáles no, eso es control de acceso.
     - Hay uno o varios servidores en la nube donde está corriendo el código de la aplicación, eso son máquinas virtuales u otros tipos de cómputo.
     - Y hay sistemas de almacenamiento donde se guardan tus datos, tus preferencias, tu historial, tus fotos, tus transacciones.”

Frase de transición (puedes leerla textual):

- “Todo lo que vamos a ver hoy está escondido detrás de ese simple gesto de abrir una app.  
  Vamos a ir bloque por bloque, empezando por la pregunta más básica: **¿quién eres tú para la nube y qué puedes hacer ahí dentro?**”

<!-- Sugerencia visual:
Diapositiva con un dibujo sencillo:
  - A la izquierda un ícono de un celular.
  - Una flecha hacia la derecha.
  - A la derecha cuatro íconos pequeños con texto:
      1. "Identidades"
      2. "Accesos"
      3. "Máquinas virtuales"
      4. "Almacenamiento"
Sirve como mapa visual de toda la clase.
-->

