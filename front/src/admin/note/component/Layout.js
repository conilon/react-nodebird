// NoteList
export const NoteListColumns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
        ellipsis: true,
    },
    {
        title: 'content',
        dataIndex: 'content',
        key: 'content',
        width: '50%',
        ellipsis: true,
    },
    {
        title: 'visible',
        dataIndex: 'visible',
        key: 'visible',
        width: '80px',
        align: 'center',
    },
    {
        title: 'edit',
        dataIndex: 'edit',
        key: 'edit',
        width: '80px',
        align: 'center',
    },
];

// NoteCategoryList
export const NoteCategoryListColumns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
        ellipsis: true,
    },
    {
        title: 'content',
        dataIndex: 'content',
        key: 'content',
        width: '50%',
        ellipsis: true,
    },
    {
        title: 'visible',
        dataIndex: 'visible',
        key: 'visible',
        width: '80px',
        align: 'center',
    },
    {
        title: 'edit',
        dataIndex: 'edit',
        key: 'edit',
        width: '80px',
        align: 'center',
    },
];

// NoteWriteFormLayout
export const NoteWriteFormLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 7 },
        md: { span: 5 },
        lg: { span: 5 }, 
        xl: { span: 5 }, 
        xxl: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 16 },
        lg: { span: 16 },
        xl: { span: 16 },
        xxl: { span: 16 },
    },
};

export const TailNoteWriteFormLayout = {
    wrapperCol: {
        xs: { span: 5, offset: 12 },
        sm: { span: 5, offset: 7 },
        md: { span: 5, offset: 5 },
        lg: { span: 5, offset: 5 },
        xl: { span: 5, offset: 5 },
        xxl: { span: 5, offset: 5 },
    },
};
