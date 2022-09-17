import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, RightOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Typography, Card, Divider, Empty } from 'antd';

import Highlighter from 'react-highlight-words';
import TrackingSteps from './trackingSteps';

import Data from "../DataTracking.json";

const { Text, Link } = Typography;

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [Product, setProduct] = useState(Data);
  const [OrderID, setOrderID] = useState(null);

  const [order, setOrder] = useState({});

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  useEffect(() => {
    Data.map(order => {
      if (order.orderID == OrderID) {
        // console.log(order)
        setOrder(order)
      } else {
        console.log("suppl.product")
      }
    })
  }, [OrderID]);

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
      title: <Text >OrderID</Text>,
      dataIndex: 'orderID',
      key: 'orderID',
      align: 'center',
      ...getColumnSearchProps('orderID'),
      render: (orderID) =>
        <Space size="middle">
          <a onClick={e => setOrderID(orderID)} style={{ color: "#4185AE" }}>{orderID} <EyeOutlined /></a>
        </Space>
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      align: 'center',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      align: 'center',
    },

  ];
  return (
    <>
      <Card>
        <Divider orientation="left">
          Track you Order : {OrderID == null ? null : <Text code>{OrderID}</Text>} 
        </Divider>

        {OrderID == null ? <Empty /> :<TrackingSteps Order={order}/>}
        
      </Card>
      <br/>
      <Table
        size='small'
        columns={columns}
        dataSource={Product}
        pagination={false}
      />
    </>

  )
};

export default App;