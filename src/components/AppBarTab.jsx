import React from 'react';
import { Pressable } from 'react-native';

import Text from './Text';

const AppBarTab = ({ text }) => {
	return (
		<Pressable>
			<Text>{text}</Text>
		</Pressable>
	);
};

export default AppBarTab;