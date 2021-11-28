# F1NTU4L - backend

Link a la app: [https://d2jkf9oasy5mus.cloudfront.net/](https://d2jkf9oasy5mus.cloudfront.net/)

## Consideraciones generales

- Algunos componentes de la página principal parpadean. Esto es debido a que se actualizan cada 5 segundos.
- No pudimos crear un dominio para la aplicación, el domino (www.f1ntu4l.tk) fue obtenido por Freedom y CloudFront nos puso problemas al validarlo (no estamos muy seguros de que paso ahí).
- En general corre sin problemas. Puede pasar que de momentos si se realizan muchas solicitudes al mismo tiempo, se demora o lanza un error.
- El back-end se actualiza cada un minuto (y no 5 segundos como pedían). Esto que para esto utilizamos una función Lambda que postea sobre 'Transactions' del back-end (la que se encarga de que se ejecuten las transacciones). Para invocar a esta Lambda usamos CloudWatch de AWS pero su tiempo mínimo de intervalo mayor al que esperamos.

## Requisitos funcionales

**RF1:** Cumplido. Se puede crear una IPO desde la página de una empresa haciendo click en su nombre desde el listado en la página principal

**RF2:** Cumplido. Se pueden crear desde la página de un usuario, haciendo click en su nombre en el listado de usuarios de la página principal.

**RF3:** Cumplido. Se pueden crear desde la página de un usuario.

**RF4:** Cumplido. Se puede realizar desde la página de un usuario.

**RF5:** Cumplido. Billetera y registro de transacciones disponibles en la página del usuario/empresa.

**RF6:** Cumplido. Las transacciones se ejecutan automáticamente.

## Requisitos no funcionales

**RNF1:** Cumplido. Koa-React.

**RNF2:** Cumplido. Los listados en la página principal del frontend se actualizan cada 5 segundos.

**RNF3:** Cumplido?. *** cada 1 min.

**RNF4:** Cumplido. Al ejecutarse una transacción se descuenta/aumenta el dinero de los participantes según corresponda.

**RNF5:** Cumplido.

**RNF6:** Cumplido. Subido al buzón de Canvas.

## Acceso al servidor backend

Comando:

```bash
ssh -i "back_e1_arqsys.pem" ubuntu@ec2-3-135-240-82.us-east-2.compute.amazonaws.com
```

Con una llave llamada `back_e1_arqsys.pem`.

## Referencias

Se utilizó el template del curso Tecnologías y Aplicaciones Web disponible en el siguiente repositorio:

[Generator commands · IIC2513/generator-template Wiki](https://github.com/IIC2513/generator-template/wiki/Generator-commands) 