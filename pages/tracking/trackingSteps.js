import React, { useState } from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Typography, message, Steps } from 'antd';

const { Text } = Typography;
const { Step } = Steps;



const TrackingSteps = ({Order}) => {

    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title:<Text strong>Start production</Text>,
            content: <span style={{fontSize: 11}}>
                Reference material :<Text strong>{Order.reference}</Text><br />
                <Text>Type quality :{Order.typeQuality} </Text>
            </span>,
            icon: <SolutionOutlined />
        },
        {
            title:<Text strong>Level production</Text>,
            content: <span>Quantity :<Text code >{Order.quantity}</Text>/{Order.totalQuantity}</span>,
            icon: <LoadingOutlined />
        },
        {
            title:<Text strong>End production</Text>,
            content: 'End production',
            icon: <SmileOutlined />
        },
        {
            title:<Text strong>Start loading</Text>,
            content: <span>
                <Text>From : </Text><br />
                <Text>To : </Text>
            </span>,
            icon: <UserOutlined />
        },
        {
            title:<Text strong>End loading</Text>,
            content: 'end loading',
            icon: <UserOutlined />
        },
    
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (

        <>
            <Steps current={current} size="small" >
                {steps.map((item) => (
                    <Step
                        key={item.title}
                        title={item.title}
                        icon={item.icon}
                        description={item.content} />
                ))}
            </Steps>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </>

    )
};

export default TrackingSteps; 