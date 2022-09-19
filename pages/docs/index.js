import React, { useRef, useState } from 'react';
import { SearchOutlined, UploadOutlined, EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Typography, Row, Upload, message, Col, Card, Divider } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// import pdfFile from './sample.pdf';
import pdfFile2 from './exemple.pdf';

import Highlighter from 'react-highlight-words';

const { Text } = Typography;

const Documents = () => {
  const [searchText, setSearchText] = useState('');
  // const [Supplier, setSupplier] = useState(Data);
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [file, setFile] = useState();
  const [numPages, setNumPages] = useState(null);


  const onFileChange = (event) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0]);
  }

  // console.log(schema.toString())

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }

  const componentRef = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handlerPrint = () => {
    window.print(pdfFile, "PRINT", "height=800, width= 1000")
    // window.open("./sample.pdf");
    // window.open("data:application/pdf;base64, " + "./AttestationPensionPDF.pdf");
  }

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


  const Data = [{
    fileName: "Certification_Pdf.pdf",
    size: "8Mo",
    importDate: '24-03-2022',
    filePath: "",
  },
  {
    fileName: "Docs.pdf",
    size: "14Ko",
    importDate: '24-03-2022',
    filePath: "",
  },
  {
    fileName: "Certification.pdf",
    size: "10Ko",
    importDate: '24-03-2022',
    filePath: "",
  },
  
  {
    fileName: "Docs",
    size: "2M",
    importDate: '24-03-2022',
    filePath: "",
  },]


  const columns = [
    {
      title: <Text strong>#</Text>,
      align: 'center',
      render: (_, record) =>
        <Space size="middle">
          <FilePdfOutlined color='#F50404' />
        </Space>
    },
    {
      title: <Text strong>File name</Text>,
      dataIndex: 'fileName',
      key: 'fileName',
      align: 'center',
      render: (fileName) => {
        <Text >
          {fileName} lljoj</Text>
      },
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
          {/* <Link href={`/product/${record.key}`}> */}
          <Button
            type="dashed"
            shape="round"
            size="small"
            onClick={handlerPrint}
          >
            <Text strong style={{ fontSize: 13, color: "#4185AE" }} >View document <EyeOutlined /></Text>
          </Button>
          {/* </Link> */}
        </Space>
    },

  ];


  const props = {
    name: 'file',
    onChange(info) {

      console.log(info.file.originFileObj)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      setFile(info.file.originFileObj)

      // if (info.file.status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    onRemove(infor) {
      console.log(infor)
      setFile(null)
    }
  };
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
          <div>
            <label htmlFor="file">Load from file:</label>{" "}
            {/* <input onChange={onFileChange} type="file" /> */}
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {/* <Button icon={<DownloadOutlined />} size="small" type="file"/> */}
          </div>
          <div >
            <Document ref={componentRef} file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page width={400} height={400} pageNumber={pageNumber} />
            </Document>
            {/* <PDFReader url="./exemple.pdf"/> */}
          </div>
        </Card>
      </Col>
    </Row>
  )


  // return (
  //   <>
  //     <Divider orientation='left'>Document :</Divider>
  //     <Table
  //       columns={columns}
  //       dataSource={Data}
  //       // pagination={false}
  //       size="small"
  //     />
  //      <Card>
  //          <div>
  //            <label htmlFor="file">Load from file:</label>{" "}
  //            <input onChange={onFileChange} type="file" />
  //          </div>
  //          <div>
  //            <Document ref={componentRef} file={file} onLoadSuccess={onDocumentLoadSuccess}>
  //              <Page pageNumber={pageNumber} />
  //            </Document>
  //            {/* <PDFReader url="./exemple.pdf"/> */}
  //          </div>
  //      </Card>
  //   </>

  // )
};

export default Documents;