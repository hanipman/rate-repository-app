import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const style = StyleSheet.create({
	container: {
		flexGrow: 1,
		marginTop: 10,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
	}
});

const AppBarTab = ({ text, route }) => {
	return (
		<Pressable style={style.container} >
			<Link to={route}>
				<Text>{text}</Text>
			</Link>
		</Pressable>
	);
};

export default AppBarTab;