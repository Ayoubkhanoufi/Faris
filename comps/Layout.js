import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import styles from '../styles/Home.module.css'
import Navbar from './Navbar';
import SiderMenu from './SiderMenu';

const { Header, Content, Footer, Sider } = Layout;

function Layouts({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <div className={styles.container}>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider  
                 collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <SiderMenu/>
                </Sider>
                <main className={styles.main}>
                    <Layout className="site-layout">
                        <Header
                            className="site-layout-background"
                        >
                            <Navbar />
                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '5px 5px',
                                padding: 7,
                                minHeight: 280,
                            }}
                        >
                            {children}
                        </Content>
                        <Footer
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Untitled ©2022 
                        </Footer>
                    </Layout>
                </main>
            </Layout>
            </div>

        </>
    )
}

export default Layouts