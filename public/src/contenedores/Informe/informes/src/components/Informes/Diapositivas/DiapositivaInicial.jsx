import React from 'react'

export default function DiapositivaInicial() {
  return (
    <div>
         <div style={{ display: cambios.diapositivaInicial.display, flexDirection:'column'}}>
          
          <div className="contenedor-extremo" >
            {/*Nav*/}
           <div className="nav-reporte">
              <div className="reporte">
                <SlNotebook />
                <p>REPORTE DE SÍNTESIS</p>
              </div>
              {editable.general && <Button onClick={()=>handleDisplay('diapositivaInicial')}>X</Button>}
          
              <img src={logo} className="img" alt="logo"></img>
            </div>
  
            {/*Titulo*/}
            <div>
            {editable.diapositiva1 ? (
                <Input
                style={{ width: '500px' , height:'70px'}}
                  type="text"
                  name="cliente"
                  value={cambios.cliente}
                  onChange={handleChange}
                  className="titulo"
                />
              ) : (
                <div className="titulo">{cambios.cliente}</div>
              )}
          {editable.diapositiva1 ? (
                   <p className="subtitulo-principal">
                   Se mide el impacto de las conversaciones sobre {cambios.cliente} durante {cambios.tiempo}.
                 </p>
                              
                     
              ) : (
              <p className="subtitulo-principal">
                Se mide el impacto de las conversaciones sobre {cambios.cliente} durante {cambios.tiempo}.
              </p>
              )} 
              
            </div>
          </div>
  
          <div className="cuerpo">
            <div className="titulo0">MONITOREO Y ANÁLISIS DE:</div>
  
            {editable.general 
            ? 
            <>
            <Button type="primary" onClick={()=>showModalTorta('dataDatos')} disabled={!editable.diapositiva1}>Editar</Button>
            <Modal
                  title="Análisis de redes sociales"
                  open={modals.dataDatos}
                  onOk={handleOk}
                  okText="Guardar"
                  cancelText="Cancelar"
                  onCancel={handleCancel}
                >
                <div className="datos">
                  
                  <div className="img-red"><img className="fb" src={fb} alt="logo"></img> <Button onClick={()=>eliminarGrafico('displayTotalFacebook')} >x</Button></div>
                  {/* <div className="img-red"><img className="noticias" src={noticias} alt="logo"></img> <Button onClick={()=>eliminarGrafico('displayTotalMedios')}>x</Button></div>  */}
               <div className="img-red"><img className="tw" src={tw} alt="logo"></img> <Button onClick={()=>eliminarGrafico('displayTotalTwitter')}>x</Button></div>
                </div>
                </Modal>
          
                  <img className="fb" src={fb} alt="logo" style={{display:cambios.displayFacebookIcon}}></img>
                  {/* <img className="noticias" src={noticias} alt="logo" style={{display:cambios.displayMediosIcon}}></img> */}
                   <img className="tw" src={tw} alt="logo" style={{display:cambios.displayTwitterIcon}}></img> 
            </> 
            :
            <>
           <img className="fb" src={fb} alt="logo" style={{display:cambios.displayFacebookIcon}}></img>
                  {/* <img className="noticias" src={noticias} alt="logo" style={{display:cambios.displayMediosIcon}}></img> */}
                  <img className="tw" src={tw} alt="logo" style={{display:cambios.displayTwitterIcon}}></img>
            </>  }
           |
            <div className="titulo1">PERíODO</div>
            <div className="cuerpo">
              <div className="titulo1">
                <AiOutlineClockCircle />
              </div>
              {editable.diapositiva1 ? (
                              
                <Input
                style={{ width: '450px' , height:'20px', paddingTop:'0.8rem'}}
                type="text"
                name="fecha"
                value={cambios.fecha}
                onChange={handleChange}
                className="subtitulo-editar"
                />
                          
                ) : (
              <div className="titulo1">
             {cambios.fecha}
              </div>
              )}
        
            </div>
          </div>
  
          <div className="cuerpo">
            <div className="titulo2">
              <CiVolumeHigh />
            </div>
  
            <div className="titulo2">PUBLICACIONES </div>
          </div>
          <Tag className="tag">
            Eventos analizados y su comparación con el mismo período anterior
          </Tag>
  
          <div className="cuerpo" style={{ marginTop: "15px" }}>
            <div className="titulo1" style={{ color: "#0083CA" }}>
              <BsFillDashCircleFill />{" "}
            </div>
            <div className="titulo1">TOTAL (VOLUMEN DE PUBLICACIONES)</div>
          </div>
  
          <div className="graficos-cuerpo">
          {editable.diapositiva1 ? ( 
          <div className="graficoInforme" >
              <>
                <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataGraficoTotal')} disabled={!editable.diapositiva1}>
                  Editar valores
                </Button>
                <Modal
                  title="Total - Volumen de publicaciones"
                  open={modals.dataGraficoTotal}
                  onOk={handleOk}
                  okText="Guardar"
                  cancelText="Cancelar"
                  onCancel={handleCancel}
                >
                <div className="modalTorta">
                  <div className="">Período Actual</div>
                  <InputNumber 
                  value={cambios.data2.series[0].data[0]} 
                  name='datafb'  
                  onChange={(value) => handleInputNumberChangetotal1(value)}
                ></InputNumber>
                 
                  <div>Período Anterior</div>
                  <InputNumber 
                  value={cambios.data2.series[1].data[0]} 
                  name='datafb'  
                  onChange={(value) => handleInputNumberChangetotal2(value)}
                ></InputNumber>
                  
                </div>
                </Modal>
              </>
              <div id="totalVolumenPublicaciones"style={{display:cambios.displayTotalVolumen}} >
              <ReactApexChart
                options={cambios.data2.options}
                series={cambios.data2.series}
                type="bar"
                height={150}
                width={250}
              />
              <Button onClick={()=>eliminarGrafico('displayTotalVolumen')}>x</Button>
              </div>
              {cambios.displayTotalVolumen === 'none' && editable.diapositiva1 === true 
              ? <Button id="mostrarGrafico" style={{display:'flex'}} onClick={()=>mostrarGrafico('displayTotalVolumen')}>+</Button> 
              : <Button id="mostrarGrafico" style={{display:'none'}} onClick={()=>mostrarGrafico('displayTotalVolumen')}>+</Button> 
              }  
            </div>
            ) : (
            <div style={{display:cambios.displayTotalVolumen, gap:'5rem', height:'250px'}}>
              <ReactApexChart
                options={cambios.data2.options}
                series={cambios.data2.series}
                type="bar"
                height={150}
                width={300}
              />
           {(cambios.displayTotalFacebook === 'flex' || cambios.displayTotalTwitter === 'flex') && <hr/>}
  
           
            </div>
                   
             )} 
            
            <div className="periodosfbtw">
            {editable.diapositiva1 ? ( 
              
            <div className="editarfacebook facebook-grafico-bar">
               <>
                <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataGraficoFb')} disabled={!editable.diapositiva1}>
                  Editar valores
                </Button>
                <Modal
                  title="Total - Volumen de publicaciones - Facebook"
                  open={modals.dataGraficoFb}
                  onOk={handleOk}
                  okText="Guardar"
                  cancelText="Cancelar"
                  onCancel={handleCancel}
                >
                <div className="modalTorta">
                  <div className="">Período Actual</div>
                  <InputNumber 
                  value={cambios.datafb.series[0].data[0]} 
                  name='datafb'  
                  onChange={(value) => handleInputNumberChangeFb1(value)}
                ></InputNumber>
                 
                  <div>Período Anterior</div>
                  <InputNumber 
                  value={cambios.datafb.series[1].data[0]} 
                  name='datafb'  
                  onChange={(value) => handleInputNumberChangeFb2(value)}
                ></InputNumber>
                  
                </div>
                </Modal>
              </>
            <div style={{display:cambios.displayTotalFacebook, flexDirection:'column'}}>
            <div className="icon-nombre" >
              <img className="fb" src={fb} alt="logo"/>
              FACEBOOK
            </div>
            <div style={{display:'flex'}}>
            <ReactApexChart
              options={cambios.datafb.options}
              series={cambios.datafb.series}
              type="bar"
              height={250}
              width={150}
            />
            <Button onClick={()=>eliminarGrafico('displayTotalFacebook')}>x</Button>
            </div>
            </div>
              {cambios.displayTotalFacebook === 'none' && editable.diapositiva1 === true 
              ? <Button id="mostrarGrafico" style={{display:'flex'}} onClick={()=>mostrarGrafico('displayTotalFacebook')}>+</Button> 
              : <Button id="mostrarGrafico" style={{display:'none'}} onClick={()=>mostrarGrafico('displayTotalFacebook')}>+</Button> 
              }  
          
            
               
              </div>
            ) : (
            <div className="facebook-grafico-bar">
              <div style={{display:cambios.displayTotalFacebook, flexDirection:'column'}} >
            <div className="icon-nombre">
              <img className="fb" src={fb} alt="logo" />
              FACEBOOK
            </div>
            <div style={{display:'flex'}}>
            <ReactApexChart
              options={cambios.datafb.options}
              series={cambios.datafb.series}
              type="bar"
              height={250}
              width={150}
            />
              </div>
            </div>
          </div>
                   
             )}
  
  
          {/* {editable.diapositiva1 ? ( 
            <div className="editarfacebook twitter-grafico-bar">
            <div style={{display:cambios.displayTotalMedios, flexDirection:'column'}}>
            <div className="icon-nombre">
                <img className="noticias" src={noticias} alt="logo"/>
                MEDIOS
              </div>
              <div style={{display:'flex'}}>
              <ReactApexChart
                options={dataMedios.options}
                series={dataMedios.series}
                type="bar"
                height={250}
                width={150}
              />
            <Button onClick={()=>eliminarGrafico('displayTotalMedios')}>x</Button>
            </div>
            </div>
              {cambios.displayTotalMedios === 'none' && editable.diapositiva1 === true 
              ? <Button id="mostrarGrafico" style={{display:'flex'}} onClick={()=>mostrarGrafico('displayTotalMedios')}>+</Button> 
              : <Button id="mostrarGrafico" style={{display:'none'}} onClick={()=>mostrarGrafico('displayTotalMedios')}>+</Button> 
              }  
            </div>
            ) : (
              <div className="twitter-grafico-bar" style={{display:cambios.displayTotalMedios}}>
              <div className="icon-nombre">
                <img className="noticias" src={noticias} alt="logo"/>
                MEDIOS
              </div>
           
              <ReactApexChart
                options={dataMedios.options}
                series={dataMedios.series}
                type="bar"
                height={250}
                width={150}
              />
           
            </div>
                   
             )}   */}
  
  
  
  
           {editable.diapositiva1 ? ( 
            <div className="editarfacebook twitter-grafico-bar">
            <div style={{display:cambios.displayTotalTwitter, flexDirection:'column'}}>
            <>
                <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataGraficoTw')} disabled={!editable.diapositiva1}>
                  Editar valores
                </Button>
                <Modal
                  title="Total - Volumen de publicaciones - Facebook"
                  open={modals.dataGraficoTw}
                  onOk={handleOk}
                  okText="Guardar"
                  cancelText="Cancelar"
                  onCancel={handleCancel}
                >
                <div className="modalTorta">
                  <div className="">Período Actual</div>
                  <InputNumber 
                  value={cambios.datatw.series[0].data[0]} 
                  name='datatw'  
                  onChange={(value) => handleInputNumberChangeTw1(value)}
                ></InputNumber>
                 
                  <div>Período Anterior</div>
                  <InputNumber 
                  value={cambios.datatw.series[1].data[0]} 
                  name='datatw'  
                  onChange={(value) => handleInputNumberChangeTw2(value)}
                ></InputNumber>
                  
                </div>
                </Modal>
              </>
              <div className="icon-nombre">
                <img className="tw" src={tw} alt="logo"/>
                TWITTER
              </div>
              <div style={{display:'flex'}}>
              <ReactApexChart
                options={cambios.datatw.options}
                series={cambios.datatw.series}
                type="bar"
                height={250}
                width={150}
              />
            <Button onClick={()=>eliminarGrafico('displayTotalTwitter')}>x</Button>
            </div>
            </div>
              {cambios.displayTotalTwitter === 'none' && editable.diapositiva1 === true 
              ? <Button id="mostrarGrafico" style={{display:'flex'}} onClick={()=>mostrarGrafico('displayTotalTwitter')}>+</Button> 
              : <Button id="mostrarGrafico" style={{display:'none'}} onClick={()=>mostrarGrafico('displayTotalTwitter')}>+</Button> 
              }  
            </div>
            ) : (
              <div className="twitter-grafico-bar" style={{display:cambios.displayTotalTwitter}}>
              <div className="icon-nombre">
                <img className="tw" src={tw} alt="logo"/>
                TWITTER
              </div>
           
              <ReactApexChart
                options={cambios.datatw.options}
                series={cambios.datatw.series}
                type="bar"
                height={250}
                width={150}
              />
           
            </div>
                   
             )}  
  
  
              
        
            </div>
          </div>
  
          <div className="totalizador-1">
            <div className="contenedor-totales">
              <div className="box">
              {editable.diapositiva1 ? (
                <Input
                style={{ width: '70px' , height:'70px'}}
                  type="text"
                  name="valor1"
                  value={cambios.valor1}
                  onChange={handleChange}
                  className="numeros frases-total"
                />
              ) : (
                <div className="numeros frases-total">{cambios.valor1}</div>
              )}
              
                <div className="frase">
                  <div className="frases-total">PUBLICACIONES</div>
                  <div className="frases-total">TOTALES</div>
                </div>
                <hr />
              </div>
  
              <div className="box">
              {editable.diapositiva1  ? (
                <Input
                style={{ width: '70px' , height:'70px'}}
                  type="text"
                  name="valor2"
                  value={cambios.valor2}
                  onChange={handleChange}
                  className="numeros frases-total"
                />
              ) : (
                <div className="numeros frases-total">{cambios.valor2}</div>
              )}
        
                <div className="frase">
                  <div className="frases-total">POR HORA </div>
                  <div className="frases-total">TOTALES</div>
                </div>
                <hr />
              </div>
  
              <div className="box">
              {editable.diapositiva1  ? (
                <Input
                style={{ width: '70px' , height:'70px'}}
                  type="text"
                  name="valor3"
                  value={cambios.valor3}
                  onChange={handleChange}
                  className="numeros frases-total"
                />
              ) : (
                <div className="numeros frases-total">{cambios.valor3}</div>
              )}
             
                <div className="frase">
                  <div className="frases-total">PICO MÁXIMO </div>
                  <div className="frases-total">DE PUBLICACIONES</div>
                </div>
              </div>
            </div>
  
            <div className="contenedor-totales">
              <div className="box">   
              {editable.diapositiva1 ? (
                <Input
                style={{ width: '300px' , height:'70px'}}
                  type="text"
                  name="valor4"
                  value={cambios.valor4}
                  onChange={handleChange}
                  className="numeros frases-total"
                />
              ) : (
                <div className="numeros frases-total">{cambios.valor4}</div>
              )}
                <div className="frase">
                  <div className="frases-total">TENDENCIA </div>
                  <div className="frases-total">DE PUBLICACIONES</div>
                </div>
                <hr />
              </div>
  
              <div className="box">
              {editable.diapositiva1 ? (
                <Input
                style={{ width: '70px' , height:'70px'}}
                  type="text"
                  name="valor5"
                  value={cambios.valor5}
                  onChange={handleChange}
                  className="numeros frases-total"
                />
              ) : (
                <div className="numeros frases-total">{cambios.valor5}</div>
              )}
                <div className="frase">
                  <div className="frases-total">ALCANCE</div>
                  <div className="frases-total">IMPRESIONES</div>
                </div>
              </div>
            </div>
          </div>
          {editable.general && (
            <div className="boton-confirmar">
              {contextHolder}
            <div ref={ref3}>
            <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva1')} disabled={editable.diapositiva1}>
              Editar
            </Button>
            <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva1')} disabled={!editable.diapositiva1}>
              Guardar cambio
            </Button>
            <Button onClick={()=>handleDiscardChanges('diapositiva1','showModal1')} disabled={!editable.diapositiva1}>Descartar cambios</Button>
            </div>
            <Modal
            open={modals.showModal1}
            title="¿Está seguro de que desea descartar los cambios?"
            okText="Sí"
            cancelText="No"
            onOk={() => {
              setEditable((prevState) => ({
                ...prevState,
                diapositiva1: false // Cambiar la diapositiva correspondiente a false
              }));
              resetValues('displayTotalVolumen')
              resetValues('fecha')
              resetValues('displayTotalFacebook')
              resetValues('displayTotalTwitter')
              resetValues('displayTotalMedios')
              resetValues("cliente") 
              resetValues("valor1") 
              resetValues("valor2") 
              resetValues("valor3") 
              resetValues("valor4") 
              resetValues("valor5") 
              setShowModal((prevState) => ({
                ...prevState,
                showModal1: false // Cambiar la diapositiva correspondiente a false
              }));
            }}
            onCancel={() => setShowModal((prevState) => ({
              ...prevState,
              showModal1: false // Cambiar la diapositiva correspondiente a false
            }))}
          >
            <p>Los cambios realizados se perderán permanentemente.</p>
          </Modal>
            </div>
            )}
          </div>
    </div>
  )
}
