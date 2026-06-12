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

## Tablas

### users
Tabla principal de usuarios del sistema.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `int` | `PK`, `auto increment` | Identificador único del usuario |
| `email` | `string(255)` | `NOT NULL` | Correo electrónico del usuario |
| `password_hash` | `string(50)` | `NOT NULL` | Hash de la contraseña |
| `created_at` | `datetime` | `NOT NULL`, `default: now()` | Fecha de creación de la cuenta |
| `is_active` | `bool` | `NOT NULL`, `default: true` | Indica si la cuenta está activa |
| `role` | `string(20)` | `NOT NULL`, `default: "cliente"` | Rol del usuario (`UserRole`) |

**Relaciones:**
- Un `users` puede tener **uno** `profiles_lawyer` (si `role = "abogado"`)
- Un `users` puede tener **uno** `profiles_client` (si `role = "cliente"`)

---

### profiles_lawyer
Perfil detallado de los abogados registrados en la plataforma.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `int` | `PK`, `auto increment` | Identificador único del perfil |
| `id_user` | `int` | `FK → users.id`, `NOT NULL` | Referencia al usuario |
| `name` | `string` | `NOT NULL` | Nombre del abogado |
| `last_name` | `string` | `NOT NULL` | Apellido del abogado |
| `photo` | `string` | — | URL de la foto de perfil |
| `description` | `text` | — | Descripción acerca del abogado |
| `ubication` | `string` | — | Ubicación del abogado |
| `phone_number` | `string` | — | Número de contacto |
| `experience_year` | `datetime` | — | Años de experiencia |
| `law_code` | `int` | — | Código de abogado (colegiatura) |
| `especiality` | `string` | — | Especialidad legal |
| `consult_price` | `decimal` | — | Tarifa de consulta |
| `about_work` | `text` | — | Acerca de sus casos |
| `info_academic` | `text` | — | Información académica |
| `comments_client` | `text` | — | Comentarios de los clientes |
| `recent_cases` | `text` | — | Casos recientes |

**Relaciones:**
- `id_user` → `users.id` (relación 1:1 — un usuario abogado tiene un perfil)

---

### profiles_client
Perfil básico de los clientes registrados en la plataforma.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `int` | `PK`, `auto increment` | Identificador único del perfil |
| `id_user` | `int` | `FK → users.id`, `NOT NULL` | Referencia al usuario |
| `name` | `string` | `NOT NULL` | Nombre del cliente |
| `last_name` | `string` | `NOT NULL` | Apellido del cliente |
| `photo` | `string` | — | URL de la foto de perfil |
| `phone_number` | `string` | — | Número de contacto |
| `ubication` | `string` | — | Ubicación del cliente |

**Relaciones:**
- `id_user` → `users.id` (relación 1:1 — un usuario cliente tiene un perfil)

---

## Diagrama de Relaciones

```
┌──────────────────────────────────┐
│             users                │
├──────────────────────────────────┤
│ id (PK)           ───────────────┼──┐
│ email                            │  │
│ password_hash                    │  │
│ created_at                       │  │
│ is_active                        │  │
│ role                             │  │
└──────────────────────────────────┘  │
                                      │
         ┌────────────────────────────┘
         │                            │
         ▼                            ▼
┌──────────────────┐    ┌──────────────────────┐
│ profiles_lawyer  │    │   profiles_client    │
├──────────────────┤    ├──────────────────────┤
│ id (PK)          │    │ id (PK)              │
│ id_user (FK) ────┤    │ id_user (FK) ────────┤
│ name             │    │ name                 │
│ last_name        │    │ last_name            │
│ photo            │    │ photo                │
│ description      │    │ phone_number         │
│ ubication        │    │ ubication            │
│ phone_number     │    └──────────────────────┘
│ experience_year  │
│ law_code         │
│ especiality      │
│ consult_price    │
│ about_work       │
│ info_academic    │
│ comments_client  │
│ recent_cases     │
└──────────────────┘
```
