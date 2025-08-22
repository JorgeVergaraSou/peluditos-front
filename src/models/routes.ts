// src/models/routes.ts
export const PublicRoutes = {
    LOGIN: '/login',
    REGISTER: 'register',
    HOME_PAGE: 'home_page',
    CATEGORIA_PAGE: '/productos/categoria/:categoria',
}

export const PrivateRoutes = {
    PRIVATE: 'private',
    ADMIN: 'admin',
    USER: 'user',
    NUEVO_PRODUCTO: 'private/admin/nuevo-producto',
    LISTAR_PRODUCTOS: 'private/admin/listar-productos',
    LOGOUT: 'logout',
    PERFIL: 'perfil',
}