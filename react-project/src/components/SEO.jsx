import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title} | InnerRoot</title>
            <meta name="description" content={description || "Discover India's heritage and inner wellness."} />
            <meta name="keywords" content={keywords || "Indian culture, heritage, wellness, tours, spirituality"} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export default SEO;
