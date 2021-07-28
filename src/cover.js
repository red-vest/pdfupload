import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import './cover.css'
import img from './d.jpg'
import i7 from './back/7.png'
import i6 from './back/6.png'
import i5 from './back/5.png'
import i4 from './back/4.png'
import i3 from './back/3.png'
import i2 from './back/2.png'
import i1 from './back/1.png'
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload, Input,
  message
} from 'antd'

const test = function () {
  html2canvas(document.querySelector('#edit'), { useCORS: true }).then(canvas => {
    const dataImg = new Image()
    console.log(canvas.toDataURL('image/png'))
    dataImg.src = canvas.toDataURL('image/png')
    const alink = document.createElement('a')
    alink.href = dataImg.src
    alink.download = 'testImg.jpg'
    alink.click()
  })
}

const list = [
  {
    name: '医疗',
    id: '7',
    url: i7,
    type: '',
    line1: { fontFamily: '思源宋体 CN', color: '#403f40', top: '155px', left: '83px', fontSize: '51px' },
    line2: { fontFamily: '思源宋体 CN', color: '#403f40', top: '296px', left: '132px', fontSize: '51px' },
    line3: { fontFamily: '思源黑体 CN Medium', color: '#fff', top: '425px', left: '273px', fontSize: '44px'}
  },
  { name: '军队文职', id: '6', url: i6, type: '' },
  { name: '公务员和事业单位', id: '5', url: i5, type: '' },
  { name: '教招1', id: '4', url: i4, type: '' },
  { name: '教招2', id: '3', url: i3, type: '' },
  { name: '公安', id: '2', url: i2, type: '' },
  { name: '银行', id: '1', url: i1, type: '' }
]

function Cover () {
  const [select, setSelect] = useState(list[0])
  const [one, setOne] = useState(list[0]['line1'])
  const [two, setTwo] = useState(list[0]['line2'])
  const [thr, setThr] = useState(list[0]['line3'])
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [line3, setLine3] = useState('')
  return (
    <div className={'cover'}>
      <h1>制作封面</h1>
      <div className={'option'}>
        <div className={'left'}>
          <h2>选项</h2>
          <Form>
            <Form.Item label="课程类型">
              <Select defaultValue={'7'} onSelect={_ => {
                let index = list.findIndex(i => i.id === _)
                setSelect(list[index])
              }}>
                {list.map(item => {
                  return <option value={item.id}>{item.name}</option>
                })}
              </Select>
            </Form.Item>
            <Form.Item label="行一">
              <Input onChange={_ => setLine1(_.target.value)} value={line1}/>
            </Form.Item>
            <Form.Item label="行二">
              <Input onChange={_ => setLine2(_.target.value)} value={line2}/>
            </Form.Item>
            <Form.Item label="行三">
              <Input onChange={_ => setLine3(_.target.value)} value={line3}/>
            </Form.Item>
            <div>
              <Button style={{marginRight:'20PX'}} type="primary">上传封面</Button>
              <Button onClick={()=>test()}>保存封面</Button>
            </div>
          </Form>
        </div>
        <div id={'edit'} className={'edit'}>
          <img className={'img'} src={select['url']}/>
          <p style={one} className={'text'}>{line1}</p>
          <p style={two} className={'text'}>{line2}</p>
          <p style={thr} className={'text'}>{line3}</p>
        </div>
      </div>
    </div>
  )
}

export default Cover
