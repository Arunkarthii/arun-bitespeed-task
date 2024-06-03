import LayoutIndex from './components/Layout/Layout';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <ReactFlowProvider>
      <LayoutIndex />
    </ReactFlowProvider>
  );
}

export default App;
