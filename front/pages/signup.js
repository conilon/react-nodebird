import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Signup = () => {
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.css" />
            </Head>
            <AppLayout>
                <div>
                    회원가입
                </div>
            </AppLayout>
        </>
    );
};

export default Signup;
