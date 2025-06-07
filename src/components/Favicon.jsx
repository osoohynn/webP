const Favicon = ({ domain }) => {
    const src = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    return <img src={src} style={{ width: 16, height: 16, borderRadius: 32 }} />;
};

export default Favicon;