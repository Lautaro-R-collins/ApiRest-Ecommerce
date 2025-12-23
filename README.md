# ApiRest-Ecommerce

Este proyecto es una solución backend robusta y escalable diseñada para gestionar operaciones de comercio electrónico, incluyendo autenticación de usuarios, gestión de productos, pedidos, reseñas y procesamiento de pagos.

## 🚀 Tecnologías

-   **Node.js** & **Express**: Servidor web y enrutamiento.
-   **MongoDB** & **Mongoose**: Base de datos NoSQL y modelado de datos.
-   **JWT (JSON Web Tokens)**: Autenticación segura y manejo de sesiones stateless.
-   **Bcryptjs**: Hashing de contraseñas para seguridad.
-   **Zod**: Validación de esquemas y datos de entrada.
-   **Multer**: Manejo de subida de archivos (imágenes/avatares).
-   **MercadoPago**: Integración para procesamiento de pagos.
-   **Morgan**: Logger de peticiones HTTP para desarrollo.
-   **Helmet**: Middleware de seguridad para headers HTTP.

## ✨ Características Principales

-   **Autenticación y Autorización**: Registro, Login, Logout, y protección de rutas mediante JWT y Cookies. Roles de usuario (Admin/User).
-   **Gestión de Usuarios**: Perfil de usuario, actualización de avatar.
-   **Productos**: CRUD de productos, filtrado y búsqueda.
-   **Pedidos (Orders)**: Creación y gestión de órdenes de compra.
-   **Reseñas (Reviews)**: Sistema de calificación y comentarios para productos.
-   **Pagos**: Integración completa con MercadoPago.
-   **Seguridad**: Rate limiting, sanitización de datos, headers seguros.

## 🛠️ Instalación y Configuración

Sigue estos pasos para correr el proyecto localmente:

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/tu-usuario/ApiRest-Ecommerce.git
    cd ApiRest-Ecommerce
    ```

2.  **Instalar dependencias**

    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**

    Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

    ```env
    PORT=3000
    NODE_ENV=development
    
    # Base de Datos
    MONGO_DB_URI=mongodb+srv://<db_username>:<db_password>@cluster.mongodb.net/dbname
    MONGO_DB_URI_USER=tu_usuario
    MONGO_DB_URI_PASSWORD=tu_password

    # Seguridad
    JWT_SECRET=tu_secreto_super_seguro
    
    # Configuración Admin (para primer usuario)
    ADMIN_EMAIL=admin@example.com
    
    # Cliente (Frontend)
    CLIENT_URL=http://localhost:5173
    ```

4.  **Ejecutar el servidor**

    Modo desarrollo (con watch):
    ```bash
    npm run dev
    ```

    Modo producción:
    ```bash
    npm start
    ```

## 📚 Documentación de API

La API expone los siguientes endpoints principales (prefijo `/api`):

### Auth (`/api/auth`)
-   `POST /register`: Registrar nuevo usuario.
-   `POST /login`: Iniciar sesión.
-   `POST /logout`: Cerrar sesión.
-   `GET /profile`: Obtener perfil del usuario autenticado.
-   `PUT /update-avatar`: Actualizar imagen de perfil.

### Productos (`/api/products`)
-   `GET /`: Listar productos.
-   `GET /:id`: Obtener detalle de producto.
-   `POST /`: Crear producto (Admin).
-   `PUT /:id`: Actualizar producto (Admin).
-   `DELETE /:id`: Eliminar producto (Admin).

### Órdenes (`/api/orders`)
-   `GET /`: Listar órdenes del usuario.
-   `POST /`: Crear nueva orden.

### Reseñas (`/api/reviews`)
-   `POST /`: Agregar reseña a un producto.

---

Desarrollado con Lautaro Rodriguez Collins
