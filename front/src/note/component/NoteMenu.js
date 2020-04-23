import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const NoteMenu = ({ categories, tags }) => (
  <div className="menu">
    <div className="menu-header">
      <label htmlFor="bars" className="bars-button">
        <span />
        <span />
        <span />
      </label>
    </div>
    <div className="category">
      <div className="title">카테고리</div>
      <div className="content">
        {categories && categories.map((v) => (
          <Link key={v.id} href={{ pathname: '/note/category', query: { category: v.name } }} as={`/note/category/${v.name}/1`}>
            <a>{v.name} ({v.count})</a>
          </Link>
        ))}
      </div>
    </div>
    <div className="tag">
    <div className="title">태그</div>
      <div className="content">
        {tags && tags.map((v) => (
          <Link key={v.id} href={{ pathname: '/note/tag', query: { tag: v.name } }} as={`/note/tag/${v.name}/1`}>
            <a>{v.name} ({v.count})</a>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

NoteMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

export default memo(NoteMenu);
