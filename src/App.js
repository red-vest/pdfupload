import './App.css'
import { a, b } from './city'
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload,
  Cascader, Input,
} from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
  const [cateList, setCateList] = useState(b)
  const [cateId, setCateId] = useState(3)
  const [cityCode, setCityCode] = useState(0)
  const [pageNum, setPageNum] = useState(0)
  const [titleName, setTitleName] = useState('')
  const [resUrl, setResUrl] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [pagePrice, setPagePrice] = useState(0.1)
  const [courieFee, setCourieFee] = useState(12)
  const [pdfList,setPdfList] = useState([])
  const [upPdfUrl, setUpPdfUrl] = useState('https://api.xtjzx.cn/storage/res')
  const props = {
    beforeUpload: file => {
      setPdfList([file])
      let url = upPdfUrl.split('?')[0] + '?filename=' + file.name
      setUpPdfUrl(url)
    }
  }
  const submit = () => {
    console.log(pageNum,cateId,cityCode,titleName,resUrl,coverUrl,pagePrice,courieFee)
    setPdfList([])
    axios.post('https://api.xtjzx.cn/data_pack/api/data/upload',{
      page_num:pageNum,
      category_id:cateId,
      area_code:cityCode,
      title_name:titleName,
      res_url:resUrl,
      cover_url:coverUrl,
      page_price:pagePrice,
      courie_fee:courieFee
    }).then(res=>console.log(res)).catch(err=>console.log(err))
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
          <Cascader placeholder="请选择对应地区" onChange={(e) => {setCityCode(e[1])}} options={a}
                    fieldNames={{ label: 'Name', value: 'Code', children: 'Cits' }}/>
        </Form.Item>

        <Form.Item
          name="upload"
          label="上传pdf"
        >
          <Upload
            maxCount={1}
            fileList={pdfList}
            action={upPdfUrl}
            name="file"
            {...props}
          >
            <Button icon={<UploadOutlined/>}>点击上传pdf</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="页数">
          <Form.Item noStyle>
            <InputNumber onChange={e => {setPageNum(e)}} min={1} max={999}/>
          </Form.Item>
        </Form.Item>
        <Form.Item label="每页价格">
          <Form.Item noStyle>
            <InputNumber
              defaultValue={0.1}
              step="0.1"
              min={0}
              formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\￥\s?|(,*)/g, '')}
              onChange={e => {setPagePrice(e)}}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item label="邮费">
          <Form.Item noStyle>
            <InputNumber
              defaultValue={12}
              step="1"
              min={0}
              formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\￥\s?|(,*)/g, '')}
              onChange={e => {setCourieFee(e)}}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="上传封面"
        >
          <Upload
            action="https://api.xtjzx.cn/storage/res"
            name="file"
            listType="picture"
          >
            <Button icon={<UploadOutlined/>}>点击上传封面</Button>
          </Upload>
        </Form.Item>


        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button onClick={() => submit()} type="primary">
            提交
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default App