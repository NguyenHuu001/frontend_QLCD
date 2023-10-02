import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import Layouts from './Layouts';
function App() {
    return ( <Router>
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layouts>
                                    <Page />
                                </Layouts>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    </Router>)
}

export default App;