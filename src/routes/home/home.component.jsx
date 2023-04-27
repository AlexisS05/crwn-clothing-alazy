import { Outlet } from 'react-router-dom';

import Categories from '../../components/directory/directory';

const Home = () => {
	return (
		<div>
			<Outlet />
			<Categories />
		</div>
	);
};

export default Home;
