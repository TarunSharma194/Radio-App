import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EventRegister } from 'react-native-event-listeners';

import { Home, StationPlayer } from '../screens';
import ThemeContext from '../config/themeContext';
import theme from '../config/theme';

const defaultStackOptions = {
	headerShown: false
};

const Stack = createStackNavigator();

const RadioNavigator = () => {
	const [ mode, setMode ] = useState(false);

	useEffect(() => {
		let eventListener = EventRegister.addEventListener('changeTheme', (data) =>
			setMode(data)
		);
		return () => {
			EventRegister.removeEventListener(eventListener);
		};
	});
	return (
		<ThemeContext.Provider value={mode === true ? theme.dark : theme.light}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={defaultStackOptions}
					initialRouteName="Home"
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="StationPlay" component={StationPlayer} />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeContext.Provider>
	);
};

export default RadioNavigator;
