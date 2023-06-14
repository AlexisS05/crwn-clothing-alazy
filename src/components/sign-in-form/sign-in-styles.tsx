import styled from 'styled-components';

export const SignInContainer = styled.div<{ isActive: boolean }>`
	display: flex;
	flex-direction: column;
	width: 380px;

	h2 {
		margin-top: 10px 0;
	}

	@media screen and (max-width: 800px) {
		width: 300px;
		display: ${(props) => (props.isActive ? 'block' : 'none')};
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
