function calcularCuotas() {
    const monto = parseInt(document.getElementById('monto').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);
  
    if (isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
      document.getElementById('resultado').innerHTML = 'Por favor, ingresa valores válidos.';
    } else {
      const interesAnual = 10; 
      const interesMensual = interesAnual / 12;
  
      const calculoCuota = monto * (interesMensual * (Math.pow(1 + interesMensual, cuotas))) / (Math.pow(1 + interesMensual, cuotas) - 1);
      const cuotaFinal = calculoCuota.toFixed(2);
  
      document.getElementById('resultado').innerHTML = `La cuota mensual es de $${cuotaFinal} por ${cuotas} meses.`;
    }
  }
  class Persona {
    constructor(nombre, edad, email, ciudad, telefono) {
      this.nombre = nombre;
      this.edad = edad;
      this.email = email;
      this.ciudad = ciudad;
      this.telefono = telefono;
    }
  }

  const personas = [];

  function agregarPersona() {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const email = document.getElementById('email').value;
    const ciudad = document.getElementById('ciudad').value;
    const telefono = document.getElementById('telefono').value;
  
    if (nombre.trim() === '' || isNaN(edad) || edad <= 0) {
      alert('Por favor, ingresa valores válidos para el nombre y la edad.');
    } else {
      const nuevaPersona = new Persona(nombre, edad, email, ciudad, telefono);
      personas.push(nuevaPersona);
  
      // Almacenar la lista de personas en localStorage
      localStorage.setItem('personas', JSON.stringify(personas));
  
      document.getElementById('nombre').value = '';
      document.getElementById('edad').value = '';
      document.getElementById('email').value = '';
      document.getElementById('ciudad').value = '';
      document.getElementById('telefono').value = '';
      mostrarListaPersonas();
  
      console.log('Persona agregada:', nuevaPersona);
      console.log('Lista de personas:', personas);
    }
  }

  window.onload = function() {
    const storedData = localStorage.getItem('personas');
    if (storedData) {
      personas = JSON.parse(storedData);
      mostrarListaPersonas();
    }
  };

  function mostrarListaPersonas() {
    const listaElement = document.getElementById('listaPersonas');
    listaElement.innerHTML = '';

    personas.forEach((persona, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'persona-item';

      listItem.innerHTML = `
        <strong>${persona.nombre}</strong> (${persona.edad} años)<br>
        Correo Electrónico: ${persona.email}<br>
        Ciudad: ${persona.ciudad}<br>
        Teléfono: ${persona.telefono}<br>
        <span class="eliminar-btn" onclick="eliminarPersona(${index})">Eliminar</span>
      `;

      listaElement.appendChild(listItem);
    });
  }

  function eliminarPersona(index) {
    const personaEliminada = personas.splice(index, 1)[0];
    mostrarListaPersonas();

    console.log('Persona eliminada:', personaEliminada);
    console.log('Lista de personas después de la eliminación:', personas);
  }
  function handleFile() {
    const fileInput = document.getElementById('fileInput');
    const selectedFile = fileInput.files[0];
  
    if (selectedFile) {
      const fileName = selectedFile.name;
  
      // Lógica para extraer el apellido
      const apellido = obtenerApellido(fileName);
  
      alert('Apellido extraído: ' + apellido);
    } else {
      alert('Por favor, selecciona un archivo.');
    }
  }
  
  function obtenerApellido(fileName) {
   
    const inicioApellido = fileName.indexOf('idea') + 'idea'.length;
    const finApellido = fileName.lastIndexOf('.zip');
    const apellido = fileName.substring(inicioApellido, finApellido);
    return apellido;
  }
  
  window.onload = function() {
    // Cargar datos de personas desde el servidor utilizando AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Si la solicitud fue exitosa, actualizar la lista de personas en la página
          personas = JSON.parse(xhr.responseText);
          mostrarListaPersonas();
        } else {
          // Manejar errores si la solicitud no fue exitosa
          console.error('Error al cargar personas:', xhr.status);
        }
      }
    };
    xhr.open('GET', 'url_para_obtener_personas', true);
    xhr.send();
  };