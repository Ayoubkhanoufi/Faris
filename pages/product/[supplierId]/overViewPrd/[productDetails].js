import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Tabs, Card, Badge, Descriptions, Typography, Divider, Image, Row, Col } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from 'react-slick';



import 'antd/dist/antd.css';
import Data from "../../../Data.json";

const { Text, Title } = Typography
const { TabPane } = Tabs;


const detailProduct = () => {

  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [visible, setVisible] = useState(false);

  const onChange = (key) => {
    console.log(key);
  };

  const router = useRouter()
  const { supplierId, productDetails } = router.query;

  useEffect(() => {
    Data.map(suppl => {
      if (suppl.key == supplierId) {
        suppl.product.map(prd => {
          if (prd.reference == productDetails) {
            console.log("s.product", prd)
            setProductDetail(prd)
          } else {
            console.log("detailsproduct")
          }
        })
      } else {
        console.log("suppl.product")
      }
    })

  }, [supplierId]);

  return (
    <>
      <Divider orientation="left">
        <EyeOutlined style={{ color: '#08c' }} />
        <Text stong style={{ fontSize: '15px', color: '#08c' }}> Overview </Text>
      </Divider>
      <Card hoverable>
        {/* <Tabs defaultActiveKey="1" onChange={onChange}> */}
        {/* <TabPane tab={<span><EyeOutlined /><Text strong>Overview </Text></span>} key="1"> */}
        <Row>
          <Col span={6}>
            <Image
              preview={{
                visible: false,
              }}
              width={250}
              src="https://www.mouser.lu/images/tycoelectronics/lrg/ITP_2040278-2_t.JPG"
              onClick={() => setVisible(true)}
            />
            <div
              style={{
                paddingTop: 5,
              }}
            >
              <Image.PreviewGroup
                preview={{
                  visible,
                  onVisibleChange: (vis) => setVisible(vis),
                }}
              >
                <Image width={50} height={50} src="https://www.mouser.lu/images/tycoelectronics/lrg/ITP_2040278-2_t.JPG" />
                <Image width={50} height={50} src="https://sc01.alicdn.com/kf/HTB1V6FADAKWBuNjy1zjq6AOypXaX/221504212/HTB1V6FADAKWBuNjy1zjq6AOypXaX.jpg" />
                <Image width={50} height={50} src="https://ae01.alicdn.com/kf/HTB17MtNahz1gK0jSZSgq6yvwpXa2/Connecteur-de-capteur-d-acc-l-rateur-prise-de-capteur-de-niveau-de-fluide-de-frein.jpg" />
              </Image.PreviewGroup>
            </div>

          </Col>
          <Col span={18} >
            <Descriptions
              title={<Title level={5} >Product reference : <Text code>{productDetail.reference}</Text></Title>}
              bordered
              size="small"
              column={{
                xxl: 4,
                xl: 3,
                lg: 3,
                md: 3,
                sm: 2,
                xs: 1,
              }}
            >
              <Descriptions.Item
                label={<Text strong>Name</Text>}
              >
                {productDetail.productName}
              </Descriptions.Item>
              <Descriptions.Item
                label={<Text strong>Type of material</Text>}
              >
                {productDetail.typematiere}
              </Descriptions.Item>
              <Descriptions.Item
                label={<Text strong>Quality</Text>}
              >
                {productDetail.typeQuality}
              </Descriptions.Item>
              <Descriptions.Item
                label={<Text strong>Quantity</Text>}
              >
                {productDetail.quantity}
              </Descriptions.Item>
              <Descriptions.Item
                label={<Text strong>Production Status</Text>}
                span={3}
              >
                <Badge status="processing" text={productDetail.productionStatus} />
              </Descriptions.Item>
              <Descriptions.Item
                label={<Text strong>Production Start</Text>}
                span={1}
              >
                {productDetail.productionStartDate}
              </Descriptions.Item>
              <Descriptions.Item
                label={<Text strong>Production End</Text>}
                span={2}
              >
                {productDetail.productionEndtDate}
              </Descriptions.Item>

              <Descriptions.Item
                label={<Text strong>Unit price</Text>}>
                <Text strong code>{productDetail.unitPrice}</Text>Dhs
              </Descriptions.Item>
              <Descriptions.Item
                label={<Text strong>Total price</Text>}
                span={2}
              >
                <Text strong code>{productDetail.totalPrice}</Text>Dhs
              </Descriptions.Item>
              <Descriptions.Item
                label={<Text strong>More Infos</Text>}>
                -
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        {/* </TabPane>
        </Tabs> */}


      </Card>
    </>
  );
};

export default detailProduct;




