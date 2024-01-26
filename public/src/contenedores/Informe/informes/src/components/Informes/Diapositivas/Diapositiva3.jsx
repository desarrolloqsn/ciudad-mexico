import React from 'react'

export default function Diapositiva3() {
  return (
    <div>
       {/*Nav*/}
       <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva3')}>X</Button>}
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <RiUserStarLine />
          </div>

          <div className="titulo2">INFLUENCIADORES</div>
        </div>
        <Tag className="tag">Top 10 principales</Tag>

        <div className="container-table">

          {editable.general ?

            <div>
              <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataInfluenciadores')} disabled={!editable.diapositiva4}>
                Editar valores
              </Button>
              <Modal
                title="Influenciadores - Top 10"
                open={modals.dataInfluenciadores}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="Influenciadores-modal">
              {cambios.data.map((objeto, indice) => (
                <div key={objeto.key || ''} className="Influenciadores-modal">
                  <Input
                   type="number"
                   className="inputnumber"
                     value={objeto.key} onChange={(e) => {
                    const nuevosDatos = [...cambios.data];
                    nuevosDatos[indice].key = e.target.value;
                    setCambios({ ...cambios, data: nuevosDatos });
                  }} />
                  <Input className="input-influenciadores" type="text" value={objeto.influenciador || ''} onChange={(e) => {
                    const nuevosDatos = [...cambios.data];
                    nuevosDatos[indice].influenciador = e.target.value;
                    setCambios({ ...cambios, data: nuevosDatos });
                  }} />
                  <Input
                   type="number"
                   className="inputnumber" 
                     value={objeto.impresiones || ''}
                     onChange={(e) => {
                    const nuevosDatos = [...cambios.data];
                    nuevosDatos[indice].impresiones = e.target.value;
                    setCambios({ ...cambios, data: nuevosDatos });
                  }} />
                </div>
              ))}

                {cambios.data2ant.map((objeto, indice) => (
                   <div key={objeto.key} className="Influenciadores-modal">
                    <Input
                    type="number"
                    className="inputnumber"
                      value={objeto.key || ''} 
                      onChange={(e) => {
                        const nuevosDatos = [...cambios.data2ant];
                        nuevosDatos[indice] = {
                          ...nuevosDatos[indice],
                          key: e.target.value
                        };
                        setCambios({ ...cambios, data2ant: nuevosDatos });
                      }} 
                    />
                    <Input 
                    className="input-influenciadores" 
                      value={objeto.influenciador || ''} 
                      onChange={(e) => {
                        const nuevosDatos = [...cambios.data2ant];
                        nuevosDatos[indice] = {
                          ...nuevosDatos[indice],
                          influenciador: e.target.value
                        };
                        setCambios({ ...cambios, data2ant: nuevosDatos });
                      }} 
                    />
                    <Input
                     type="number"
                     className="inputnumber"
                      value={objeto.impresiones || ''}
                      onChange={(e) => {
                        const nuevosDatos = [...cambios.data2ant];
                        nuevosDatos[indice] = {
                          ...nuevosDatos[indice],
                          impresiones: e.target.value
                        };
                        setCambios({ ...cambios, data2ant: nuevosDatos });
                      }} 
                    /> 

                   
                  </div>
                ))}
              </div>
              </Modal>
              </>

          <div className="table">
            <Table
              columns={cambios.columns}
              dataSource={cambios.data}
              pagination={false}
              rowClassName={rowClassName}
              style={{ width: "100%" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{
                        backgroundColor: "#0083CA",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  ),
                },
              }}
            />
         
         {cambios.data2ant && cambios.data2ant[0].influenciador !== "" && (
        <Table
          columns={cambios.columns}
          dataSource={cambios.data2ant}
          pagination={false}
          rowClassName={rowClassName}
          style={{ width: "100%" }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{
                    backgroundColor: "#0083CA",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              ),
            },
          }}
        />
      )}
      {(!cambios.data2ant || cambios.data2ant[0].influenciador === "") && (
        <div style={{ display: 'none' }}>
          {/* Aquí puede agregar cualquier contenido que desee que se oculte cuando no hay datos */}
        </div>
      )}
          </div>
          </div>
          :
          
          
          <div className="table">
          <Table
            columns={cambios.columns}
            dataSource={cambios.data}
            pagination={false}
            rowClassName={rowClassName}
            style={{ width: "100%" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "#0083CA",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ),
              },
            }}
          />
       
       {cambios.data2ant && cambios.data2ant[0].influenciador !== "" && (
      <Table
        columns={cambios.columns}
        dataSource={cambios.data2ant}
        pagination={false}
        rowClassName={rowClassName}
        style={{ width: "100%" }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#0083CA",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            ),
          },
        }}
      />
    )}
    {(!cambios.data2ant || cambios.data2ant[0].influenciador === "") && (
      <div style={{ display: 'none' }}>
      </div>
    )}
        </div>
        }
        </div>



        <div className="cuerpo">
          <div className="titulo2">
            <IoAlert />
          </div>

          <div className="titulo2">PREOCUPACIONES</div>
        </div>
        <Tag className="tag">Top 3 principales</Tag>

        <div className="container-table">

          {editable.general ? 
          <div>
             <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataPreocupaciones')} disabled={!editable.diapositiva4}>
                Editar valores
              </Button>
              <Modal
                title="Preocupaciones - Top 3"
                open={modals.dataPreocupaciones}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="Influenciadores-modal">

               <div className="contenedor-modal-preocupaciones" >
                <div>Total</div>
              {cambios.dataPreocupaciones.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                 
                 <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupaciones];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.total.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupaciones: [
                        ...prevState.dataPreocupaciones.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupaciones.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupaciones];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.total.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupaciones: [
                        ...prevState.dataPreocupaciones.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupaciones.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
              ))}
              </div>
          

          <div >
                <div>Twitter</div>
          {cambios.dataPreocupacionesTw.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                 
                 <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupacionesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.twitter.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupacionesTw: [
                        ...prevState.dataPreocupacionesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupacionesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupacionesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.twitter.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupacionesTw: [
                        ...prevState.dataPreocupacionesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupacionesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
              ))}
              </div> 

              <div >
                <div>Facebook</div>
              {cambios.dataPreocupacionesFb.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                 
                 <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupacionesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.facebook.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupacionesFb: [
                        ...prevState.dataPreocupacionesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupacionesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupacionesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.facebook.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupacionesFb: [
                        ...prevState.dataPreocupacionesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupacionesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
              ))}
              </div>
              </div>
              </Modal>
              </>
         
          <div className="table">
            
            <Table
              columns={cambios.columnsPreocupacionesTotal}
              dataSource={cambios.dataPreocupaciones}
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
              dataSource={cambios.dataPreocupacionesTw}
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
              dataSource={cambios.dataPreocupacionesFb}
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
              dataSource={cambios.dataPreocupaciones}
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
              dataSource={cambios.dataPreocupacionesTw}
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
              dataSource={cambios.dataPreocupacionesFb}
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
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva4')} disabled={editable.diapositiva4}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva4')} disabled={!editable.diapositiva4}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva4','showModal4')} disabled={!editable.diapositiva4}>Descartar cambios</Button>
          <Modal
          open={modals.showModal4}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva4: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('data')
            resetValues('data2ant')
            resetValues('dataPreocupaciones')
            resetValues('dataPreocupacionesFb')
            resetValues('dataPreocupacionesTw')
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
