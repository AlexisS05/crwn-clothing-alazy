import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthenticationContainer } from './authentication.styles';
import { useState } from 'react';
import Tabs from '../../components/tab-component/tab-component';

const Authentication: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'signIn' | 'signUp'>('signIn');

	const handleTabChange = (tab: 'signIn' | 'signUp') => {
		setActiveTab(tab);
	};

	return (
		<AuthenticationContainer>
			<Tabs activeTab={activeTab} onTabChange={handleTabChange} />
			<SignInForm isActive={activeTab === 'signIn'} />
			<SignUpForm isActive={activeTab === 'signUp'} />
		</AuthenticationContainer>
	);
};

export default Authentication;
