import { useNavigate } from 'react-router-dom';

import {
	BackgroundImage,
	Body,
	DirectoryItemContainer,
} from './directory-item.styles';
import { ChangeEvent } from 'react';

// type Category = {
// 	category: ;
// 	imageUrl: (event: ChangeEvent<HTMLDivElement>) => void;
// };

const DirectoryItem = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(route);

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};
export default DirectoryItem;
