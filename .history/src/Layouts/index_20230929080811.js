import Header from './header';
import Footer from './footer';
function Layouts({ children }) {
    return (
        <>
            {/* <Navigation /> */}
            <Header />
            <div>
                <div className="content">{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default Layouts;