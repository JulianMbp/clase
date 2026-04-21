# Guía de Ejercicios Prácticos — Módulo 2
## Identidad, Acceso y Gobernanza en la Nube

---

# Fundamentos de IAM

## Ejercicio 1. Fundamentos de IAM

Relaciona cada función con el componente correcto de IAM:

a) Autenticar usuarios → 1. Roles  
b) Asignar permisos → 2. Políticas  
c) Controlar acceso a recursos → 3. Autenticación  

### Respuesta
a → 3 (Autenticación)  
b → 2 (Políticas)  
c → 1 (Roles)

### Explicación
La **autenticación** verifica la identidad del usuario.  
Las **políticas** definen los permisos.  
Los **roles** agrupan esos permisos según las funciones del usuario.

---

# Ejercicio 2. Principio del menor privilegio

### Situación
Un analista necesita acceder solo al panel de reportes financieros, pero no a las bases de datos ni configuraciones del sistema.

### Pregunta
¿Qué principio debe aplicar el administrador al asignarle permisos?

### Respuesta
El **principio del menor privilegio**, otorgando únicamente los accesos necesarios para cumplir su función.

### Explicación
Esto **minimiza el riesgo de errores y filtraciones de datos**.

---

# Ejercicio 3. Tipos de autenticación

### Pregunta
Identifica el tipo de autenticación que se describe en cada caso:

- a) El usuario ingresa su huella digital.
- b) El sistema envía un código al teléfono móvil.
- c) El usuario escribe su contraseña.

### Opciones

- Algo que sabes
- Algo que tienes
- Algo que eres

### Respuestas

a) Algo que eres  
(Biometría)

b) Algo que tienes  
(Token, código)

c) Algo que sabes  
(Contraseña)

### Conclusión
**MFA (Autenticación Multifactor)** combina al menos **dos de estos tres factores** para reforzar la seguridad.

---

# Ejercicio 4. Ejemplo práctico de MFA

### Escenario
Una empresa implementa un sistema que pide **contraseña más código de verificación enviado al correo**.

### Pregunta
¿Cuántos factores de autenticación hay y qué tipos son?

### Respuesta
Hay **dos factores**:

- Contraseña → **Algo que sabes**
- Código al correo → **Algo que tienes**

Esto constituye una **Autenticación Multifactor (MFA)** básica pero efectiva.

---

# Ejercicio 5. Gobernanza en acción

### Pregunta
Describe **dos beneficios concretos** de implementar una gobernanza efectiva en la nube.

### Beneficios

**Cumplimiento normativo**

Facilita auditorías y evita sanciones.

**Control centralizado**

Mejora la visibilidad sobre los recursos y usuarios.

### Explicación
La gobernanza establece **políticas, normas y responsabilidades** que garantizan **orden, seguridad y cumplimiento**.

---

# Ejercicio 6. Rol y política

### Pregunta
¿Cuál es la diferencia entre un **rol** y una **política** dentro de IAM?

### Rol
Conjunto de permisos asociados a una función.

Ejemplo:  
- Administrador  
- Lector

### Política
Documento que define **reglas específicas de acceso a recursos**.

Ejemplo:  
"Solo lectura sobre un bucket S3".

### Ejemplo práctico
Un **rol de analista** puede tener una política que le permita **leer reportes**, pero no modificarlos.

### Esquema conceptual

User/Service  
↓  
Role  
↓  
Policy  
↓  
Specific Access Rules  
↓  
Effective Permissions  
↓  
Resource Permissions

---

# Ejercicio 7. Caso de control de acceso

### Caso
Un empleado recién ingresado a la empresa debe tener permisos **solo para leer archivos**, pero no para editarlos ni eliminarlos.

### Pregunta
¿Qué tipo de permiso debe asignarse en su política IAM?

### Respuesta
Permiso de **solo lectura (ReadOnlyAccess)**.

Esto cumple el **principio de seguridad mínima necesaria** y evita modificaciones accidentales.

---

# Ejercicio 8. Evaluación de riesgo

### Pregunta
¿Qué podría ocurrir si una organización **no aplica correctamente la gobernanza en la nube**?

Selecciona **dos consecuencias posibles**.

- A) Pérdida de control sobre accesos y recursos.
- B) Mayor cumplimiento normativo.
- C) Filtración de información sensible.
- D) Reducción de costos operativos.

### Respuestas correctas
A) Pérdida de control sobre accesos y recursos.  
C) Filtración de información sensible.

### Explicación
Sin gobernanza adecuada:

- se pierde visibilidad
- aumenta la superficie de ataque
- incrementan los riesgos de seguridad.

---

# Ejercicio 9. Auditoría y cumplimiento

### Pregunta
Menciona **dos prácticas recomendadas** para mantener la seguridad y trazabilidad de accesos en un entorno IAM.

### 1. Registro de auditoría (Logs)

Permite monitorear:

- quién accede
- cuándo accede
- qué modifica

### 2. Revisión periódica de permisos

Eliminar:

- accesos innecesarios
- usuarios inactivos
- permisos excesivos

### Beneficio
Estas medidas ayudan a:

- detectar anomalías
- prevenir accesos indebidos
- mejorar la seguridad del sistema.

---

# Ejercicio 10. Análisis integrador

### Caso
Una organización internacional utiliza **múltiples proveedores cloud**:

- AWS
- Azure
- Google Cloud

Cada área gestiona **sus propios permisos y usuarios sin una política unificada**.

### Pregunta
¿Qué problemas puede generar esto y cómo puede resolverse mediante una buena gobernanza IAM?

### Problemas

- Falta de control centralizado
- Duplicación de permisos
- Riesgo de accesos indebidos
- Inconsistencias de seguridad entre plataformas

### Solución

Aplicar un **marco de gobernanza unificado**, que incluya:

- Políticas centralizadas
- Federación de identidades
- Auditorías comunes
- Control de accesos consistente entre nubes

### Reflexión

La **gobernanza IAM** no solo protege los recursos, sino que también garantiza:

- coherencia
- seguridad
- cumplimiento normativo

en entornos **multinube**.