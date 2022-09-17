import Link from 'next/link'
import { Breadcrumb, Avatar, Menu } from 'antd';
import { MailOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

function Navbar() {
  return (
    <>
      <Menu
        style={{ display: "flex", 
        justifyContent: "flex-end" }}
        mode="horizontal" defaultSelectedKeys={['mail']}>
        <Menu.Item >
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
        </Menu.Item>
      </Menu>
     
    </>
  )
}

export default Navbar