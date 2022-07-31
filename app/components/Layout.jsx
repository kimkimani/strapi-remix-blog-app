import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <Navbar />
            <div className="container">
                {children}
            </div>
        </div>
    );
}