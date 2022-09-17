import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link'
import { SearchOutlined, FallOutlined, EyeOutlined, RiseOutlined,  } from '@ant-design/icons';
import { Button, Input, Space, Table, Typography, Card, Row, Col, Divider, Avatar, Tag } from 'antd';
import Highlighter from 'react-highlight-words';

import { useRouter } from 'next/router';

import Data from "../../Data.json";

const { Text, Title } = Typography;

const ListProduct = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [product, setProduct] = useState([]);
  const [Supplier, setSupplier] = useState(Data);
  const searchInput = useRef(null);
  const router = useRouter()
  const supplierId = router.query.supplierId;

  useEffect(() => {
    Data.map(suppl => {
      if (suppl.key == supplierId) {
        // console.log(suppl.product)
        setSupplier(suppl)
        setProduct(suppl.product)
      } else {
        console.log("suppl.product")
      }
    })
  }, [supplierId]);

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

  const columns = [
    {
      title: <Text strong>Reference</Text>,
      dataIndex: 'reference',
      key: 'name',
      align: 'center',
      ...getColumnSearchProps('name'),
      render: (reference, record) =>
        <Space size="middle">
          <Link href={`/product/${supplierId}/overViewPrd/${record.reference}`}>
            <Text style={{ color: "#4185AE" }}>{reference}</Text>
          </Link>
        </Space>
    },
    {
      title: 'Product Name ',
      dataIndex: 'productName',
      key: 'productName',
      align: 'center',
      ...getColumnSearchProps('productName'),
    },
    {
      title: 'Type of material',
      dataIndex: 'typematiere',
      key: 'typematiere',
      align: 'center',
      ...getColumnSearchProps('typematiere'),
    },
    {
      title: 'Quality ',
      dataIndex: 'typeQuality',
      key: 'typeQuality',
      align: 'center',
      filters: [
        {text: 'High',value: 'High',},
        {text: 'Medium',value: 'Medium',},
        {text: 'Low',value: 'Low',}
      ],
      onFilter: (value, record) => record.typeQuality.includes(value),
      render: (_, { typeQuality }) => {
        if (typeQuality === 'High') {
          return <Tag color="#84F9D0">{typeQuality} <RiseOutlined/></Tag>
        }else if (typeQuality === 'Medium'){
          return <Tag color="">{typeQuality} </Tag>
        }else {
          return <Tag color="#B06262">{typeQuality} <FallOutlined/></Tag>
        }
      }
    },
    {
      title: 'Unit price ',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'center',
      sorter: (a, b) => a.unitPrice - b.unitPrice,
    },
    {
      title: 'Total price ',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Quantity ',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
    },
    {
      title: 'More details',
      align: 'center',
      render: (_, record) =>
        <Space size="middle">
          <Link href={`/product/${supplierId}/overViewPrd/${record.reference}`}>
            <Button
              type="dashed"
              shape="round"
              size="small"
            >
              <EyeOutlined style={{ fontSize: '10px', color: '#08c' }} />
            </Button>
          </Link>
        </Space>
    },
  ];
  return (

    <>
      <Row>
        <Col span={8} >
          <Space>
            <Avatar
              style={{
                backgroundColor: '#94B7CC',
              }}
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
            >
              S
            </Avatar>
            <Text strong>{Supplier.name}
              <br></br>
              <span style={{ fontSize: '10px', }}>( 97% Positive feedback )</span>
            </Text>
          </Space>
          <Card
            hoverable
            style={{ marginTop: 5}}
          >
            <Divider orientation="left"><Text stong style={{ fontSize: '15px', color: '#08c' }}>About Supplier</Text></Divider>
            <Row>
              <Col>
                {/* <Text>Supplier Name</Text> :
                <br></br> */}
                <Text>Company name</Text> :
                <br></br>
                <Text>Street</Text> :
                <br></br>
                <Text>City</Text> :
                <br></br>
                <Text>Postal code:</Text> :
              </Col>
              <Col push={1}>
                {/* <Text strong>{Supplier.name}</Text>
                <Text stong style={{ fontSize: '10px', color: '#08c' }}> ( 97% </Text>
                <Text style={{ fontSize: '10px', }}>Positive feedback )</Text> */}

                {/* <br></br> */}
                <Text strong>{Supplier.companyName}</Text>
                <br></br>
                <Text strong>{Supplier.street}</Text>
                <br></br>
                <Text strong>{Supplier.city}</Text>
                <br></br>
                <Text strong>{Supplier.postalCode}</Text>
              </Col>
            </Row>
            <Divider orientation="left"><Text stong style={{ fontSize: '15px', color: '#08c' }}>Invoices</Text></Divider>
            <Text >This supplier does not issue invoices.</Text>
            <Divider orientation="left"><Text stong style={{ fontSize: '15px', color: '#08c' }}>Delivery time</Text></Divider>
            Instant delivery
          </Card>
        </Col>
        <Col span={15} push={1}>
          <Card
            title={<Text style={{ color: "#4185AE" }}>Supplier's products</Text>}
            hoverable
          >
            <Table
              columns={columns}
              dataSource={product}
              // pagination={true}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </>

  )
};

export default ListProduct;