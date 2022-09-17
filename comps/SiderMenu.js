import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link'
import {
    UploadOutlined,
    UserOutlined,
    FileOutlined,
    AimOutlined
} from '@ant-design/icons';

function SiderMenu() {
    return (
        <>
            <div className="logo"> logo </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                // style={{backgroundColor:  "#94B7CC"}}
            >
                <Menu.Item key="1" icon={<UploadOutlined />}>
                    <Link href="/">
                        Dashboard  
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    <Link href="/supplier/">
                        Fournisseurs 
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<AimOutlined />}>
                    <Link href="/tracking/">
                        Tracking
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<FileOutlined />}>
                    <Link href="/docs/">
                        Docs
                    </Link>
                </Menu.Item>
            </Menu>
        </>
    )
}

export default SiderMenu