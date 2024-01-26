import React from 'react'

export default function Diapositiva5() {
  return (
    <div>
        {/*Nav*/}
        <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva5')}>X</Button>}
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <RiPushpinLine />
          </div>

          <div className="titulo2">
            CLAVES PARA INTERPRETAR PREOCUPACIONES, EMOCIONES E IMAGENES
          </div>
        </div>


      <div className="contenedor9cartas"> {/*contenedor de 9*/}

        <div className="contenedor3cartas color"> {/*contenedor de 3*/}
          <div className="contenedor1carta"> {/*contenedor de 1*/}
            <div className="titulo2">01.</div>
            {editable.diapositiva6  ? (
              <TextArea
              style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto7"
                value={cambios.texto7}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto7}
              </div>
            )}
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">02.</div>
          {editable.diapositiva6  ? (
              <TextArea
              style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto8"
                value={cambios.texto8}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto8}
              </div>
            )}
           
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">03.</div>
          {editable.diapositiva6  ? (
              <TextArea
              style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto9"
                value={cambios.texto9}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto9}
              </div>
            )}
            
          </div>

        </div>

        <div className="contenedor3cartas"> {/*contenedor de 3*/}
          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">04.</div>
          {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto10"
                value={cambios.texto10}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto10}
              </div>
            )}
       
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
            <div className="titulo2">05.</div>
            {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto11"
                value={cambios.texto11}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto11}
              </div>
            )}
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">06.</div>
          {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto12"
                value={cambios.texto12}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto12}
              </div>
            )}
          </div>
        </div>

        <div className="contenedor3cartas color"> {/*contenedor de 3*/}
          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">07.</div>
          {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto13"
                value={cambios.texto13}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto13}
              </div>
            )}
          </div>
        
          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">08.</div>
          {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto14"
                value={cambios.texto14}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto14}
              </div>
            )}            
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
            <div className="titulo2">09.</div>
            {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto15"
                value={cambios.texto15}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto15}
              </div>
            )}       
          </div>
        </div>

      </div>

      {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva6')} disabled={editable.diapositiva6}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva6')} disabled={!editable.diapositiva6}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva6')} disabled={!editable.diapositiva6}>Descartar cambios</Button>
          <Modal
        /*   open={modals.showModal6} */
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva6: false // Cambiar la diapositiva correspondiente a false
            }));
            /* resetValues() */
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
