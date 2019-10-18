import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
    const [editedName, setEditedName] = useState('');
    const { me, isEditingNickname } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setEditedName(me && me.nickname);
    }, [me && me.nickname]);

    const onChangeNickname = useCallback((e) => {
        setEditedName(e.target.value);
    }, [editedName]);

    const onEditNickname = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName,
        });
    }, [editedName]);

    return (
        <Form onSubmit={onEditNickname} style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
            <Input addonBefore="닉네임" value={editedName} onChange={onChangeNickname} style={{ width: '80%' }} />
            <Button type="primary" htmlType="submit" loading={isEditingNickname} style={{ width: '18%', marginLeft: '2%' }}>수정</Button>
        </Form>
    );
};

export default NicknameEditForm;
