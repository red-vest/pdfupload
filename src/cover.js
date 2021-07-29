import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import axios from 'axios'
import { SettingOutlined, SettingFilled, SettingTwoTone } from '@ant-design/icons'
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

function dataURItoBlob (base64Data) {
  let byteString
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1])
  } else {
    byteString = unescape(base64Data.split(',')[1])
  }
  let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
  let ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
}

const list = [
  {
    name: '医疗',
    id: '7',
    url: i7,
    type: '',
    line1: { fontFamily: '思源宋体 CN', color: '#403f40', top: '155px', left: '83px', fontSize: '51px' },
    line2: { fontFamily: '思源宋体 CN', color: '#403f40', top: '296px', left: '132px', fontSize: '51px' },
    line3: { fontFamily: '思源黑体 CN Medium', color: '#fff', top: '425px', left: '273px', fontSize: '44px' }
  },
  {
    name: '军队文职', id: '6', url: i6, type: '',
    line1: {
      fontFamily: '旁门正道标题体',
      color: '#fff',
      top: '160px',
      left: '50%',
      fontSize: '63px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '旁门正道标题体',
      color: '#fff',
      top: '230px',
      left: '50%',
      fontSize: '63px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '公务员和事业单位', id: '5', url: i5, type: '',
    line1: {
      fontFamily: '旁门正道标题体',
      color: '#fff',
      top: '128px',
      left: '50%',
      fontSize: '53px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '旁门正道标题体',
      color: '#fff',
      top: '196px',
      left: '50%',
      fontSize: '53px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '教招1', id: '4', url: i4, type: '',
    line1: { fontFamily: '思源宋体 CN', color: '#403f40', top: '155px', left: '83px', fontSize: '51px' },
    line2: { fontFamily: '思源宋体 CN', color: '#403f40', top: '296px', left: '132px', fontSize: '51px' },
    line3: { fontFamily: '思源黑体 CN Medium', color: '#fff', top: '425px', left: '273px', fontSize: '44px' }
  },
  {
    name: '教招2', id: '3', url: i3, type: '',
    line1: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '128px',
      left: '50%',
      fontSize: '55px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '196px',
      left: '50%',
      fontSize: '55px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '公安', id: '2', url: i2, type: '',
    line1: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '128px',
      left: '50%',
      fontSize: '55px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '196px',
      left: '50%',
      fontSize: '55px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '银行', id: '1', url: i1, type: '',
    line1: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '128px',
      left: '50%',
      fontSize: '70px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '210px',
      left: '50%',
      fontSize: '70px',
      transform: 'translateX(-50%)'
    },
  }
]

function Cover (props) {
  const { getList } = props
  const [ editNum, setEditNum ] = useState(1)
  const [select, setSelect] = useState(list[0])
  const [one, setOne] = useState(list[0]['line1'])
  const [two, setTwo] = useState(list[0]['line2'])
  const [thr, setThr] = useState(list[0]['line3'])
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [line3, setLine3] = useState('')

  const html2image = async function () {
    let canvas = await html2canvas(document.querySelector('#edit'), { useCORS: true })
    return canvas.toDataURL('image/png')
  }
  const upload = async function () {
    let title = (Math.random()).toString(32).substr(2) + '.png'
    let base64 = await html2image()
    let url = 'https://api.xtjzx.cn/storage/res?filename=' + title
    let blob = dataURItoBlob(base64)
    let data = new FormData()
    data.append('file', blob)
    let result = await axios.post(url, data)
    getList([{ name: title, thumbUrl: base64, url: result.data.data.url }])
  }

  const save = async function () {
    const dataImg = new Image()
    dataImg.src = await html2image()
    const alink = document.createElement('a')
    alink.href = dataImg.src
    alink.download = 'testImg.jpg'
    alink.click()

  }
  return (
    <div className={'cover'}>
      <div className={'option'}>
        <div className={'left'}>
          <h2>选项</h2>
          <Form>
            <Form.Item label="课程类型">
              <Select defaultValue={'7'} onSelect={_ => {
                let index = list.findIndex(i => i.id === _)
                setSelect(list[index])
                try {
                  setOne(list[index]['line1'])
                  setTwo(list[index]['line2'])
                  setThr(list[index]['line3'])
                } catch (e) {}
                setLine1('')
                setLine2('')
                setLine3('')
              }}>
                {list.map(item => {
                  return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item label="行一">
              <Input
                addonAfter={<div onClick={_ => setEditNum(1)}>{editNum === 1 ? <SettingFilled/> : <SettingOutlined/>}</div>}
                disabled={select.line1 === undefined} onChange={_ => setLine1(_.target.value)} value={line1}/>
            </Form.Item>
            <Form.Item label="行二">
              <Input
                addonAfter={<div onClick={_ => setEditNum(2)}>{editNum === 2 ? <SettingFilled/> : <SettingOutlined/>}</div>}
                disabled={select.line2 === undefined} onChange={_ => setLine2(_.target.value)} value={line2}/>
            </Form.Item>
            <Form.Item label="行三">
              <Input
                addonAfter={<div onClick={_ => setEditNum(3)}>{editNum === 3 ? <SettingFilled/> : <SettingOutlined/>}</div>}
                disabled={select.line3 === undefined} onChange={_ => setLine3(_.target.value)} value={line3}/>
            </Form.Item>
            <div>
              <Button onClick={_ => upload()} style={{ marginRight: '20PX' }} type="primary">上传封面</Button>
              <Button onClick={() => save()}>保存封面</Button>
            </div>
          </Form>

          <Form style={{marginTop:'50px'}}>
            <h2>字体样式调整</h2>
            <Form.Item label='字形'>
              <Select>
                <Select.Option>华文行楷</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='字体大小'>
              <InputNumber/>
            </Form.Item>
            <Form.Item label='颜色'>
              <Input onInput={_=>console.log(_.target.value)} style={{width:'50px'}} type='color'/>
            </Form.Item>
            <Form.Item label='距上边缘'>
              <InputNumber formatter={value => `${value}px`}
                           parser={value => value.replace('px', '')}/>
            </Form.Item>
            <Form.Item label='距左边缘'>
              <InputNumber formatter={value => `${value}px`}
                           parser={value => value.replace('px', '')}/>
            </Form.Item>
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
