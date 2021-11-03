# Burger Queen (API Client)

Burger Queen es un aplicativo web desarrollado especialmente para un restaurante de comida rápida. Por medio de esta interfaz se pueden crear usuarios y asignar roles para los trabajadores del negocio, además de generar las ordenes y ser visibles para estos. De este modo digitalizamos el flujo de producción y venta del restaurante, y accedemos a información actualizada en tiempo real en cada momento. 

## Despliegue

Puedes ver el proyecto en los siguientes enlaces:

[Ver proyecto](https://bq-api-client-2021.herokuapp.com/#/)
[Ver proyecto](https://alissonch.github.io/LIM015-burger-queen-api-client/#/)


## Detalles Técnicos
La Aplicación web consume una API REST, que puede ser revisada en el siguiente link: [API](https://github.com/AlissonCH/LIM015-burger-queen-api)

Para mantener la interfaz actualizada, se utilizó la librería React.js. La lógica del proyecto está implementada completamente en JavaScript (ES6+), HTML y CSS y empaquetada de manera automatizada.

La aplicación es una Single Page App. El diseño es responsive pero ha sido adaptado primero para una tablet, teniendo en cuenta que los pedidos serán tomados principalmente por este dispositivo.

## Historias de Usuario del Proyecto

**[Historia de usuario 1] Mesero/a debe poder ingresar al sistema, si el admin ya le ha asignado credenciales**

Yo como meserx quiero poder ingresar al sistema de pedidos.

**Criterios de aceptación**

Lo que debe ocurrir para que se satisfagan las necesidades del usuario.

- Acceder a una pantalla de login.
- Ingresar email y contraseña.
- Recibir mensajes de error comprensibles, dependiendo de cuál es el error con la información ingresada.
- Ingresar al sistema de pedidos si las crendenciales son correctas.

---

**[Historia de usuario 2] Mesero/a debe poder tomar pedido de cliente/a**

Yo como meserx quiero tomar el pedido de unx clientx para no depender de mi mala memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y que se puedan ir preparando en orden.

**Criterios de aceptación**

Lo que debe ocurrir para que se satisfagan las necesidades del usuario

- Anotar nombre de clientx.
- Agregar productos al pedido.
- Eliminar productos.
- Ver resumen y el total de la compra.
- Enviar pedido a cocina (guardar en alguna base de datos).
- Se ve y funciona bien en una tablet

---
**[Historia de usuario 3] Jefe de cocina debe ver los pedidos**

Yo como jefx de cocina quiero ver los pedidos de lxs clientxs en orden y marcar cuáles están listos para saber qué se debe cocinar y avisar a lxs meserxs que un pedido está listo para servirlo a un clientx.

**Criterios de aceptación**
- Ver los pedidos ordenados según se van haciendo.
- Marcar los pedidos que se han preparado y están listos para servirse.
- Ver el tiempo que tomó prepara el pedido desde que llegó hasta que se marcó como completado.

---

**[Historia de usuario 4] Meserx debe ver pedidos listos para servir**

Yo como meserx quiero ver los pedidos que están preparados para entregarlos rápidamente a lxs clientxs que las hicieron.

**Criterios de aceptación**
- Ver listado de pedido listos para servir.
- Marcar pedidos que han sido entregados.
---

**[Historia de usuario 5] Administrador(a) de tienda debe administrar a sus trabajadorxs**

Yo como administrador(a) de tienda quiero gestionar a los usuarios de la plataforma para mantener actualizado la informacion de mis trabajadorxs.

**Criterios de aceptación**
- Ver listado de trabajadorxs.
- Agregar trabajadorxs.
- Eliminar trabajadoxs.
- Actualizar datos de trabajadorxs.

---
**[Historia de usuario 6] Administrador(a) de tienda debe administrar a sus productos**

Yo como administrador(a) de tienda quiero gestionar los productos para mantener actualizado el menú.

**Criterios de aceptación**
- Ver listado de productos.
- Agregar productos.
- Eliminar productos.
- Actualizar datos de productos.

---

## Prototipo
![Blue Tablet Modern Elegance Technology   Gaming Facebook Shops Cover](https://user-images.githubusercontent.com/85115054/139164897-a375494c-b6f7-4e13-929d-7f194e7ba48a.png)

![Blue Tablet Modern Elegance Technology   Gaming Facebook Shops Cover (1)](https://user-images.githubusercontent.com/85115054/139164912-30cea781-1b33-400a-b477-732149325249.png)

![Blue Tablet Modern Elegance Technology   Gaming Facebook Shops Cover (2)](https://user-images.githubusercontent.com/85115054/139164924-4ef7c17b-9ff9-404d-a1ff-16a21039a343.png)


