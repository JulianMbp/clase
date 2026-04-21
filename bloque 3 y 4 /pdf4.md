# Guía de Ejercicios Prácticos — Módulo 4  
## Almacenamiento y Gestión de Datos en la Nube

---

## Ejercicio 1: Comprensión de Almacenamiento por Bloques

Una empresa necesita almacenar bases de datos transaccionales que requieren alta velocidad de lectura y escritura.  
¿Qué tipo de almacenamiento debería elegir?

A. Almacenamiento por bloques  
B. Almacenamiento de objetos  
C. Almacenamiento de archivos  
D. Almacenamiento en cinta  

**Respuesta correcta:** A. Almacenamiento por bloques  

**Explicación:**  
El almacenamiento por bloques divide los datos en fragmentos que se gestionan individualmente, ofreciendo bajo tiempo de respuesta y alta velocidad, ideal para bases de datos y sistemas críticos.

---

## Ejercicio 2: Diferencias entre Tipos de Almacenamiento

Selecciona la opción que mejor describe el almacenamiento de objetos.

A. Organiza los datos jerárquicamente en carpetas.  
B. Guarda los datos como bloques de tamaño fijo.  
C. Cada dato se almacena como un objeto con metadatos y un identificador único.  
D. Solo sirve para almacenamiento temporal.  

**Respuesta correcta:** C. Cada dato se almacena como un objeto con metadatos y un identificador único.

**Explicación:**  
El almacenamiento de objetos se usa en servicios como **Amazon S3** o **Azure Blob Storage**, ideal para contenido multimedia, copias de seguridad y big data.

---

## Ejercicio 3: Aplicación práctica de Almacenamiento de Archivos

Una empresa trabaja con muchos usuarios que necesitan acceder al mismo conjunto de documentos compartidos desde diferentes ubicaciones.  
¿Qué tipo de almacenamiento es el más adecuado?

A. Almacenamiento de objetos  
B. Almacenamiento por bloques  
C. Almacenamiento de archivos  
D. Almacenamiento en caché  

**Respuesta correcta:** C. Almacenamiento de archivos  

**Explicación:**  
Este tipo de almacenamiento permite acceso compartido y concurrente a través de protocolos **NFS** o **SMB**, muy usado en redes empresariales.

---

## Ejercicio 4: Caso de Ciclo de Vida de Datos

Un administrador quiere mover los registros antiguos (más de 12 meses) de un sistema activo a uno más económico automáticamente.  
¿Qué herramienta o práctica debe implementar?

A. Replicación entre regiones  
B. Políticas de ciclo de vida de datos  
C. Copias manuales mensuales  
D. Almacenamiento redundante  

**Respuesta correcta:** B. Políticas de ciclo de vida de datos  

**Explicación:**  
Estas políticas permiten automatizar el movimiento de datos entre niveles de almacenamiento según su uso o antigüedad, optimizando costos.

---

## Ejercicio 5: Cálculo conceptual de optimización

Una empresa paga **$0.10 USD/GB** en almacenamiento de alto rendimiento y **$0.02 USD/GB** en almacenamiento frío.  
Si tiene **500 GB** de datos poco usados, ¿cuánto ahorrará al trasladarlos al almacenamiento frío?

### Costo actual
500 GB × $0.10 = **$50**

### Costo con almacenamiento frío
500 GB × $0.02 = **$10**

### Ahorro mensual
$50 - $10 = **$40 USD**

**Resultado:**  
**$40 USD ahorrados cada mes**

---

## Ejercicio 6: Clasificación según uso

Relaciona cada tipo de almacenamiento con su uso más adecuado:

1. **Bloques** → c) Bases de datos y sistemas de alto rendimiento  
2. **Archivos** → b) Aplicaciones empresariales con acceso compartido  
3. **Objetos** → a) Videos, imágenes, copias de seguridad  

**Solución:**

1 → c  
2 → b  
3 → a  

---

## Ejercicio 7: Escenario técnico

Un sistema de monitoreo genera miles de logs diarios que se consultan durante una semana y luego rara vez.

¿Qué política sería la más eficiente?

A. Eliminar los logs automáticamente cada semana.  
B. Guardarlos permanentemente en almacenamiento de alto rendimiento.  
C. Usar una política de ciclo de vida que los mueva a almacenamiento frío después de una semana.  
D. Comprimirlos manualmente cada mes.

**Respuesta correcta:** C  

**Explicación:**  
Permite conservar los datos sin gastar en almacenamiento costoso, aplicando una transición automática a un nivel más económico.

---

## Ejercicio 8: Identificación de ventajas

¿Cuál de los siguientes es un beneficio directo del almacenamiento de objetos frente al de archivos?

A. Soporte para millones de archivos sin límite de tamaño.  
B. Permite acceso concurrente con NFS.  
C. Requiere estructura jerárquica.  
D. No admite metadatos.

**Respuesta correcta:** A. Soporte para millones de archivos sin límite de tamaño.

**Explicación:**  
El almacenamiento de objetos es altamente escalable, ideal para grandes volúmenes de datos distribuidos.

---

## Ejercicio 9: Análisis de decisión

Tienes una aplicación que requiere montar un disco virtual como si fuera una unidad local, con bajo tiempo de respuesta.  
¿Qué tipo de almacenamiento se ajusta mejor?

A. Archivos  
B. Objetos  
C. Bloques  
D. Caché distribuida  

**Respuesta correcta:** C. Bloques  

**Explicación:**  
El almacenamiento por bloques se comporta como un **disco duro virtual**, perfecto para sistemas operativos o bases de datos.

---

## Ejercicio 10: Optimización y sostenibilidad

¿Cuál de las siguientes prácticas ayuda tanto a reducir costos como el impacto ambiental del almacenamiento en la nube?

A. Mantener todos los datos en almacenamiento de alto rendimiento.  
B. Implementar políticas de ciclo de vida para trasladar datos inactivos a niveles más económicos.  
C. Aumentar la redundancia en todas las regiones del mundo.  
D. Eliminar automáticamente todos los datos sin análisis previo.

**Respuesta correcta:** B. Implementar políticas de ciclo de vida para trasladar datos inactivos a niveles más económicos.

**Explicación:**  
Mover datos poco usados a niveles de almacenamiento más baratos y energéticamente eficientes disminuye costos operativos y consumo energético, contribuyendo a la sostenibilidad de la infraestructura.