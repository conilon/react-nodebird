import React, { useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';

const Signup = () => {
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);

    const onSubmit = () => {

    };

    const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePassCheck = (e) => {
        setPasswordCheck(e.target.value);
    };

    const onChangeTerm = (e) => {
        setPasswordCheck(e.target.value);
    };

    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.css" />
            </Head>
            <AppLayout>
                <div>
                    <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                        <div>
                            <label htmlFor="user-id">아이디</label>
                            <br />
                            <Input name="user-id" value={id} required onChange={onChangeId} />
                        </div>
                        <div>
                            <label htmlFor="user-nickname">닉네임</label>
                            <br />
                            <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                        </div>
                        <div>
                            <label htmlFor="user-password">비밀번호</label>
                            <br />
                            <Input name="user-password" value={password} type="password" required onChange={onChangePassword} />
                        </div>
                        <div>
                            <label htmlFor="user-password-check">비밀번호체크</label>
                            <br />
                            <Input name="user-password-check" value={passwordCheck} type="password" required onChange={onChangePassCheck} />
                        </div>
                        <div>
                            <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                        </div>
                        <div>
                            <Button type="primary">가입하기</Button>
                        </div>
                    </Form>
                </div>
            </AppLayout>
        </>
    );
};

export default Signup;
