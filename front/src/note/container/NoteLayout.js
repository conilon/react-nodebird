import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import NoteLogo from '../component/NoteLogo';
import NoteMenu from '../component/NoteMenu';

import { useWindowWidth, uesWindowScroll } from '../../common/hooks';

import '../../../css/note/noteLayout.css';

const NoteLayout = ({ title, children }) => {
    const { data: categories } = useSelector((state) => state.category.categories);
    const { data: tags } = useSelector((state) => state.category.tags);
    const [currentScroll, setCurrentScroll] = useState(0);
    
    const windowWidth = useWindowWidth();
    const windowScroll = uesWindowScroll();
    
    // const cachedScroll = [];
    // useEffect(() => {
    //     console.log('NoteLayout useEffect');
    //     console.log('NoteLayout useEffect cachedScroll', cachedScroll);

    //     const handleRouteChangeStart = () => {
    //         console.log('NoteLayout routeChangeStart');
    //         cachedScroll.push([window.scrollX, window.scrollY]);
    //         console.log('routeChangeStart cachedScroll: ', cachedScroll);
    //     };
        
    //     const handleRouteChangeComplete = () => {
    //         console.log('NoteLayout routeChangeComplete');
    //         console.log('routeChangeComplete cachedScroll: ', cachedScroll);
    //     };

    //     Router.beforePopState(() => {
    //         console.log('NoteLayout beforePopState');
    //         console.log('beforePopState cachedScroll: ', cachedScroll);
    //         const [x, y] = cachedScroll.pop();

    //         console.log('y: ', y);

    //         setTimeout(() => {
    //             window.scrollTo(x, y);
    //         }, 2000);
    //         return true;
    //     });

    //     Router.events.on('routeChangeStart', handleRouteChangeStart);
    //     Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    //     return () => {
    //         Router.events.off('routeChangeStart', handleRouteChangeStart);
    //         Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    //     };
    // }, []);

    useEffect(() => {
        const bars = document.querySelector('#bars');
        bars.checked = false;
    }, [children, windowWidth]);

    useEffect(() => {
        const bars = document.querySelector('#bars');
        const sticky = document.querySelector('.sticky');
        sticky.style.top = (bars.checked || windowScroll < 80 || windowScroll < currentScroll) ? '0px' : '-100px';
        setCurrentScroll(windowScroll);
    }, [windowScroll]);

    return (
        <div className="wrap">
            <input type="checkbox" id="bars" />
            <div className="sticky">
                <NoteLogo />
                <label htmlFor="bars" className="bars-button">
                    <span />
                    <span />
                    <span />
                </label>
                <label htmlFor="bars" className="bars-blackout">
                    <span />
                </label>
            </div>
            <NoteMenu categories={categories} tags={tags} />
            <div className="header">
                <div className="header-title">
                    {title}
                </div>
            </div>
            <div className="content">
                {children}
            </div>
            <div className="footer">
                <div className="footer-title">
                    <div>thmsy@gmail.com</div>
                </div>
            </div>
            <label htmlFor="bars" className="blackout">
                <span />
            </label>
        </div>
    );
};

NoteLayout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default NoteLayout;
