import { useNavigate } from 'react-router-dom';

import {
	BackgroundImage,
	Body,
	DirectoryItemContainer,
} from './directory-item.styles';
import { FC, useCallback } from 'react';

type DirectoryProps = {
	route: string;
	title: string;
	imageUrl: string;
};

type DirectoryItemsProps = {
	category: DirectoryProps;
};

const DirectoryItem: FC<DirectoryItemsProps> = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = useCallback(() => navigate(route), []);

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
