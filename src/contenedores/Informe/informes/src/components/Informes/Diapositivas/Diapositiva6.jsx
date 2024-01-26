import React from 'react'

export default function Diapositiva6() {
  return (
    <div>
        {/*Nav*/}
        <div className="contenedor-extremo">
          <div className="nav-reporte">
              <div className="reporte">
                <SlNotebook />
                <p>REPORTE DE SÍNTESIS</p>
              </div>
              {editable.general && <Button onClick={()=>handleDisplay('diapositiva6')}>X</Button>}
              <img src={logo} className="img" alt="logo"></img>
            </div>
          </div>


        <div className="cuerpo">
            <div className="titulo2">
                <VscCompass /> 
            </div>

            <div className="titulo2">
              MAPA DE PERCEPCIONES
            </div>
          </div>
          <Tag className="tag">Síntesis de términos y vocablos que connotan las valoraciones positivas y negativas de las audiencias en el marco del presente análisis</Tag>

          <div className="subtitulo">
          <div className="titulo0 subtitulo">LO QUE SE DESTACADA DE LAS PERCEPCIONES POSITIVAS Y NEGATIVAS</div>
          </div>


          {editable.general ? 
          <> 
            <>
                  <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataMapaPercepciones')}  disabled={!editable.diapositiva7}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Mapa de Percepciones"
                    open={modals.dataMapaPercepciones}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                  <div className="modalTorta">
                  {cambios.mapaPercepciones && cambios.mapaPercepciones.length > 0 && cambios.mapaPercepciones.map((hashtag, index) => (
                  <div className="modificarnube" key={index}>
                    <Input
                      className="input-nubepalabras"
                      type="text"
                      value={hashtag.text}
                      onChange={(e) =>
                        handleHashtagChangePercepciones(index, "text", e.target.value)
                      }
                    />
                    <InputNumber
                      value={hashtag.value}
                      onChange={(value) =>
                        handleHashtagChangePercepciones(index, "value", value)
                      }
                    />
                   <Input
                      className="input-nubepalabras"
                      type="text"
                      value={hashtag.color}
                      onChange={(e) =>
                        handleHashtagChangePercepciones(index, "color", e.target.value)
                      }
                    /> 
                  </div>
                ))}
                </div>
                  </Modal>
                  </>
          
          <div>
          <WordCloud
            words={cambios.mapaPercepciones}
            options={opcionesPercepciones}
          />
          </div>
          </>
            : 
            
            <div>
            <WordCloud
              words={cambios.mapaPercepciones}
              options={opcionesPercepciones}
            />
          </div>}
         
      
      {editable.general && (
            <div className="boton-confirmar">
              {contextHolder}
            <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva7')} disabled={editable.diapositiva7}>
              Editar
            </Button>
            <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva7')} disabled={!editable.diapositiva7}>
              Guardar cambio
            </Button>
            <Button onClick={()=>handleDiscardChanges('diapositiva7', 'showModal7')} disabled={!editable.diapositiva7}>Descartar cambios</Button>
            <Modal
            open={modals.showModal7}
            title="¿Está seguro de que desea descartar los cambios?"
            okText="Sí"
            cancelText="No"
            onOk={() => {
              setEditable((prevState) => ({
                ...prevState,
                diapositiva7: false // Cambiar la diapositiva correspondiente a false
              }));
              resetValues('mapaPercepciones')
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
