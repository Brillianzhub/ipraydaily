import React, { createContext, useState, useContext } from 'react';

const MetaContext = createContext();

const MetaProvider = ({ children }) => {
    const [metaData, setMetaData] = useState({
        title: '',
        description: '',
        image: '',
        url: ''
    });

    return (
        <MetaContext.Provider value={{ metaData, setMetaData }}>
            {children}
        </MetaContext.Provider>
    );
};

const useMeta = () => useContext(MetaContext);

export { MetaProvider, useMeta };
