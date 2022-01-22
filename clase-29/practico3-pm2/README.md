## Servidor Node con PM2

**Consigna:** Poner en marcha dos servidores (con el formato del primer ejercicio: sin cluster) utilizando PM2.
Uno de los servidores escuchará en el puerto 8081 y se ejecutará en modo 'fork'.
El otro lo hará en el puerto 8082 y se ejecutará en modo 'cluster'.

- Generar un request a cada uno de ellos comprobando que respondan adecuadamente.

- Verificar en el sistema operativo la cantidad de procesos levantados y analizar el porqué.

- Finalizar por sistema operativo el proceso de cada uno de estos servidores (fork y cluster), comprobando que PM2 los ponga en marcha nuevamente (tendrían que iniciar con un nuevo pid).

- Con PM2 listar todos los servidores activos y e ir finalizando los procesos (por id y por name), verificando en el sistema operativo, para cada operación, los procesos activos de node.
