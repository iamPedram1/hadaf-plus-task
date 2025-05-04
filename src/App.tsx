// Components
import HomePage from 'core/components/page';

// Providers
import Providers from 'core/components/common/Providers';

// Styles
import 'antd/dist/reset.css';

const App = () => (
  <Providers>
    <HomePage />
  </Providers>
);

export default App;
