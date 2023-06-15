import { FC, ButtonHTMLAttributes } from 'react';

import {
	BaseButton,
	GoogleSignInButton,
	InvertedButton,
	ButtonSpinner,
	DisabledButton,
} from './button.styles';

export enum BUTTON_TYPE_CLASSES {
	base = 'base',
	google = 'google-sign-in',
	inverted = 'inverted',
	disabled = 'disabled',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
		[BUTTON_TYPE_CLASSES.disabled]: DisabledButton,
	}[buttonType]);

export type ButtonProps = {
	children?: React.ReactNode;
	buttonType?: BUTTON_TYPE_CLASSES;
	isLoading?: boolean;
	isFormComplete?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
	children,
	buttonType,
	isLoading,
	isFormComplete,
	...otherProps
}) => {
	const CustomButton = getButton(buttonType);

	if (buttonType === BUTTON_TYPE_CLASSES.disabled && !isFormComplete) {
		return (
			<CustomButton disabled={!isFormComplete} {...otherProps}>
				{isLoading ? <ButtonSpinner /> : children}
			</CustomButton>
		);
	}

	return (
		<CustomButton disabled={isLoading} {...otherProps}>
			{isLoading ? <ButtonSpinner /> : children}
		</CustomButton>
	);
};
export default Button;
