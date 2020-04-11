import React, { memo } from 'react';
import Link from 'next/link';

const NoteLogo = memo(() => (
    <div className="logo">
        <div className="logo-title">
            <Link href={{ pathname: '/note' }} as="/note">
                <a>th</a>
            </Link>
        </div>
    </div>
));

export default NoteLogo;
