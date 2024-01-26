import React from 'react'

export default function Diapositiva4() {
  return (
    <div>
         {/*Nav*/}
         <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva4')}>X</Button>}
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <TiHeartOutline />
          </div>

          <div className="titulo2">EMOCIONES</div>
        </div>
        <Tag className="tag">Top 3 principales</Tag>

        <div className="container-table">
          {editable.general ? 
              <div>  {/*CONTENEDOR MODAL */}
                <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataEmociones')} disabled={!editable.diapositiva5}>
                Editar valores
                </Button>
                <Modal
                title="Emociones -Top 3"
                open={modals.dataEmociones}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
                >
                <div className="Influenciadores-modal">

                <div className="contenedor-modal-preocupaciones" >
                <div>Total</div>
                {cambios.dataEmociones.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmociones];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.total.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmociones: [
                        ...prevState.dataEmociones.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmociones.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmociones];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.total.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmociones: [
                        ...prevState.dataEmociones.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmociones.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div>


                <div >
                <div>Twitter</div>
                {cambios.dataEmocionesTw.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmocionesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.twitter.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmocionesTw: [
                        ...prevState.dataEmocionesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmocionesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmocionesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.twitter.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmocionesTw: [
                        ...prevState.dataEmocionesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmocionesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div> 
                <div >
                <div>Facebook</div>
                {cambios.dataEmocionesFb.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmocionesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.facebook.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmocionesFb: [
                        ...prevState.dataEmocionesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmocionesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmocionesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.facebook.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmocionesFb: [
                        ...prevState.dataEmocionesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmocionesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div>
                </div>
                </Modal>
          
        
          <div className="table">
         <Table
            columns={cambios.columnsPreocupacionesTotal}
            dataSource={cambios.dataEmociones}
            pagination={false}
            rowClassName={rowClassNameTotal("TOTAL")}
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
         <Table
            columns={cambios.columnsPreocupacionesTw}
            dataSource={cambios.dataEmocionesTw}
            pagination={false}
            rowClassName={rowClassNameTotal("TWITTER")}
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
      <Table
            columns={cambios.columnsPreocupacionesFb}
            dataSource={cambios.dataEmocionesFb}
            pagination={false}
            rowClassName={rowClassNameTotal("FACEBOOK")}
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
        </div>

          :  <div className="table">
           <Table
            columns={cambios.columnsPreocupacionesTotal}
            dataSource={cambios.dataEmociones}
            pagination={false}
            rowClassName={rowClassNameTotal("TOTAL")}
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
           <Table
            columns={cambios.columnsPreocupacionesTw}
            dataSource={cambios.dataEmocionesTw}
            pagination={false}
            rowClassName={rowClassNameTotal("TWITTER")}
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

          <Table
            columns={cambios.columnsPreocupacionesFb}
            dataSource={cambios.dataEmocionesFb}
            pagination={false}
            rowClassName={rowClassNameTotal("FACEBOOK")}
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
        }
        </div>



        <div className="cuerpo">
          <div className="titulo2">
            <RiFileUserLine />
          </div>

          <div className="titulo2">IMAGEN</div>
        </div>
        <Tag className="tag">Top 3 principales</Tag>

        <div className="container-table">
       
        {editable.general ? 
          <div> {/*CONTENEDOR MODAL */}

                <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataImagenes')} disabled={!editable.diapositiva5}>
                Editar valores
                </Button>
                <Modal
                title="Imagenes -Top 3"
                open={modals.dataImagenes}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
                >
                <div className="Influenciadores-modal">

                <div className="contenedor-modal-preocupaciones" >
                <div>Total</div>
                {cambios.dataImagenes.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenes];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.total.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenes: [
                        ...prevState.dataImagenes.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenes.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenes];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.total.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenes: [
                        ...prevState.dataImagenes.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenes.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div>


                <div >
                <div>Twitter</div>
                {cambios.dataImagenesTw.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.twitter.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenesTw: [
                        ...prevState.dataImagenesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.twitter.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenesTw: [
                        ...prevState.dataImagenesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div> 

                <div >
                <div>Facebook</div>
                {cambios.dataImagenesFb.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.facebook.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenesFb: [
                        ...prevState.dataImagenesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.facebook.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenesFb: [
                        ...prevState.dataImagenesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div>
                </div>
                </Modal>

          <div className="table">
           <Table
              columns={cambios.columnsPreocupacionesTotal}
              dataSource={cambios.dataImagenes}
              pagination={false}
              rowClassName={rowClassNameTotal("TOTAL")}
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
            <Table
              columns={cambios.columnsPreocupacionesTw}
              dataSource={cambios.dataImagenesTw}
              pagination={false}
              rowClassName={rowClassNameTotal("TWITTER")}
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

            <Table
              columns={cambios.columnsPreocupacionesFb}
              dataSource={cambios.dataImagenesFb}
              pagination={false}
              rowClassName={rowClassNameTotal("FACEBOOK")}
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
          </div>
          :

          <div className="table">
             <Table
              columns={cambios.columnsPreocupacionesTotal}
              dataSource={cambios.dataImagenes}
              pagination={false}
              rowClassName={rowClassNameTotal("TOTAL")}
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
             <Table
              columns={cambios.columnsPreocupacionesTw}
              dataSource={cambios.dataImagenesTw}
              pagination={false}
              rowClassName={rowClassNameTotal("TWITTER")}
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

            <Table
              columns={cambios.columnsPreocupacionesFb}
              dataSource={cambios.dataImagenesFb}
              pagination={false}
              rowClassName={rowClassNameTotal("FACEBOOK")}
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
        }
          </div>
      

        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva5')} disabled={editable.diapositiva5}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva5')} disabled={!editable.diapositiva5}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva5', 'showModal5')} disabled={!editable.diapositiva5}>Descartar cambios</Button>
          <Modal
          open={modals.showModal5}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva5: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('dataEmocionesTw')
            resetValues('dataEmocionesFb')
            resetValues('dataEmociones')
            resetValues('dataImagenes')
            resetValues('dataImagenesFb')
            resetValues('dataImagenesTw')
            
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
