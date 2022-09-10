import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefautLayout } from '@/layouts';
import { Fragment, useEffect, useState } from 'react';
import { ProfileContext } from './Context/ProfileContext';
import * as suggestService from '@/services/suggestService';

const per_page = 12;
function App() {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await suggestService.suggest(per_page);

            setProfile(localStorage.setItem('API', JSON.stringify(result)));
        };
        fetchApi();
    }, []);

    return (
        <ProfileContext.Provider value={{ profile }}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, i) => {
                            let Layout = DefautLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={i}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page></Page>
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </ProfileContext.Provider>
    );
}

export default App;
