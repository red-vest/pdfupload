import React, { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import axios from 'axios'
import { SketchPicker,ChromePicker  } from 'react-color';
import {
  SettingOutlined,
  SettingFilled,
  SettingTwoTone,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined
} from '@ant-design/icons'
import './cover.css'
import img from './d.jpg'
import i9 from './back/9.png'
import i8 from './back/8.png'
import i7 from './back/7.png'
import i6 from './back/6.png'
import i5 from './back/5.png'
import i4 from './back/4.png'
import i3 from './back/3.png'
import i2 from './back/2.png'
import i1 from './back/1.png'
import i10 from './back/10.png'
import i11 from './back/11.png'
import i12 from './back/12.png'
import i13 from './back/13.png'
import i14 from './back/14.png'
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload, Input,
  Radio,
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

const fontFamily = ['阿里巴巴普惠体','江西拙楷','仓耳渔阳体', '汉仪正圆-85S', '思源宋体 CN', '旁门正道标题体', '思源黑体 CN Medium', '思源黑体 CN Regular', '黑体', '宋体', '微软雅黑', '等线']
const list = [
  {
    name: '公考时政', id: '14', url: i14, type: '',
    line1: {
      fontFamily: '旁门正道标题体',
      color: '#fad78c',
      top: '120px',
      left: '170px',
      fontSize: '75px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '120px',
      left: '350px',
      fontSize: '75px',
      transform: 'translateX(-50%)'
    },
    line3: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '200px',
      left: '250px',
      fontSize: '75px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '公考考情', id: '13', url: i13, type: '',
    line1: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '120px',
      left: '250px',
      fontSize: '67px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '190px',
      left: '250px',
      fontSize: '67px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '公考面试', id: '12', url: i12, type: '',
    line1: {
      fontFamily: '江西拙楷',
      color: '#246acf',
      top:'105px',
      left:'250px',
      fontSize: '60px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '江西拙楷',
      color: '#246acf',
      top:'190px',
      left:'250px',
      fontSize: '60px',
      transform: 'translateX(-50%)'
    }
  },
  {
    name: '教招考情', id: '11', url: i11, type: '',
    line1: {
      fontFamily: '仓耳渔阳体',
      color: '#333333',
      top:'105px',
      left:'250px',
      fontSize: '75px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '仓耳渔阳体',
      color: '#333333',
      top:'190px',
      left:'250px',
      fontSize: '75px',
      transform: 'translateX(-50%)'
    }
  },
  {
    name: '教招时政', id: '10', url: i10, type: '',
    line1: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '100px',
      left: '250px',
      fontSize: '67px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '170px',
      left: '250px',
      fontSize: '67px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '教招真题', id: '9', url: i9, type: '',
    line1: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '100px',
      left: '250px',
      fontSize: '67px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '170px',
      left: '250px',
      fontSize: '67px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name:'考编百事通',
    id:'8',
    url:i8,
    type:''
  },
  {
    name: '医疗',
    id: '7',
    url: i7,
    type: '',
    line1: { fontFamily: '思源宋体 CN', color: '#403f40', top: '155px', left: '83px', fontSize: '51px' },
    line2: { fontFamily: '思源宋体 CN', color: '#403f40', top: '296px', left: '132px', fontSize: '51px' },
    line3: { fontFamily: '思源黑体 CN Medium', color: '#ffffff', top: '425px', left: '273px', fontSize: '44px' }
  },
  {
    name: '军队文职', id: '6', url: i6, type: '',
    line1: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '160px',
      left: '250px',
      fontSize: '63px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '230px',
      left: '250px',
      fontSize: '63px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '公务员和事业单位', id: '5', url: i5, type: '',
    line1: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '128px',
      left: '250px',
      fontSize: '53px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '旁门正道标题体',
      color: '#ffffff',
      top: '196px',
      left: '250px',
      fontSize: '53px',
      transform: 'translateX(-50%)'
    },
  },
  {
    name: '教招1', id: '4', url: i4, type: '',
    line1: { fontFamily: '思源宋体 CN', color: '#403f40', top: '155px', left: '83px', fontSize: '51px' },
    line2: { fontFamily: '思源宋体 CN', color: '#403f40', top: '296px', left: '132px', fontSize: '51px' },
    line3: { fontFamily: '思源黑体 CN Medium', color: '#ffffff', top: '425px', left: '273px', fontSize: '44px' }
  },
  {
    name: '教招2', id: '3', url: i3, type: '',
    line1: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '128px',
      left: '250px',
      fontSize: '55px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '196px',
      left: '250px',
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
      left: '250px',
      fontSize: '55px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '196px',
      left: '250px',
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
      left: '250px',
      fontSize: '70px',
      transform: 'translateX(-50%)'
    },
    line2: {
      fontFamily: '汉仪正圆-85S',
      color: '#000',
      top: '210px',
      left: '250px',
      fontSize: '70px',
      transform: 'translateX(-50%)'
    },
  }
]

function Cover (props) {
  const { getList } = props
  const [editNum, setEditNum] = useState(1)
  const [displayColorPicker,setDisplayColorPicker] = useState(false)
  const [select, setSelect] = useState(list[0])
  const [s1, setS1] = useState(list[0]['line1'])
  const [s2, setS2] = useState(list[0]['line2'])
  const [s3, setS3] = useState(list[0]['line3'])
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
    message.info(result.data.status)
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
  const fontFamilyChange = (value) => {
    switch (editNum) {
      case 1:
        setS1({ ...s1, fontFamily: value })
        break
      case 2:
        setS2({ ...s2, fontFamily: value })
        break
      case 3:
        setS3({ ...s3, fontFamily: value })
        break
    }
  }
  const fontSizeChange = (value) => {
    switch (editNum) {
      case 1:
        setS1({ ...s1, fontSize: value + 'px' })
        break
      case 2:
        setS2({ ...s2, fontSize: value + 'px' })
        break
      case 3:
        setS3({ ...s3, fontSize: value + 'px' })
        break
    }
  }
  const colorChange = (value) => {
    switch (editNum) {
      case 1:
        setS1({ ...s1, color: value })
        break
      case 2:
        console.log(2)
        setS2({ ...s2, color: value })
        break
      case 3:
        console.log(3)
        setS3({ ...s3, color: value })
        break
    }
  }
  const topChange = (value) => {
    switch (editNum) {
      case 1:
        setS1({ ...s1, top: value + 'px' })
        break
      case 2:
        setS2({ ...s2, top: value + 'px' })
        break
      case 3:
        setS3({ ...s3, top: value + 'px' })
        break
    }
  }
  const leftChange = (value) => {
    switch (editNum) {
      case 1:
        setS1({ ...s1, left: value + 'px' })
        break
      case 2:
        setS2({ ...s2, left: value + 'px' })
        break
      case 3:
        setS3({ ...s3, left: value + 'px' })
        break
    }
  }
  const align = (value) => {
    switch (editNum) {
      case 1:
        setS1({
          ...s1,
          left: value === 'left' ? '0px' : value === 'center' ? '250px' : '500px',
          transform: value === 'left' ? 'translateX(0%)' : value === 'center' ? 'translateX(-50%)' : 'translateX(-100%)'
        })
        break
      case 2:
        setS2({
          ...s2, left: value === 'left' ? '0px' : value === 'center' ? '250px' : '500px',
          transform: value === 'left' ? 'translateX(0%)' : value === 'center' ? 'translateX(-50%)' : 'translateX(-100%)'
        })
        break
      case 3:
        setS3({
          ...s3, left: value === 'left' ? '0px' : value === 'center' ? '250px' : '500px',
          transform: value === 'left' ? 'translateX(0%)' : value === 'center' ? 'translateX(-50%)' : 'translateX(-100%)'
        })
        break
    }
  }
  const reset = ()=>{
    switch (editNum) {
      case 1:
        setS1(select['line1'])
        break
      case 2:
        setS2(select['line2'])
        break
      case 3:
        setS3(select['line3'])
        break
    }
  }
  return (
    <div className={'cover'}>
      <h1>合成封面</h1>
      <div className={'option'}>
        <div className={'left'}>
          <h2>选项</h2>
          <Form>
            <Form.Item label="课程类型">
              <Select defaultValue={'14'} onSelect={_ => {
                let index = list.findIndex(i => i.id === _)
                setSelect(list[index])
                setEditNum(1)
                try {
                  setS1(list[index]['line1'])
                  setS2(list[index]['line2'])
                  setS3(list[index]['line3'])
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
                addonAfter={<div style={select.line1===undefined?{pointerEvents:'none'}:{}} onClick={_ => setEditNum(1)}>{editNum === 1 ? <SettingFilled/> :
                  <SettingOutlined/>}</div>}
                disabled={select.line1 === undefined} onChange={_ => setLine1(_.target.value)} value={line1}/>
            </Form.Item>
            <Form.Item label="行二">
              <Input
                addonAfter={<div style={select.line2===undefined?{pointerEvents:'none'}:{}} onClick={_ => setEditNum(2)}>{editNum === 2 ? <SettingFilled/> :
                  <SettingOutlined/>}</div>}
                disabled={select.line2 === undefined} onChange={_ => setLine2(_.target.value)} value={line2}/>
            </Form.Item>
            <Form.Item label="行三">
              <Input
                addonAfter={<div style={select.line3===undefined?{pointerEvents:'none'}:{}} onClick={_ => setEditNum(3)}>{editNum === 3 ? <SettingFilled/> :
                  <SettingOutlined/>}</div>}
                disabled={select.line3 === undefined} onChange={_ => setLine3(_.target.value)} value={line3}/>
            </Form.Item>
            <div>
              <Button onClick={_ => upload()} style={{ marginRight: '20PX' }} type="primary">上传封面</Button>
              <Button onClick={() => save()}>保存封面</Button>
            </div>
          </Form>
          {
            select.line1===undefined?'':<Form style={{ marginTop: '50px' }}>
              <h2>字体样式调整(行{editNum})</h2>
              <Form.Item label="字形">
                <Select value={editNum === 1 ? s1['fontFamily'] : editNum === 2 ? s2['fontFamily'] : s3['fontFamily']}
                        onSelect={_ => fontFamilyChange(_)}>
                  {fontFamily.map((item, index) => {
                    return <Select.Option key={index} value={item}>{item}</Select.Option>
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="字体大小">
                <InputNumber onChange={fontSizeChange}
                             value={parseInt(editNum === 1 ? s1['fontSize'] : editNum === 2 ? s2['fontSize'] : s3['fontSize'])}
                             formatter={value => `${value}px`}
                             parser={value => value.replace('px', '')}/>
              </Form.Item>
              <Form.Item label="颜色">
                <input type='color'
                       value={editNum===1?s1['color']:editNum===2?s2['color']:s3['color']}
                       onChange={_=>colorChange(_.target.value)}
                       className={'colorPicker'}/>
              </Form.Item>
              <Form.Item label="距上边缘">
                <InputNumber onChange={topChange}
                             value={parseInt(editNum === 1 ? s1['top'] : editNum === 2 ? s2['top'] : s3['top'])}
                             formatter={value => `${value}px`}
                             parser={value => value.replace('px', '')}/>
              </Form.Item>
              <Form.Item label="距左边缘">
                <InputNumber onChange={leftChange}
                             value={parseInt(editNum === 1 ? s1['left'] : editNum === 2 ? s2['left'] : s3['left'])}
                             formatter={value => `${value}px`}
                             parser={value => value.replace('px', '')}/>
              </Form.Item>
              <Form.Item label="左右对齐">
                <Radio.Group onChange={_ => align(_.target.value)}>
                  <Radio.Button value="left"><AlignLeftOutlined/></Radio.Button>
                  <Radio.Button value="center"><AlignCenterOutlined/></Radio.Button>
                  <Radio.Button value="right"><AlignRightOutlined/></Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item><Button onClick={_=>reset()}>重置样式</Button></Form.Item>
            </Form>
          }
        </div>
        <div id={'edit'} className={'edit'}>
          <img className={'img'} src={select['url']}/>
          <p style={s1} className={'text'}>{line1}</p>
          <p style={s2} className={'text'}>{line2}</p>
          <p style={s3} className={'text'}>{line3}</p>
        </div>
      </div>
    </div>
  )
}

export default Cover
