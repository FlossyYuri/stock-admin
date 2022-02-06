import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import Menu from './layout/Menu';
import ABCMethod from './pages/ABCMethod';
import EconomicLot from './pages/EconomicLot';
function Routes() {
  return (
    <BrowserRouter>
      <div className='w-1/2 h-96 bg-white shadow-md rounded flex items-stretch'>
        <Menu />
        <main className='flex-1'>
          <Switch>
            <Route path='/abc' element={<ABCMethod />} />
            <Route path='/economic' element={<EconomicLot />} />
            <Route path='/' element={<Navigate to='/abc' />} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
