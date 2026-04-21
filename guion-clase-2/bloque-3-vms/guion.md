## Bloque 3 – Máquinas Virtuales y Cómputo en la Nube (1:00 – 1:45)

> Objetivo: que entiendan qué es una VM, cómo se dimensiona y cómo se conecta con costo y disponibilidad.

### 3.1. ¿Qué es una máquina virtual? (5–7 min)

Texto sugerido, narrado:

- “Vamos a hablar ahora de la pieza donde realmente corre el código de nuestras aplicaciones en la nube: las máquinas virtuales.”
- “Una **máquina virtual** en la nube es, en esencia, un servidor que vive en algún centro de datos del mundo y al que tú te conectas por internet.”
- “También la van a escuchar con otros nombres como ‘instancia’ o ‘recurso de cómputo’, pero la idea base es la misma: es una computadora remota que tú no compras, sino que **alquilas por tiempo de uso**.”

Aclara la ubicación:

- “Estos servidores no están en el vacío, están organizados por el proveedor en:
  - **Regiones**, que son zonas geográficas grandes, normalmente asociadas a un país o ciudad principal.
  - **Zonas de disponibilidad**, que son varios centros de datos dentro de una misma región.”
- “Elegir la región no es un detalle menor:
  - Afecta la **latencia** (qué tan rápido llega la información al usuario).
  - Afecta temas de **regulación y cumplimiento** (por ejemplo, dónde pueden residir ciertos datos).
  - Afecta incluso el **costo** en algunos proveedores.”

<!-- Sugerencia visual:
Mapa muy simple del mundo con 3–4 puntos:
  - Cada punto etiquetado como "Región".
  - Dentro de un recuadro, tres íconos de servidores como "Zonas de disponibilidad".
Texto corto: "VM = servidor remoto en una región".
-->

### 3.2. Bare metal vs VMs (3–5 min)

Explica la diferencia con calma:

- “Dentro del cómputo en la nube podemos encontrar dos sabores principales de servidores:
  - Los servidores **bare metal**.
  - Y las máquinas virtuales ‘normales’.”
- “Un servidor **bare metal** es como si el proveedor te diera toda la máquina física completa para ti solo: todos los procesadores, toda la memoria, todos los discos, sin compartir con nadie.”
- “Una **VM típica** comparte el hardware físico con otras VMs, pero cada una está **aislada a nivel lógico** gracias al hipervisor.”

Comparación con analogía:

- “Piensen en un edificio y en los apartamentos:
  - El edificio completo sería el bare metal: lo arriendas entero, lo configuras a tu manera, pagas por toda la estructura.
  - Los apartamentos serían las VMs: compartes edificio, ascensor, estructura, pero cada apartamento tiene su puerta, sus llaves y su privacidad.”
- “En la práctica, la mayoría de soluciones del día a día funcionan perfecto con ‘apartamentos’ (VMs), y solo en casos muy específicos de rendimiento o requisitos legales se usa bare metal.”

<!-- Sugerencia visual:
Diapositiva con dos columnas:
  - Izquierda: "Bare metal" con ícono de un solo servidor grande.
  - Derecha: "Máquinas virtuales" con el mismo servidor subdividido en 3–4 cajitas (VM1, VM2, VM3).
-->

### 3.3. Componentes clave de una VM (5–7 min)

Desglosa claramente, como si estuvieras guiando un asistente de creación de VM:

- “Cuando vamos a crear una máquina virtual, normalmente el proveedor nos hace una serie de preguntas técnicas. Lo que en realidad nos está pidiendo es que definamos cuatro cosas principales:”
  - “**CPU (vCPUs)**: cuánta capacidad de procesamiento va a tener. Más vCPUs significa más capacidad de cálculo, pero también más costo.”
  - “**Memoria RAM**: cuánto espacio de memoria tendrá disponible para mantener datos y procesos activos. Si nos quedamos cortos de RAM, la aplicación se vuelve lenta o inestable.”
  - “**Disco**: cuánto almacenamiento necesitamos y de qué tipo (por ejemplo, discos SSD más rápidos o discos estándar más baratos).”
  - “**Sistema operativo**: si la máquina va a correr Linux, Windows u otro SO compatible.”

Conecta con casos de uso:

- “No es lo mismo diseñar una VM para una **base de datos transaccional**, que para un **servidor web ligero**, o para un **sistema de análisis de datos o machine learning**.”
- “Cada tipo de aplicación tiene un perfil distinto de CPU, RAM y disco. Por ejemplo:
  - Una base de datos suele requerir más RAM y disco rápido.
  - Un servidor web básico quizás prioriza CPU y menos disco.
  - Un sistema de analítica puede necesitar bastante CPU, mucha RAM y almacenamiento grande para los datos.”

Frase clave:

- “El truco en cloud es darle **lo justo y necesario** a cada VM: ni quedarnos cortos y sufrir en rendimiento, ni irnos al extremo y pagar por recursos que nunca se usan.”

<!-- Sugerencia visual:
Tabla muy pequeña:
  - Columnas: Tipo de servidor | CPU | RAM | Disco.
  - Filas de ejemplo: "Web", "Base de datos", "Analítica".
No hace falta que tenga números exactos, solo mostrar que se ajusta a cada caso.
-->

### 3.4. Costo y dimensionamiento (5–7 min)

Texto guiado:

- “En la nube no solo pensamos en que algo funcione, sino en **cuánto cuesta que funcione bien**.”
- “El costo de una VM depende principalmente de:
  - Cuántas vCPUs tiene.
  - Cuánta RAM le asignamos.
  - Qué tipo de disco usamos y de qué tamaño.
  - Y muy importante: **cuántas horas al mes está encendida**.”

Conecta con el concepto de desperdicio:

- “Si tu VM está configurada con muchos más recursos de los que realmente usa (por ejemplo, usa en promedio solo el 30–40% de CPU), significa que estás pagando por capacidad que se queda ociosa casi todo el tiempo.”
- “A eso le llamamos **sobre aprovisionar**: pagar de más sin obtener una mejora real de rendimiento.”
- “Por eso, una de las habilidades clave de un buen ingeniero cloud es aprender a **dimensionar**: elegir el tamaño correcto hoy, monitorear el uso real y ajustar cuando sea necesario.”

<!-- Sugerencia visual:
Gráfica de barras simple:
  - Barra 1: "Recursos pagados" (100%).
  - Barra 2: "Recursos usados" (40%).
Abajo un texto: "60% de desperdicio".
-->

### 3.5. Mini-ejercicios guiados (basados en `pdf3.md`) (15–20 min)

Escoge 3–4 ejercicios clave:

1. **Ejercicio 1 – Selección de instancias con picos de tráfico**
   - Lees que hay picos los fines de semana y bajo uso en semana.
   - Preguntas: “¿Qué estrategia suena más lógica: algo fijo y grande o algo que pueda escalar?”
   - Explicas por qué la opción con autoescalado y recursos adecuados es mejor.

2. **Ejercicio 2 – Dimensionamiento con CPU al 40% y aumento de tráfico**
   - Planteas la pregunta sobre qué hacer cuando la carga aumenta.
   - Guias hacia la idea de **autoescalado basado en CPU** en vez de duplicar todo todo el año.

3. **Ejercicio 3 – Costo vs rendimiento**
   - Recalcas que CPU y RAM son los factores clave de costo.
   - Explicas que poner una VM gigante “por si acaso” no es buena práctica.

4. **Ejercicio 8 – Cálculo de eficiencia**
   - Haces el cálculo en voz alta:
     - Costo mensual total.
     - Uso real del 50%.
     - Dinero desperdiciado.
   - Conectas con la idea de “diseñar mejor el tamaño o usar autoescalado”.

<!-- Sugerencia visual:
Diapositiva única tipo "Ejercicios VMs":
  - Cuatro secciones pequeñas con:
      1. "Picos de tráfico → autoescalado"
      2. "CPU > 70% → escalar"
      3. "CPU/RAM = costo"
      4. "Desperdicio = dinero tirado"
Puedes ir señalando cada sección mientras comentas el ejercicio correspondiente.
-->

### 3.6. Laboratorio conceptual (para que hagan luego) (5–7 min)

Describe el laboratorio sin ejecutarlo:

- “Con su propia cuenta (idealmente en free tier) van a:”
  1. Crear una VM pequeña:
     - Elegir región cercana.
     - Elegir Linux o Windows según lo que quieran probar.
     - Elegir el tamaño más pequeño soportado por la capa gratuita.
  2. Configurar la red:
     - Abrir solo el puerto que necesitan (22 para SSH o 3389 para RDP).
     - Evitar reglas ‘0.0.0.0/0’ en todos los puertos sin necesidad.
  3. Conectarse e instalar algo sencillo:
     - Por ejemplo, un servidor web que muestre una página de prueba.
  4. Detener o eliminar la VM al final:
     - “Esto es clave para no generar costos innecesarios.”

Conecta con IAM:

- “¿Quién puede crear esa VM? ¿Quién puede borrarla? Eso lo define IAM.”
- “¿Quién puede conectarse a esa VM? Eso lo definen la red y los permisos.”

<!-- Sugerencia visual:
Checklist numerada:
  1. Crear VM pequeña (región, SO, tamaño).
  2. Configurar puertos mínimos.
  3. Instalar algo simple.
  4. Detener/eliminar al final.
Esta slide sirve como guía visual del laboratorio que explicas.
-->

### 3.7. Transición a almacenamiento (2–3 min)

Frase de conexión:

- “Ya tenemos quién entra (IAM) y dónde corre la aplicación (VMs). Ahora nos falta responder: ¿dónde guardamos todos los datos, archivos, imágenes, logs… y cómo hacemos que no nos cueste una fortuna?”
- “Eso nos lleva al tema de almacenamiento en la nube.”

<!-- Sugerencia visual:
Diapositiva de transición con tres bloques alineados:
  - IAM ✔
  - VMs ✔
  - Almacenamiento (resaltado)
Título: "Siguiente pieza: los datos".
-->

