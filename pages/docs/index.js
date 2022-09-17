import React, { useRef, useState } from 'react';
import Link from 'next/link'
import { SearchOutlined, RightOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Typography, Row, Avatar, Col, Card } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import dynamic from 'next/dynamic';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`


import Highlighter from 'react-highlight-words';
// import Data from "../Data.json";

const { Text } = Typography;
import pdf from "./exemple.pdf"

const Documents = () => {
  const [searchText, setSearchText] = useState('');
  // const [Supplier, setSupplier] = useState(Data);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const Data = [{
    fileName: "Docs 1",
    size: "10Ko",
    importDate: '24-03-2022',
    filePath: "",

  }]

  const FileViewer = dynamic(() => import('react-file-viewer'), {
    ssr: false
  });

  const columns = [
    {
      title: <Text strong>#</Text>,
      align: 'center',
      render: (_, record) =>
        <Space size="middle">
          <Avatar
            style={{
              backgroundColor: '#94B7CC',
            }}
          >
            S
          </Avatar>
        </Space>
    },
    {
      title: <Text strong>File name</Text>,
      dataIndex: 'fileName',
      key: 'fileName',
      align: 'center',
      render: () => { <Text> </Text> },
      ...getColumnSearchProps('fileName'),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      align: 'center',
    },
    {
      title: 'Date ',
      dataIndex: 'importDate',
      key: 'importDate',
      align: 'center',
    },
    {
      title: 'Action',
      align: 'center',
      render: (_, record) =>
        <Space size="middle">
          <Link href={`/product/${record.key}`}>
            <Button
              type="dashed"
              shape="round"
              size="small"

            >
              <Text strong style={{ fontSize: 13, color: "#4185AE" }} >View more <EyeOutlined /></Text>
            </Button>
          </Link>
        </Space>
    },

  ];
  return (
    <Row>
      <Col span={11} >
        <Table
          columns={columns}
          dataSource={Data}
          // pagination={false}
          size="small"
        />
      </Col>
      <Col span={12} push={1}>
        <Card>
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>

          {/* <FileViewer fileType="pdf" filePath="./exemple.pdf" /> */}
        </Card>
      </Col>
    </Row>

  )
};

export default Documents;