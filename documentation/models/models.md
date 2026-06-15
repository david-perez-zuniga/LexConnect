# Modelos de Datos — LexConnect

## Enums

### UserRole
Define los roles de usuario dentro de la plataforma.

| Campo | Valor | Descripción |
|---|---|---|
| `LAWYER` | `"abogado"` | Usuario abogado |
| `CLIENT` | `"cliente"` | Usuario cliente |

```python
class UserRole(str, Enum):
    LAWYER = "abogado"
    CLIENT = "cliente"
```

---

## `__repr__` en los modelos

Cada modelo incluye un método `__repr__` que retorna una representación legible del objeto con sus campos clave. Es útil para debugging: cuando ocurre una excepción, el traceback muestra el `__repr__` del objeto involucrado en lugar de un genérico `<object at 0x...>`, permitiendo identificar rápidamente qué registro falló.

```python
def __repr__(self) -> str:
    return f"User(id={self.id}, email={self.email}, role={self.role})"
```

Ejemplo de salida en un error:

```
ValueError: ...
User(id=5, email=juan@test.com, role=abogado)
```

---

## Tablas

### users
Tabla principal de usuarios del sistema.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `int` | `PK`, `auto increment` | Identificador único del usuario |
| `email` | `string(255)` | `NOT NULL`, `UNIQUE`, `INDEX` | Correo electrónico del usuario |
| `password_hash` | `string(255)` | `NOT NULL` | Hash de la contraseña |
| `created_at` | `datetime` | `NOT NULL`, `server_default: now()`, `timezone=True` | Fecha de creación (UTC) |
| `updated_at` | `datetime` | `NOT NULL`, `server_default: now()`, `onupdate: now()`, `timezone=True` | Fecha de última modificación (UTC) |
| `is_active` | `bool` | `NOT NULL`, `default: true` | Indica si la cuenta está activa |
| `role` | `string(20)` | `NOT NULL`, `default: "cliente"` | Rol del usuario (`UserRole`) |

**Relaciones:**
- `profile_lawyer` → `profiles_lawyer` (1:1, `cascade="all, delete-orphan"`)
- `profile_client` → `profiles_client` (1:1, `cascade="all, delete-orphan"`)

---

### profiles_lawyer
Perfil detallado de los abogados registrados en la plataforma.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `int` | `PK`, `auto increment` | Identificador único del perfil |
| `user_id` | `int` | `FK → users.id`, `UNIQUE`, `NOT NULL` | Referencia al usuario |
| `full_name` | `string(255)` | `NOT NULL` | Nombre completo del abogado |
| `specialization` | `string(255)` | `NULL` | Especialidad legal |
| `license_number` | `string(100)` | `NULL` | Número de colegiatura |
| `phone` | `string(20)` | `NULL` | Teléfono de contacto |
| `address` | `text` | `NULL` | Dirección |
| `date_of_birth` | `date` | `NULL` | Fecha de nacimiento |
| `biography` | `text` | `NULL` | Biografía o descripción profesional |
| `years_of_experience` | `int` | `NULL` | Años de experiencia |

**Relaciones:**
- `user` → `users` (1:1 — un usuario abogado tiene un perfil)

---

### profiles_client
Perfil básico de los clientes registrados en la plataforma.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `int` | `PK`, `auto increment` | Identificador único del perfil |
| `user_id` | `int` | `FK → users.id`, `UNIQUE`, `NOT NULL` | Referencia al usuario |
| `full_name` | `string(255)` | `NOT NULL` | Nombre completo del cliente |
| `phone` | `string(20)` | `NULL` | Teléfono de contacto |
| `address` | `text` | `NULL` | Dirección |
| `date_of_birth` | `date` | `NULL` | Fecha de nacimiento |

**Relaciones:**
- `user` → `users` (1:1 — un usuario cliente tiene un perfil)

---

## Diagrama de Relaciones

```
┌─────────────────────────────────────┐
│               users                 │
├─────────────────────────────────────┤
│ id (PK)              ───────────────┼──┐
│ email (UNIQUE, INDEX)               │  │
│ password_hash                       │  │
│ created_at (timezone=True)          │  │
│ updated_at (timezone=True)          │  │
│ is_active                           │  │
│ role                                │  │
└─────────────────────────────────────┘  │
                                         │
            ┌────────────────────────────┘
            │                            │
            ▼                            ▼
┌────────────────────────┐   ┌────────────────────────┐
│    profiles_lawyer     │   │    profiles_client     │
├────────────────────────┤   ├────────────────────────┤
│ id (PK)                │   │ id (PK)                │
│ user_id (FK, UNIQUE)───┤   │ user_id (FK, UNIQUE)───┤
│ full_name              │   │ full_name              │
│ specialization         │   │ phone                  │
│ license_number         │   │ address                │
│ phone                  │   │ date_of_birth          │
│ address                │   └────────────────────────┘
│ date_of_birth          │
│ biography              │
│ years_of_experience    │
└────────────────────────┘
```
