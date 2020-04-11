import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const NoteMenu = memo(({ data }) => (
    <div className="menu">
        <div className="menu-header">
            <label htmlFor="bars" className="bars-button">
                <span />
                <span />
                <span />
            </label>
        </div>
        <div className="category">
            <div className="category-title">분류</div>
            <div className="category-content">
                {data && data.map((v) => (
                    <Link key={v.id} href={{ pathname: '/note/category', query: { category: v.name, page: 1 } }} as={`/note/category/${v.name}/1`}>
                        <a>{v.name} ({v.count})</a>
                    </Link>
                ))}
            </div>
        </div>
    </div>
));

NoteMenu.propTypes = {
    data: PropTypes.array.isRequired,
};

export default NoteMenu;
