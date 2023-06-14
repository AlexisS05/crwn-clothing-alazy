import { TabButton, TabContainer } from './tab-style';

const Tabs: React.FC<{
	activeTab: 'signIn' | 'signUp';
	onTabChange: (tab: 'signIn' | 'signUp') => void;
}> = ({ activeTab, onTabChange }) => {
	return (
		<TabContainer>
			<TabButton
				isActive={activeTab === 'signIn'}
				onClick={() => onTabChange('signIn')}
			>
				Sign In
			</TabButton>
			<TabButton
				isActive={activeTab === 'signUp'}
				onClick={() => onTabChange('signUp')}
			>
				Sign Up
			</TabButton>
		</TabContainer>
	);
};

export default Tabs;
