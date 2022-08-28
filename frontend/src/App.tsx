import './App.css';
import 'antd/dist/antd.css';
import { Content } from 'antd/lib/layout/layout';
import Employee from './content/employee';


function App() {
  return (
    <div className="App">
      <Content style={{ padding: '0 50px' }}>
        <Employee></Employee>
      </Content>
    </div>
  );
}

export default App;
