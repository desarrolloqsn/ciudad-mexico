import React from 'react'

export default function Diapositiva1() {
  return (
    <div>
        
        {/*Nav*/}
        <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva1')}>X</Button>}
            <img src={logo} className="img" alt="logo"></img>
          </div> 
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <TbTargetArrow />
          </div>

          <div className="titulo2">IMPACTO</div>
        </div>
        <Tag className="tag">
          Polaridad y su comparación con el mismo período anterior (excluye
          neutralidad)
        </Tag>

        <div className="cuerpo" style={{ marginTop: "15px" }}>
          <div className="titulo1" style={{ color: "#0083CA" }}>
            <BsFillDashCircleFill />{" "}
          </div>
          <div className="titulo1">TOTAL (VOLUMEN DE PUBLICACIONES)</div>
        </div>

        <div className="contenedor-pie-texto">
          <div className="pie">
            {editable.general === true ? 
            <div>
              <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataTorta')} disabled={!editable.diapositiva2}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones"
                open={modals.dataTorta}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Anterior</div>
                <InputNumber value={cambios.dataOuter[0].value} name='dataOuter0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, true, value,'dataOuter')}></InputNumber>
                <InputNumber value={cambios.dataOuter[1].value} name='dataOuter1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, true, value,'dataOuter')}></InputNumber>
                <div>Período Actual</div>
                <InputNumber value={cambios.dataInner[0].value} name='dataInner0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, false, value,'dataInner')}></InputNumber>
                <InputNumber value={cambios.dataInner[1].value} name='dataInner1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, false, value,'dataInner')}></InputNumber>
              </div>
              </Modal>
            </>
            <PieChart width={200} height={200}>
              <Pie
                data={cambios.dataOuter}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={30}
                outerRadius={60}
                paddingAngle={1}>
                {cambios.dataOuter.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Pie
                data={cambios.dataInner}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={10}
                outerRadius={30}
                paddingAngle={1}>
                {cambios.dataInner.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart> 
            </div>
            :
            <PieChart width={200} height={200}>
            <Pie
              data={cambios.dataOuter}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={30}
              outerRadius={60}
              paddingAngle={1}>
              {cambios.dataOuter.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Pie
              data={cambios.dataInner}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={10}
              outerRadius={30}
              paddingAngle={1}>
              {cambios.dataInner.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>}
            
          </div>

          <div className="texto">
            <div>Tendencia {cambios.tendencia}</div>
            <div> en relación al mismo período anterior:</div>
            {editable.general && editable.diapositiva2 ? 
            <div>
            <div className={cambios.indicadorImpacto === "POSITIVIDAD" ? "positivo" : "negativo"}>
              <Input value={cambios.indicadorImpacto} name="indicadorImpacto" onChange={handleInputChange} />
            </div>
            <div className={cambios.indicadorImpacto === "POSITIVIDAD" ? "positivo" : "negativo"}>
              <Input value={cambios.porcentajeImpacto} name="porcentajeImpacto" onChange={handleInputChange} />
            </div>
            </div>
            :
            <div>
            <div
              className={
                cambios.indicadorImpacto === "POSITIVIDAD" ? "positivo" : "negativo"
              }>
              {cambios.indicadorImpacto}
            </div>
            <div>
            <div
              className={
                cambios.indicadorImpacto === "POSITIVIDAD" ? "positivo" : "negativo"
              }>
              {cambios.porcentajeImpacto}
            </div>
            </div>
            </div>
            }
          </div>

          <hr></hr>

          <div className="pie">
            <div className="icon-nombre">
              <img className="fb" src={fb} alt="logo"/>
              FACEBOOK
            </div>
            {editable.general  ? 
            <div>
              <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataTortaFb')} disabled={!editable.diapositiva2}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones"
                open={modals.dataTortaFb}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Anterior</div>
                <InputNumber value={cambios.dataOuterFb[0].value} name='dataOuterFb0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, true, value, 'dataOuterFb')}></InputNumber>
                <InputNumber value={cambios.dataOuterFb[1].value} name='dataOuterFb1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, true, value, 'dataOuterFb')}></InputNumber>
                <div>Período Actual</div>
                <InputNumber value={cambios.dataInnerFb[0].value} name='dataInnerFb0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, false, value, 'dataInnerFb')}></InputNumber>
                <InputNumber value={cambios.dataInnerFb[1].value} name='dataInnerFb1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, false, value, 'dataInnerFb')}></InputNumber>
              </div>
              </Modal>
            </>
            <PieChart width={200} height={200}>
              <Pie
                data={cambios.dataOuterFb}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={30}
                outerRadius={60}
                paddingAngle={1}>
                {cambios.dataOuterFb.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Pie
                data={cambios.dataInnerFb}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={10}
                outerRadius={30}
                paddingAngle={1}>
                {cambios.dataInnerFb.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
            </div>
           : 
        
            <PieChart width={200} height={200}>
            <Pie
              data={cambios.dataOuterFb}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={30}
              outerRadius={60}
              paddingAngle={1}>
              {cambios.dataOuterFb.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Pie
              data={cambios.dataInnerFb}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={10}
              outerRadius={30}
              paddingAngle={1}>
              {cambios.dataInnerFb.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            </PieChart>
             }
           </div>




          <div className="pie">
            <div className="icon-nombre">
              <img className="tw" src={tw} alt="logo"/>
              TWITTER
            </div>
            {editable.general ? 
            <div>
              <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataTortaTw')}  disabled={!editable.diapositiva2}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones"
                open={modals.dataTortaTw}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Anterior</div>
                <InputNumber value={cambios.dataOuterTw[0].value} name='dataOuterTw0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, true, value, 'dataOuterTw')}></InputNumber>
                <InputNumber value={cambios.dataOuterTw[1].value} name='dataOuterTw1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, true, value, 'dataOuterTw')}></InputNumber>
                <div>Período Actual</div>
                <InputNumber value={cambios.dataInnerTw[0].value} name='dataInnerTw0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, false, value, 'dataOuterTw')}></InputNumber>
                <InputNumber value={cambios.dataInnerTw[1].value} name='dataInnerTw1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, false, value, 'dataOuterTw')}></InputNumber>
              </div>
              </Modal>
            </>
            <PieChart width={200} height={200}>
              <Pie
                data={cambios.dataOuterTw}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={30}
                outerRadius={60}
                paddingAngle={1}>
                {cambios.dataOuterTw.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Pie
                data={cambios.dataInnerTw}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={10}
                outerRadius={30}
                paddingAngle={1}>
                {cambios.dataInnerTw.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
            </div>
           : 
        
            <PieChart width={200} height={200}>
            <Pie
              data={cambios.dataOuterTw}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={30}
              outerRadius={60}
              paddingAngle={1}>
              {cambios.dataOuterTw.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Pie
              data={cambios.dataInnerTw}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={10}
              outerRadius={30}
              paddingAngle={1}>
              {cambios.dataInnerTw.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            </PieChart>
             }
           </div> 
        
        </div>

        <div className="subtitulo-anillos">
          <div>ANILLO INTERNO: Período Anterior</div>
          <div>|</div>
          <div>ANILLO EXTERNO: Período Actual</div>
        </div>

        <div className="contenedor-principales">
          <div className="contenedor-img-words">
            <div className="principales-hashtags">
              <div>PRINCIPALES</div>
              <div className="titulo3">HASHTAGS</div>
              <img src={hashtags} className="hashtags"alt="logo" />
            </div>


            {editable.general ?
              <div>
                  <>
                  <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataNubeHashtags')}  disabled={!editable.diapositiva2}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Principales Hashtags"
                    open={modals.dataNubeHashtags}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                  <div className="modalTorta">
                  {cambios.principalesHashtags && cambios.principalesHashtags.length > 0 && cambios.principalesHashtags.map((hashtag, index) => (
                  <div className="modificarnube" key={index}>
                    <Input
                      className="input-nubepalabras"
                      type="text"
                      value={hashtag.text}
                      onChange={(e) =>
                        handleHashtagChange(index, "text", e.target.value)
                      }
                    />
                    <InputNumber
                      value={hashtag.value}
                      onChange={(value) =>
                        handleHashtagChange(index, "value", value)
                      }
                    />
                  </div>
                ))}
                </div>
                  </Modal>
                  </>
            
            <div className="grafico-palabras">
            <ReactWordcloud
              words={cambios.principalesHashtags}
              options={opciones}
              style={{ width: 200, height: 200 }}
            />
           
            </div>
            </div>
          :
          
          <div className="grafico-palabras">
          <ReactWordcloud
              words={cambios.principalesHashtags}
              options={opciones}
              style={{ width: 200, height: 200 }}
            />
           
          </div>
                }
          </div>

          <div className="contenedor-img-words">
            <div className="principales-hashtags">
              <div>PALABRAS</div>
              <div className="titulo3">CLAVE</div>
              <img src={clave} className="hashtags" alt="logo"/>
            </div>

            {editable.general ?
              <div>
                  <>
                  <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('palabrasClaves')}  disabled={!editable.diapositiva2}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Palabras Clave"
                    open={modals.palabrasClaves}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                  <div className="modalTorta">
                  {cambios.palabrasClaves && cambios.palabrasClaves.length > 0 && cambios.palabrasClaves.map((hashtag, index) => (
                  <div className="modificarnube" key={index}>
                    <Input
                      className="input-nubepalabras"
                      type="text"
                      value={hashtag.text}
                      onChange={(e) =>
                        handleHashtagChangeClave(index, "text", e.target.value)
                      }
                    />
                    <InputNumber
                      value={hashtag.value}
                      onChange={(value) =>
                        handleHashtagChangeClave(index, "value", value)
                      }
                    />
                  </div>
                ))}
                </div>
                  </Modal>
                  </>
            
            <div className="grafico-palabras">
            <ReactWordcloud
              words={cambios.palabrasClaves}
              options={opciones}
              style={{ width: 200, height: 200 }}
            />
           
            </div>
            </div>
          :
          
          <div className="grafico-palabras">
          <ReactWordcloud
            words={cambios.palabrasClaves}
            options={opciones}
            style={{ width: 200, height: 200 }}
          />
         
          </div>
                }
          </div>
        </div>

        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva2')} disabled={editable.diapositiva2}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva2')} disabled={!editable.diapositiva2}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva2','showModal2')} disabled={!editable.diapositiva2}>Descartar cambios</Button>
          <Modal
          open={modals.showModal2}
          title="¿Está seguro?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva2: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues("dataInner")
            resetValues("dataOuter")
            resetValues("dataInnerTw")
            resetValues("dataOuterTw")
            resetValues("dataInnerFb")
            resetValues("dataOuterFb")
            resetValues("principalesHashtags")
            resetValues("palabrasClaves")
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
