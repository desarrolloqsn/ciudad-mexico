import React from 'react'

export default function Diapositiva7() {
  return (
    <div>
      {/*Nav*/}
      <div className="contenedor-extremo">
          <div className="nav-reporte">
              <div className="reporte">
                <SlNotebook />
                <p>REPORTE DE SÍNTESIS</p>
              </div>
              {editable.general && <Button onClick={()=>handleDisplay('diapositiva7')}>X</Button>}
              <img src={logo} className="img" alt="logo"></img>
            </div>
          </div>

          <div className="cuerpo">
            <div className="titulo2">
              <HiOutlineChatAlt2 />
            </div>

            <div className="titulo2">
            FORTALEZAS Y DEBILIDADES
            </div>
          </div>

          {editable.general ? 
            
            <div>
                <>
                  <Button type="primary" style={{marginTop:'1rem' , marginLeft:'2rem'}} onClick={()=>showModalTorta('fortalezasDebilidades')}  disabled={!editable.diapositiva10}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Fortalezas y Debilidades"
                    open={modals.fortalezasDebilidades}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                  <div className="modalTorta">
                  {cambios.fortalezasDebilidades && cambios.fortalezasDebilidades.length > 0 && cambios.fortalezasDebilidades.map((porcentaje, index) => (
                    <div className="modificarnube" key={index}>
                      <Input
                        className="input-nubepalabras"
                        type="text"
                        value={porcentaje.text}
                        onChange={(e) =>
                          handleHashtagChangeFortalezas(index, "text", e.target.value)
                        }
                      />
                      <Input
                        type="text"
                        value={porcentaje.value}
                        onChange={(e) =>
                          handleHashtagChangeFortalezas(index, "value", e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
                  </Modal>
                  </>

              <div className="fortalezas-debilidades"> {/*CONTENEDOR GENERAL */}
            <div className="fortalezas-positivo"> {/*CONTENEDOR HORIZONTAL POSITIVO */}
              <div className="fortalezas-circulo"> {/*CONTENEDOR CIRCULO */}
              <div className="circulo-fortalezas-positivo">{cambios.fortalezasDebilidades[0].value}</div>
              <div>
              <div className="circulo-positivo">POSITIVIDAD</div>
              <div>Expansión comercial</div>
              </div>
              </div>
              <hr></hr>
              <div className='fortalezas-texto'> {/*CONTENEDOR TEXTO */}
              {editable.diapositiva10  ? (  
              <TextArea
                style={{ height: '150px', width: '400px' }}
                type="text"
                name="fortalezasDebilidadestexto1"
                value={cambios.fortalezasDebilidadestexto1}
                onChange={handleChange}
                maxLength={600}
              />
            ) : (
              <div>
                {cambios.fortalezasDebilidadestexto1}
              </div>
            )} 

            </div>
            </div>
            <div className="fortalezas-positivo"> {/*CONTENEDOR HORIZONTAL NEGATIVO */}
              <div className="fortalezas-circulo"> {/*CONTENEDOR CIRCULO */}
              <div className="circulo-fortalezas-negativo">{cambios.fortalezasDebilidades[1].value}</div>
              <div>
              <div className="circulo-negativo">NEGATIVIDAD</div>
              <div>Vulnerabilidad habitacional</div>
              </div>
              </div>
              <hr></hr>
              <div className='fortalezas-texto'> {/*CONTENEDOR TEXTO */}
      
              {editable.diapositiva10  ? (  
              <TextArea
                style={{ height: '150px', width: '400px' }}
                type="text"
                name="fortalezasDebilidadestexto2"
                value={cambios.fortalezasDebilidadestexto2}
                onChange={handleChange}
                maxLength={600}
              />
            ) : (
              <div>
                {cambios.fortalezasDebilidadestexto2}
              </div>
            )}  
              </div>
            </div>
          </div>
          </div>
          :

          <div className="fortalezas-debilidades"> {/*CONTENEDOR GENERAL */}
          <div className="fortalezas-positivo"> {/*CONTENEDOR HORIZONTAL POSITIVO */}
            <div className="fortalezas-circulo"> {/*CONTENEDOR CIRCULO */}
            <div className="circulo-fortalezas-positivo">{cambios.fortalezasDebilidades[0].value}</div>
            <div>
            <div className="circulo-positivo">POSITIVIDAD</div>
            <div>Expansión comercial</div>
            </div>
            </div>
            <hr></hr>
            <div className='fortalezas-texto'> {/*CONTENEDOR TEXTO */}
          {cambios.fortalezasDebilidadestexto1}

          </div>
          </div>
          <div className="fortalezas-positivo"> {/*CONTENEDOR HORIZONTAL NEGATIVO */}
            <div className="fortalezas-circulo"> {/*CONTENEDOR CIRCULO */}
            <div className="circulo-fortalezas-negativo">{cambios.fortalezasDebilidades[1].value}</div>
            <div>
            <div className="circulo-negativo">NEGATIVIDAD</div>
            <div>Vulnerabilidad habitacional</div>
            </div>
            </div>
            <hr></hr>
            <div className='fortalezas-texto'> {/*CONTENEDOR TEXTO */}
         {cambios.fortalezasDebilidadestexto2}
            </div>
          </div>
        </div>
       }

        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva10')} disabled={editable.diapositiva10}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva10')} disabled={!editable.diapositiva10}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva10','showModal10')} disabled={!editable.diapositiva10}>Descartar cambios</Button>
          <Modal
          open={modals.showModal10}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva10: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('fortalezasDebilidadestexto1')
            resetValues('fortalezasDebilidadestexto2')
            resetValues('fortalezasDebilidades')
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}

    </div>
  )
}
