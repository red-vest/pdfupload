import React from 'react'
import html2canvas from 'html2canvas'
import './cover.css'
import img from './d.jpg'

const test = function () {
  html2canvas(document.querySelector('#edit'), { useCORS: true }).then(canvas => {
    const dataImg = new Image()
    dataImg.src = canvas.toDataURL('image/png')
    const alink = document.createElement('a')
    alink.href = dataImg.src
    alink.download = 'testImg.jpg'
    alink.click()
  })
}

function Cover(){
  return(
    <div className={'cover'}>
      <div id={'edit'} className={'edit'}>
        <img className={'img'} src={img}/>
        <p className={'text1'}>将进酒</p>
      </div>
    </div>
  )
}
export default Cover
