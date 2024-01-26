import React from 'react'

export default function Diapositiva2() {
  return (
    <div>
       {/*Nav*/}
       <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva2')}>X</Button>}
            <img src={logo} className="img" alt="logo"></img>
          </div>

        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <BiConversation />
          </div>

          <div className="titulo2">ANÁLISIS</div>
        </div>

        <div className="contenedor-analisis">
          <div className="contenedor-dos-analisis">
            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto1"
                value={cambios.texto1}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto1}
              </div>
            )}
            </div>

            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto2"
                value={cambios.texto2}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto2}

              </div>
            )}
            </div>
          </div>

          <hr className="hr-estilos" />

          <div className="contenedor-dos-analisis">
            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto3"
                value={cambios.texto3}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto3}
              </div>
            )}
            </div>

            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
             
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto4"
                value={cambios.texto4}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto4}
              </div>
            )}
            
            </div>
          </div>
          <hr className="hr-estilos" />

          <div className="contenedor-dos-analisis">
            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
            
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto5"
                value={cambios.texto5}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto5}
              </div>
            )}
            </div>

            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
           
              {editable.diapositiva3  ? (
              <TextArea
              style={{ height: '100px' }}
              type="text"
              name="texto6"
              value={cambios.texto6}
              onChange={handleChange}
              maxLength={250}
            />
            ) : (
              <div>
                {cambios.texto6}
              </div>
            )}
    
            </div>
          </div>
          <hr className="hr-estilos" />
        </div>


        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva3')} disabled={editable.diapositiva3}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva3')} disabled={!editable.diapositiva3}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva3',)} disabled={!editable.diapositiva3}>Descartar cambios</Button>
          <Modal
          open={modals.showModal3}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva3: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('texto1')
            resetValues('texto2')
            resetValues('texto3')
            resetValues('texto4')
            resetValues('texto5')
            resetValues('texto6')
            
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
