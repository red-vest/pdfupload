import './App.css'
import { a, b } from './city'
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload, Input,
  message
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useState } from 'react'
import Cover from './cover'

const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const App = () => {
  const [cateList] = useState(b)
  const [cateId, setCateId] = useState('')
  const [cityCode, setCityCode] = useState('')
  const [pageNum, setPageNum] = useState(0)
  const [titleName, setTitleName] = useState('')
  const [resUrl, setResUrl] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [pagePrice, setPagePrice] = useState(0.1)
  const [courieFee, setCourieFee] = useState(12)
  const [pdfList, setPdfList] = useState([])
  const [upPdfUrl, setUpPdfUrl] = useState('https://api.xtjzx.cn/storage/res')
  const [coverList, setCoverList] = useState([])
  const props = {
    beforeUpload: file => {
      setPdfList([file])
      let url = upPdfUrl.split('?')[0] + '?filename=' + file.name
      setUpPdfUrl(url)
    },
    onRemove: (e) => {
      setResUrl('')
      setPdfList([])
    },
    onChange: (e) => {
      if (e.file['response'] !== undefined) {
        setResUrl(e.fileList)
        message.info(e.file['response']['status'])
        setResUrl(e.file['response']['data']['url'])
      }
    }
  }

  const propsTwo = {
    beforeUpload: file => {
      setCoverList([file])
      let url = upPdfUrl.split('?')[0] + '?filename=' + file.name
      setUpPdfUrl(url)
    },
    onRemove: (e) => {
      setCoverUrl('')
      setCoverList([])
    },
    onChange: (e) => {
      if (e.file['response'] !== undefined) {
        message.info(e.file['response']['status'])
        setCoverList(e.fileList)
        setCoverUrl(e.file['response']['data']['url'])
      }
    }
  }
  const submit = () => {
    if (pageNum === 0 || cateId === '' || cityCode === '' || titleName === '' || resUrl === '' || coverUrl === '') {
      message.error('????????????????????????????????????????????????????????????')
      return
    }
    setPdfList([])
    axios.post('https://zl.xtjzx.cn/data_pack/api/data/upload', {
      page_num: pageNum,
      category_ids: ',' + cateId,
      area_codes: cityCode,
      title_name: titleName,
      res_url: resUrl,
      cover_url: coverUrl,
      page_price: pagePrice * 100,
      courie_fee: courieFee * 100
    }).then(res => {
      message.success('????????????')
      setResUrl('')
      setCoverUrl('')
      setPdfList([])
      setCoverList([])
      setTitleName('')
      setPageNum(0)
    }).catch(err => console.log(err))
  }
  const setList = (value)=>{
    setCoverList(value)
    setCoverUrl(value[0]['url'])
  }
  return (
    <>
      <div className={'input'}>
        <h1 id={'hello'} style={{ textAlign: 'center' }}>????????????</h1>
        <Form name="validate_other" {...formItemLayout}>

          <Form.Item
            label="?????????"
          >
            <Input onChange={e => {setTitleName(e.target.value)}} value={titleName} placeholder="??????????????????"/>
          </Form.Item>

          <Form.Item
            name="select"
            label="????????????">
            <Select mode="multiple" allowClear onChange={(e) => {
              console.log(e)
              let str = ''
              e.forEach(i => {
                str = str + i + ','
              })
              setCateId(str)
            }} placeholder="?????????????????????">
              {cateList.map(item => {return <Option key={item.id} value={item.id}>{item.categoryName}</Option>})}
            </Select>
          </Form.Item>

          <Form.Item
            name="select-city"
            label="????????????">
            <Select
              mode="multiple"
              allowClear
              placeholder="?????????????????????"
              onChange={(e) => {
                let str = ''
                e.forEach(i => {
                  str = str + i + ','
                })
                setCityCode(str)
              }}
              filterOption={(input, option) =>
                option.children.indexOf(input) >= 0
              }
            >
              {a.map(item => {
                return <Option key={item.Code} value={item.Code}>{item.Name}</Option>
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="upload"
            label="??????pdf"
          >
            <Upload
              maxCount={1}
              fileList={pdfList}
              action={upPdfUrl}
              accept={'.pdf'}
              name="file"
              {...props}
            >
              <Button icon={<UploadOutlined/>}>????????????pdf</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="??????">
            <InputNumber value={pageNum} onChange={e => {setPageNum(e)}} min={1} max={9999}/>
          </Form.Item>

          <Form.Item
            label="????????????">
            <Upload
              fileList={coverList}
              maxCount={1}
              action={upPdfUrl}
              name="file"
              accept={'image/*'}
              {...propsTwo}
              listType="picture">
              <Button icon={<UploadOutlined/>}>??????????????????</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 6, }}>
            <Button onClick={() => submit()} type="primary">??????</Button>
          </Form.Item>
        </Form>
      </div>
      <Cover getList={setList}/>
    </>
  )
}

export default App
