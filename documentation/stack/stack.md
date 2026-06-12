# Stack Tecnológico — LexConnect

## Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| React | ^19.2.4 | Librería UI (SPA) |
| TypeScript | ~6.0.2 | Tipado estático |
| Vite | ^8.0.4 | Bundler y dev server |
| React Router DOM | ^7.14.1 | Enrutamiento SPA (createBrowserRouter) |
| CSS Modules | — | Estilos encapsulados por componente |
| ESLint | ^9.39.4 | Linter |
| pnpm | ^10.33.0 | Package manager |

### Estructura de vistas
| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `LandingPage` | Página de aterrizaje |
| `/directorio` | `DirectoryPage` | Listado de abogados con filtros |
| `/perfil/:slug` | `LawyerProfile` | Perfil detallado de un abogado |

### Patrones y decisiones
- **Compound components** en `Card` (`Card`, `CardImage`, `CardContent`, `CardFooter`)
- **Componente polimórfico** `Container` con prop `as` (`div | section | main | article`)
- **Barrel export** en `ui/index.ts`
- **Breakpoints**: `640px`, `768px`, `1024px`
- **Iconos**: Material Symbols Outlined (Google Fonts)
- **Sin librería de estado global**: solo `useState` local

---

## Backend

| Tecnología | Versión | Propósito |
|---|---|---|
| Python | — | Lenguaje |
| FastAPI | 0.136.3 | Framework web ASync |
| SQLAlchemy | 2.0.50 | ORM |
| Pydantic | 2.13.4 | Validación de schemas |
| Alembic | 1.18.4 | Migraciones de base de datos |
| Uvicorn | 0.49.0 | Servidor ASGI |
| python-jose | 3.5.0 | JWT (autenticación) |
| bcrypt | 5.0.0 | Hashing de contraseñas |
| pytest | 9.0.3 | Testing |
| pytest-asyncio | 1.4.0 | Testing asíncrono |
| httpx | 0.28.1 | Cliente HTTP (tests) |

### Estructura del backend
```
backend/
├── app/
│   ├── api/        # Rutas y dependencias
│   │   ├── __init__.py
│   │   └── deps.py
│   ├── core/       # Config, DB, seguridad
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/     # Modelos SQLAlchemy
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── md_User.py
│   │   ├── md_ProfileLawyer.py
│   │   └── md_ProfileClient.py
│   ├── schemas/    # Schemas Pydantic
│   │   └── __init__.py
│   └── scripts/    # Scripts varios
├── main.py
├── requirements.txt
└── .env
```

---

## Base de Datos

| Driver | Propósito |
|---|---|
| asyncpg 0.31.0 | PostgreSQL (producción) |
| aiosqlite 0.22.1 | SQLite (desarrollo/tests) |

- ORM: SQLAlchemy 2.0 con `DeclarativeBase`
- Migraciones: Alembic

---

## Autenticación

| Librería | Propósito |
|---|---|
| bcrypt | Hash de contraseñas |
| python-jose | Creación y verificación de JWT |
| cryptography | Soporte criptográfico |
| python-dotenv | Variables de entorno (.env) |

- Algoritmo JWT por determinar
- Almacenamiento: `password_hash` en tabla `users`

---

## Testing

| Herramienta | Propósito |
|---|---|
| pytest | Runner de tests |
| pytest-asyncio | Soporte async en tests |
| httpx | Cliente HTTP para tests de API |

---

## DevOps / Deploy

- **Vercel**: Frontend (SPA con `vercel.json` para rewrites)
- **Entorno**: Variables via `.env`
