import React from 'react'
import {BsTwitter, BsFacebook, BsInstagram, BsLinkedin, BsYoutube} from 'react-icons/bs'
import './Footer.css'
import { Button } from 'antd'

export default function Footer() {
  return (
    <div className="bg-light">
      
      <div className='footer'>
        <a href="https://twitter.com/qsocialnow" className='a'><BsTwitter/></a>
        <a href="https://www.facebook.com/qsocialnow/" className='a'><BsFacebook/></a>
        <a href="https://www.instagram.com/qsocialnow/" className='a'><BsInstagram/></a>
        <a href="https://www.linkedin.com/company/qsocialnow/mycompany/" className='a'><BsLinkedin/></a>
        <a href="https://www.youtube.com/channel/UCxVtPTAZbUzzr7K3906t0FQ" className='a'><BsYoutube/></a>
        <div className='linea-footer'>|</div>
        <div>© 2023, QSocialNow</div>
        </div>
    </div>
  )
}
