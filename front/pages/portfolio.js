import React from 'react';
import AppLayout from '../components/AppLayout';

const Portfolio = () => {
    const text = '포트폴리오 페이지';
    return (
        <AppLayout>
            <div>
                {text}
            </div>
        </AppLayout>
    );
};

Portfolio.getInitialProps = async () => {
    
};

Portfolio.propTypes = {
    
};

export default Portfolio;
