import './App.css'
import { a, b } from './city'
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload,Input,
  message
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useState } from 'react'

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
    if (pageNum === 0 || cateId === '' || cityCode === '' || titleName === '' || resUrl === '' || coverUrl === '' ) {
      message.error('请检查是否存在未填写项，或者填写内容错误')
      return
    }
    setPdfList([])
    axios.post('https://zl.xtjzx.cn/data_pack/api/data/upload', {
      page_num: pageNum,
      category_id: cateId,
      area_codes: cityCode,
      title_name: titleName,
      res_url: resUrl,
      cover_url: coverUrl,
      page_price: pagePrice * 100,
      courie_fee: courieFee * 100
    }).then(res => {
      message.success('提交成功')
      setResUrl('')
      setCoverUrl('')
      setPdfList([])
      setCoverList([])
      setTitleName('')
      setPageNum(0)
    }).catch(err => console.log(err))
  }
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>资源上传</h1>
      <Form name="validate_other" {...formItemLayout}>

        <Form.Item
          label="标题名"
        >
          <Input onChange={e => {setTitleName(e.target.value)}} value={titleName} placeholder="请输入标题名"/>
        </Form.Item>

        <Form.Item
          name="select"
          label="资源分类">
          <Select allowClear onChange={(e) => {setCateId(e)}} placeholder="请选择资源分类">
            {cateList.map(item => {return <Option key={item.id} value={item.id}>{item.categoryName}</Option>})}
          </Select>
        </Form.Item>

        <Form.Item
          name="select-city"
          label="地区选择">
          <Select
            mode="multiple"
            allowClear
            placeholder="请选择对应地区"
            onChange={(e) => {
              let str = ''
              e.forEach(i=>{
                str = str+i+',';
              })
              setCityCode(str)
            }}
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
          >
            {a.map(item=>{
              return <Option key={item.Code} value={item.Code}>{item.Name}</Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="upload"
          label="上传pdf"
        >
          <Upload
            maxCount={1}
            fileList={pdfList}
            action={upPdfUrl}
            accept={'.pdf'}
            name="file"
            {...props}
          >
            <Button icon={<UploadOutlined/>}>点击上传pdf</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="页数">
            <InputNumber value={pageNum} onChange={e => {setPageNum(e)}} min={1} max={999}/>
        </Form.Item>
        {/*<Form.Item label="每页价格">*/}
        {/*    <InputNumber*/}
        {/*      defaultValue={0.1}*/}
        {/*      step="0.1"*/}
        {/*      min={0}*/}
        {/*      formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*/}
        {/*      parser={value => value.replace(/\￥\s?|(,*)/g, '')}*/}
        {/*      onChange={e => {setPagePrice(e)}}*/}
        {/*    />*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label="邮费">*/}
        {/*    <InputNumber*/}
        {/*      defaultValue={12}*/}
        {/*      step="1"*/}
        {/*      min={0}*/}
        {/*      formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*/}
        {/*      parser={value => value.replace(/\￥\s?|(,*)/g, '')}*/}
        {/*      onChange={e => {setCourieFee(e)}}*/}
        {/*    />*/}
        {/*</Form.Item>*/}

        <Form.Item label="上传封面">
          <Upload
            fileList={coverList}
            maxCount={1}
            action={upPdfUrl}
            name="file"
            accept={'image/*'}
            {...propsTwo}
            listType="picture">
            <Button icon={<UploadOutlined/>}>点击上传封面</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12, offset: 6, }}>
          <Button onClick={() => submit()} type="primary">提交</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default App
