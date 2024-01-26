import React from 'react'
import logo2 from "./../../../assest/qsocialnow2.jpg";

export default function Diapositiva10() {
  return (
    <div>
      <div className="final">
       
       <img className="logo-final" src={logo2} alt="logo"/>
       <div className="contenedor-footer"> {/*contenedor footer */}
           <div className="contenedor-pais"> {/*contenedor pais */}
               <div><strong>Argentina</strong></div>
               <div>Juncal 1311 7 Piso</div>
               <div>C1062ABO. Buenos Aires.</div>
               <div>info@qsocialnow.com</div>
           </div>
           <div className="contenedor-pais"> {/*contenedor pais */}
           <div><strong>España</strong></div>
               <div>Parque Empresarial Cortijo del Conde</div>
               <div>C/ Pago de Cambea 14, Nave 7</div>
               <div>CP 18015. Granada España.</div>
           </div>
           <div className="contenedor-pais"> {/*contenedor pais */}
           <div><strong>Estados Unidos</strong></div>
               <div>Latin Insights | Partner local</div>
               <div>111 West 33rd St.</div>
               <div>NY 10001, Nueva York.</div>
               <div>Tel.: +1 646 717 3131</div>
           </div>
       </div>
       </div>  
    </div>
  )
}
