## Random Array

**Consigna:**

1. Desarrollar un servidor basado en Node.js y express que para la ruta '/test' responda con un array de 10 objetos, con el siguiente formato:

{
nombre: '',
apellido: '',
color: ''
}

2. Los objetos generados tendrán un valor aleatorio para cada uno de sus campos. El valor será obtenido de los siguientes arrays:
   const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
   const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
   const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

3. Con cada request se obtendrán valores diferentes.
