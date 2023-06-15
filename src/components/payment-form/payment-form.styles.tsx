import styled from 'styled-components';
import DisabledButton from '../button/button.component';

export const PaymentFormContainer = styled.div`
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const FormContainer = styled.form`
	height: 100px;
	min-width: 500px;

	@media screen and (max-width: 800px) {
		height: 200px;
		min-width: 300px;
	}
`;

export const PaymentButton = styled(DisabledButton)`
	margin-left: auto;
	margin-top: 30px;
`;
