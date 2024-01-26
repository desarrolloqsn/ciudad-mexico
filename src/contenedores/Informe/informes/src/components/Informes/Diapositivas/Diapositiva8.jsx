import React from 'react'

export default function Diapositiva8() {
  return (
    <div>
       {/*Nav*/}
    <div className="contenedor-extremo">
         <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva8')}>X</Button>}
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <AiOutlineStar />
          </div>

          <div className="titulo2">RECOMENDACIONES PARA LA COMUNICACIÓN</div>
        </div>
        <Tag className="tag">
        Temas, emociones y atributos que en el marco del presente análisis se recomiendan trabajar a través de las acciones comunicacionales.
        </Tag>


        <div className="contenedorGralEmociones"> {/*CONTENEDOR GRAL */}
          <div className="contenedorSugerencia"> {/*CONTENEDOR SEGURENCIA 1 */}
          <div className="titulo2"> {/* Titulo*/}
          SUGERENCIA 1
          </div>
          <div className="contenedorTextoTerminos"> {/*Contenedor textoTerminos */}
          {editable.diapositiva8  ? (  
              <TextArea
                style={{ height: '300px', width: '400px' }}
                type="text"
                name="sugerencia1"
                value={cambios.sugerencia1}
                onChange={handleChange}
                maxLength={600}
              />
            ) : (
              <div>
                {cambios.sugerencia1}
              </div>
            )}   {/* texto*/}

          {editable.diapositiva8  ? (  
              <TextArea
                style={{ height: '100px', width: '400px' }}
                type="text"
                name="terminos1"
                value={cambios.terminos1}
                onChange={handleChange}
                maxLength={300}
              />
            ) : (
              <div>
                {cambios.terminos1}
              </div>
            )}  {/* terminos*/}
          </div>

          </div>

          <div className="contenedorEmocionesAtributos"> {/*CONTENEDOR EMOCIONES Y ATRIBUTOS */}
          <div className="emocionesAtributos"> {/*nav */}
            EMOCIONES Y ATRIBUTOS PARA INCLUIR EN EL MENSAJE*
            </div>
            <div className="contenedorTablas"> {/*Contenedor tablas */}
            {editable.general ? 
            <div className="contenedorEmociones"> {/*CONTENEDOR emociones */}

                <>
                  <Button type="primary" style={{marginTop:'1rem'}} onClick={()=>showModalTorta('dataEmocionesComunicacion')}  disabled={!editable.diapositiva8}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Emociones para incluir en el mensaje"
                    open={modals.dataEmocionesComunicacion}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                <div className="modalTorta">
             
                {cambios.dataEmocionesComunicacion.map((objeto, indice) => (
                  <div key={indice}>
                    <Input
                      className="input-influenciadores"
                      type="text"
                      value={objeto.emociones.props.children.props.children}
                      onChange={(e) => handleInputChangeEmociones(e, indice)}
                    />
                  </div>
                ))}

                </div>
                  </Modal>
                  </>







            <div> {/*tabla */}
            <Table
              columns={cambios.columnsEmociones}
              dataSource={[...cambios.dataEmocionesComunicacion]}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <ReactWordcloud words={cambios.palabrasRecomendadas} options={opcionesRecomendadas} />
            </div>
            </div>

            :

            <div className="contenedorEmociones"> {/*CONTENEDOR emociones */}
            <div> {/*tabla */}
            <Table
              columns={cambios.columnsEmociones}
              dataSource={[...cambios.dataEmocionesComunicacion]}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <ReactWordcloud words={cambios.palabrasRecomendadas} options={opcionesRecomendadas} />
            </div>
            </div>
          
            }



            {editable.general ? 
            <div class="contenedorEmociones"> {/*CONTENEDOR atributos */}
              <>
                  <Button type="primary" style={{marginTop:'1rem'}} onClick={()=>showModalTorta('dataAtributosComunicacion')}  disabled={!editable.diapositiva8}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Atributos para incluir en el mensaje"
                    open={modals.dataAtributosComunicacion}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                <div className="modalTorta">
             
                {cambios.dataAtributosComunicacion.map((objeto, indice) => (
                  <div key={indice}>
                    <Input
                      className="input-influenciadores"
                      type="text"
                      value={objeto.emociones.props.children.props.children}
                      onChange={(e) => handleInputChangeAtributos(e, indice)}
                    />
                  </div>
                ))}

                </div>
                  </Modal>
                  </>


            <div> {/*tabla */}
            <Table
              columns={cambios.columnsAtributos}
              dataSource={cambios.dataAtributosComunicacion}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <ReactWordcloud words={cambios.palabrasRecomendadas} options={opcionesRecomendadas} width="200" height="200" />
            </div>
            </div>
                :
                <div> {/*CONTENEDOR atributos */}
                <div> {/*tabla */}
                <Table
                  columns={cambios.columnsAtributos}
                  dataSource={cambios.dataAtributosComunicacion}
                  pagination={false}
                  rowClassName={rowClassNameTotal("EMOCIONES")}
                  style={{ width: "100%", margin: "3px" }}
                  components={{
                    header: {
                      cell: (props) => (
                        <th
                          {...props}
                          style={{ backgroundColor: "white", color: "black" }}
                        />
                      ),
                    },
                  }}
                />
                </div>
                <div className="subtitulo"> {/*subtitulo */}
                VOCABLOS SUGERIDOS
    
                </div>
                <div className="nube-palabras"> {/*nube palabras */}
                <ReactWordcloud words={cambios.palabrasRecomendadas} options={opcionesRecomendadas} width="200" height="200" />
                </div>
                </div>
                }


            </div>

          </div>
        

        </div>
        <Tag className="tag piepagina"> {/*pie de pag */}
          *Ver documento de QSocialNow "Criterios y técnicas para la producción de contenidos"
        </Tag>
        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva8')} disabled={editable.diapositiva8}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva8')} disabled={!editable.diapositiva8}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva8','showModal8')} disabled={!editable.diapositiva8}>Descartar cambios</Button>
          <Modal
          open={modals.showModal8}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva8: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('dataEmocionesComunicacion')
            resetValues('dataAtributosComunicacion')
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
