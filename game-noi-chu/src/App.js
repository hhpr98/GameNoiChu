import { Layout } from './Components/layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StartPage } from './Components/StartPage/startPage';
import { NotFoundPage } from './Components/NotFound/notFound';

function App() {

  const noMatchAction = () => {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      <Router>
        <Layout></Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/hello" element={<StartPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to ="/not-found" />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
