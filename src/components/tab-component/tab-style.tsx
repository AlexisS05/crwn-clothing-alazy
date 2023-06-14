import styled from 'styled-components';

export const TabContainer = styled.div`
	display: none;

	@media screen and (max-width: 800px) {
		display: block;
	}
`;

export const TabButton = styled.button<{ isActive: boolean }>`
	@media screen and (max-width: 800px) {
		padding: 8px 16px;
		background-color: ${(props) => (props.isActive ? '#f0f0f0' : '#ffffff')};
		border: none;
		border-bottom: ${(props) => (props.isActive ? '2px solid #333' : 'none')};
		cursor: pointer;
	}
`;
