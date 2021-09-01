import React, { useEffect, useState, useContext } from 'react';
import {
	FlatList,
	SafeAreaView,
	Image,
	Switch,
} from "react-native";
import { RadioBrowserApi } from 'radio-browser-api';
import { EventRegister } from 'react-native-event-listeners';

import { categoryData } from '../../model/dummyData';
import { images } from '../../../constants';
import ThemeContext from '../../config/themeContext';
import {
	CategoryContainer,
	CategoryText,
	EmptyView, Flex1,
	HeaderContainer,
	HeaderPrimaryText,
	HeaderSecondaryText,
	HomeThemeContainer,
	HomeThemeInnerContainer,
	ImageContainer,
	InfoContainer,
	InfoState,
	InfoTitle,
	PaddingHorizontal,
	StationListContainer,
	styles,
	ThemeText,
} from "./styles";

const Home = ({ navigation }) => {
	const [ data, setData ] = useState([]);
	const [ selectedCategory, setSelectedCategory ] = useState(categoryData[0]);
	const [ stations, setStations ] = useState([]);
	const [ mode, setMode ] = useState(false);

	const theme = useContext(ThemeContext);
	let flatListRef

	const api = new RadioBrowserApi('Demo Radio App');

	const radioStations = async () => {
		await api
			.searchStations({
				countryCode: 'US',
				limit: 2000
			})
			.then((res) => {
				let requiredData = res.filter((item) => item.urlResolved.includes('mp3'));
				let allStationData = requiredData.map((item) => {
					return {
						name: item.name,
						state: item.state,
						id: item.id,
						url: item.url,
						urlResolved: item.urlResolved,
						favicon: item.favicon,
						tags: item.tags
					};
				});
				setData(allStationData);
				setStations(allStationData);
			});
	};

	useEffect(() => {
		radioStations();
	}, []);

	useEffect(() => {
		flatListRef?.scrollToOffset({ animated: true, offset: 0 });
	}, [selectedCategory])

	const renderHeader = () => {
		return (
			<EmptyView>
				<HomeThemeContainer>
					<HomeThemeInnerContainer>
						<ThemeText>Dark Theme</ThemeText>
						<Switch
							value={mode}
							onValueChange={(newVal) => {
								setMode(newVal);
								EventRegister.emit('changeTheme', newVal);
							}}
						/>
					</HomeThemeInnerContainer>
				</HomeThemeContainer>
				<HeaderContainer>
					<HeaderPrimaryText color={theme.color}>
						Stanza Radio Player
					</HeaderPrimaryText>
					<HeaderSecondaryText color={theme.color}>
						Hey! What's Your Mood Today ?
					</HeaderSecondaryText>
				</HeaderContainer>
			</EmptyView>
		);
	};

	const onSelectCategory = (category) => {
		let stationList = data.filter((station) => station.tags.includes(category.name));
		category.name === 'all' ? setStations(data) : setStations(stationList);
		setSelectedCategory(category);
	};

	const renderCategories = () => {
		const renderFilters = ({ item }) => {
			return (
				<CategoryContainer
					color={(selectedCategory || {}).id === item.id ? 'orange' : 'white'}
					activeOpacity={0.7}
					onPress={() => onSelectCategory(item)}>
					<CategoryText
							color={(selectedCategory || {}).id === item.id ? 'white' : 'black'}>
						{item.name.toUpperCase()}
					</CategoryText>
				</CategoryContainer>
			);
		};

		return (
			<PaddingHorizontal val={20}>
				<FlatList
					data={categoryData}
					keyExtractor={(item, index) => item.id}
					renderItem={renderFilters}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingVertical: 10 }}
				/>
			</PaddingHorizontal>
		);
	};

	const renderStationList = () => {
		const renderStations = ({ item }) => {
			const imageUrl = item.favicon ? { uri: item.favicon } : images.logo;

			return (
				<StationListContainer
					activeOpacity={0.7}
					onPress={() => navigation.navigate('StationPlay', { item })}>
					<ImageContainer>
						<Image source={imageUrl} resizeMode="cover" style={styles.logo} />
					</ImageContainer>
					<InfoContainer>
						<InfoTitle>{item.name}</InfoTitle>
						<InfoState>{item.state || 'California'}</InfoState>
					</InfoContainer>
				</StationListContainer>
			);
		};

		return (
			<Flex1>
				<FlatList
					ref={_ => (flatListRef = _)}
					data={stations}
					keyExtractor={(item, index) => item.id}
					renderItem={renderStations}
					numColumns={2}
					columnWrapperStyle={{ justifyContent: 'space-between' }}
					showsVerticalScrollIndicator={true}
					contentContainerStyle={{ padding:10 }}
				/>
			</Flex1>
		);
	};

	return (
		<SafeAreaView style={{ ...styles.container, backgroundColor: theme.background }}>
			{renderHeader()}
			{renderCategories()}
			{renderStationList()}
		</SafeAreaView>
	);
};

export default Home;
