# LexConnect

Plataforma de conexión entre abogados y clientes.

---

## Requisitos

- Python 3.11+
- Node.js 20+
- pnpm (`npm install -g pnpm`)
- PostgreSQL (opcional, para desarrollo con SQLite está disponible)

---

## Backend

### 1. Activar entorno virtual

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/macOS
# venv\Scripts\activate    # Windows
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar variables de entorno

Editar `backend/.env`:

```env
APP_NAME="LexConnect"
ADMIN_EMAIL="admin@lexconnect.com"
DATABASE_URL="postgresql+asyncpg://usuario:password@localhost:5432/lexconnect"
DATABASE_RAM_URL="sqlite+aiosqlite:///file:testdb?mode=memory&cache=shared&uri=true"
SECRET_KEY="cambiar_por_clave_segura"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

> `DATABASE_RAM_URL` usa SQLite en memoria, ideal para desarrollo y tests sin depender de PostgreSQL.

### 4. Inicializar Alembic (migraciones)

```bash
alembic init alembic
```

Configurar `alembic.ini`:

```ini
sqlalchemy.url = postgresql+asyncpg://usuario:password@localhost:5432/lexconnect
```

Editar `alembic/env.py` para usar la URL asíncrona y los modelos del proyecto:

```python
from app.models.base import Base
from app.models import md_User, md_ProfileLawyer, md_ProfileClient
from app.core.config import settings

config.set_main_option("sqlalchemy.url", settings.database_url)
target_metadata = Base.metadata
```

### 5. Crear y aplicar migraciones

```bash
alembic revision --autogenerate -m "init"
alembic upgrade head
```

### 6. Ejecutar servidor

```bash
uvicorn main:app --reload
```

Servidor disponible en `http://localhost:8000`. Documentación automática en `http://localhost:8000/docs`.

### 7. Ejecutar tests

```bash
pytest -v
```

---

## Frontend

### 1. Instalar dependencias

```bash
cd frontend
pnpm install
```

### 2. Ejecutar en desarrollo

```bash
pnpm dev
```

Disponible en `http://localhost:5173`.

### 3. Build para producción

```bash
pnpm build
```

### 4. Linter

```bash
pnpm lint
```

---

## Estructura del proyecto

```
LexConnect/
├── backend/
│   ├── app/
│   │   ├── api/          # Rutas y dependencias
│   │   ├── core/         # Configuración, DB, seguridad
│   │   ├── models/       # Modelos SQLAlchemy
│   │   ├── schemas/      # Schemas Pydantic
│   │   └── scripts/      # Scripts utilitarios
│   ├── main.py           # Punto de entrada FastAPI
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── pages/        # Páginas (Landing, Directorio, Perfil)
│   │   ├── data/         # Datos mock
│   │   └── styles/       # Estilos CSS Modules
│   ├── package.json
│   └── vite.config.ts
├── documentation/
│   ├── stack/            # Documentación del stack
│   └── models/           # Documentación de modelos de datos
└── README.md
```

---

## Comandos rápidos

| Acción | Comando |
|---|---|
| Backend: activar venv | `source backend/venv/bin/activate` |
| Backend: iniciar servidor | `uvicorn backend.main:app --reload` |
| Backend: migraciones | `alembic upgrade head` |
| Frontend: dev server | `cd frontend && pnpm dev` |
| Frontend: build | `cd frontend && pnpm build` |
| Tests | `pytest -v` |
