import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Rutas específicas con renderizado dinámico
  {
    path: 'editProducto/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'editP/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'comprar/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'venderD/:id',
    renderMode: RenderMode.Client
  },
  // Ruta por defecto para el resto
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
