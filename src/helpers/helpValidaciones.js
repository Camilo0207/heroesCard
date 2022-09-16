export function helpValidaciones() {
  const validarCrearCuenta = (form,db) => {
    const errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    if (!form.name.trim()) {
      errors.name = "El campo 'nombre' no puede estar vacio";
    } else if (!regexName.test(form.name.trim())) {
      errors.name = "El campo'nombre' solo acepta letras y espacios en blanco ";
    }
    if (!form.lastname.trim()) {
      errors.lastname = "El campo 'apellido' no puede estar vacio";
    } else if (!regexName.test(form.lastname.trim())) {
      errors.lastname =
        "El campo'nombre' solo acepta letras y espacios en blanco ";
    }

    const emailFound = db.find((el) => el.email === form.email);

    if (!form.email.trim()) {
      errors.email = "El campo 'email' no puede estar vacio";
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = `El correo '${form.email}' no es valido. Ej: 'ejemplo@gmail.com' `;
    } else if (emailFound) {
      errors.email = `El correo '${form.email}' ya esta registrado `;
    }

    if (!form.password.trim()) {
      errors.password = "La 'contraseña' no puede estar vacia";
    }
    if (!form.country.trim()) {
      errors.country = "Debes escoger tu pais";
    }

    return errors;
  };

  const validarLogin = (form,db) => {
    const erroresForm = {};

    if (!form.email)
      erroresForm.email = "No has ingresado valores al campo 'email'";
    if (!form.password)
      erroresForm.password = "No has ingresado valores al campo 'contraseña";

    if (form.email) {
      const user = db.find((el) => el.email === form.email);
      if (!user) erroresForm.email = "Usuario no existe";
      if (user && user.password !== form.password)
        erroresForm.password = "Contraseña incorrecta";
    }
    return erroresForm;
  };

  const validarNuevoHeroe = (form)=>{
    const errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    
    if (!form.name.trim()) {
      errors.name = "El campo 'nombre' no puede estar vacio";
    } else if (!regexName.test(form.name.trim())) {
      errors.name = "El campo'nombre' solo acepta letras y espacios en blanco ";
    }

    if(!form.backGround.trim())errors.backGround = "No has escogido ningun 'fondo' para tu heroe";
    if(!form.img.trim())errors.img = "No has escogido ninguna 'imagen' para tu heroe";

    if(!form.info.trim())errors.info = "Debes ingresar una descripcion de tu heroe"

    return errors;
  }

  return {
    validarCrearCuenta,
    validarLogin,
    validarNuevoHeroe
  };
}
