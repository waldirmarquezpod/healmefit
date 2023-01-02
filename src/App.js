import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import swal from "sweetalert";

export default function EditSesion() {
  const [images, setimages] = useState([]);

  const changeInput = (e) => {
    //este es el índice que se le dará a cada imagen, a partir del indice de la ultima foto
    let indexImg;

    //aquí se puede ver si hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
    if (images.length > 0) {
      indexImg = images[images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }

    let newImgsToState = readmultifiles(e, indexImg);
    let newImgsState = [...images, ...newImgsToState];
    setimages(newImgsState);

    console.log(newImgsState);
  };

  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget.files;

    //este sería el array con las imagenes nuevas
    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];

      let url = URL.createObjectURL(file);

      //console.log(file);
      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file
      });

      indexInicial++;
    });

    //después de haber terminado el ciclo retorno las nuevas imagenes
    return arrayImages;
  }

  function deleteImg(indice) {
    //console.log("borrar img " + indice);

    const newImgs = images.filter(function (element) {
      return element.index !== indice;
    });
    console.log(newImgs);
    setimages(newImgs);
  }

  const enviarArchivos=()=>{
    swal({
      title: "Congrats!",
      text: "Files uploaded",
      icon: "success",
      button: "Confirm",
      timer: "2000"
    }

    )

  }

  return (
    <div className="container-fluid">
      <br></br>
      {/* INPUT IMAGES */}
      <label className="btn btn-dark select-files">
        <span>Select files </span>
        <input hidden type="file" multiple onChange={changeInput}></input>
      </label>

      <button className="btn btn-light" onClick={()=>enviarArchivos()}>Send</button>

      {/* VIEW IMAGES */}
      <div className="row">
        {images.map((imagen) => (
          <div className="col-6 col-sm-4 col-lg-3 square" key={imagen.index}>
            <div className="content_img">
              <button
                className="position-absolute btn btn-danger"
                onClick={deleteImg.bind(this, imagen.index)}
              >
                x
              </button>
              <img
                alt="algo"
                src={imagen.url}
                data-toggle="modal"
                data-target="#ModalPreViewImg"
                className="img-responsive"
              ></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
