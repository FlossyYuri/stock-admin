import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import Menu from './layout/Menu';
import ABCMethod from './pages/ABCMethod';
import ClassificationTable from './pages/ClassificationTable';
import EconomicLot from './pages/EconomicLot';
function Routes() {
  return (
    <BrowserRouter>
      <div className='container max-w-5xl min-h-4/5  bg-white shadow-md rounded flex items-stretch'>
        <Menu />
        <main className='flex-1 overflow-auto'>
          <Switch>
            <Route path='/abc' element={<ABCMethod />} />
            <Route path='/economic' element={<EconomicLot />} />
            <Route path='/table' element={<ClassificationTable />} />
            <Route path='/' element={<Navigate to='/abc' />} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
