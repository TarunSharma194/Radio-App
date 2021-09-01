import React, { useState, useContext, useEffect } from "react";
import {
	SafeAreaView,
	Image,
	TouchableOpacity
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import VolumeControl, { VolumeControlEvents } from "react-native-volume-control";
import Slider from '@react-native-community/slider';

import ThemeContext from '../../config/themeContext';

import { images } from '../../../constants';
import {
	ControlContainer,
	Flex1,
	ImageContainer,
	InfoContainer,
	InfoState,
	InfoTitle,
	StationContainer,
	styles,
	VolumeSliderContainer,
} from "./styles";

const audioRecorderPlayer = new AudioRecorderPlayer();

const StationPlayer = ({ route }) => {
	const stationData = route.params.item;
	const imageUrl = stationData.favicon ? { uri: stationData.favicon } : images.logo;

	const theme = useContext(ThemeContext);

	const [ isAlreadyPlay, setIsAlreadyPlay ] = useState(false);
	const [ volume, setVolume ] = useState(5)

	useEffect(() => {
		getCurrentVolume()
		let volEvent = VolumeControlEvents.addListener("VolumeChanged", volumeEvent)

		return () => volEvent.remove()
	}, [])

	useEffect(() => {
		return async () => await audioRecorderPlayer.stopPlayer()
	}, [])

	const getCurrentVolume = async() => {
		const currentVolume = await VolumeControl.getVolume()
		setVolume(currentVolume)
	}

	const volumeEvent = event => {
		setVolume(event.volume)
	};

	const onStartPress = async () => {
		setIsAlreadyPlay(true);
		await audioRecorderPlayer.startPlayer(stationData.urlResolved);
	};

	const onPausePress = async () => {
		setIsAlreadyPlay(false);
		await audioRecorderPlayer.pausePlayer();
	};

	const onSliderChange = (value) => {
		VolumeControl.change(value);
	}

	const renderVolumeSlider = () => {
		const icon = volume === 0 ? 'ios-volume-off' : volume === 1 ? 'volume-high' : 'ios-volume-low'
		return <VolumeSliderContainer>
			<Ionicons name={icon} size={24} color={'#00688B'}/>
			<Slider
				value={volume}
				style={{flex: 1, height: 40}}
				onValueChange={onSliderChange}
				minimumTrackTintColor="#00688b"
				maximumTrackTintColor="#92b1c4"
				thumbTintColor="#00688B"
			/>
		</VolumeSliderContainer>
	}

	return (
		<SafeAreaView style={{...styles.container, backgroundColor: theme.background}}>
			<Flex1>
				<StationContainer>
					<ImageContainer>
						<Image
							source={imageUrl}
							resizeMode="contain"
							style={styles.logo}
						/>
					</ImageContainer>
					<InfoContainer>
						<InfoTitle color={theme.color}>{stationData.name}</InfoTitle>
						<InfoState color={theme.color}>{stationData.state || 'California'}</InfoState>
					</InfoContainer>
				</StationContainer>
			</Flex1>

			<ControlContainer>
				{isAlreadyPlay ? (
					<TouchableOpacity onPress={() => onPausePress()}>
						<Ionicons name="ios-pause-circle" size={100} color="#00688B" />
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => onStartPress()}>
						<Ionicons name="ios-play-circle" size={100} color="#00688B" />
					</TouchableOpacity>
				)}
			</ControlContainer>

			{renderVolumeSlider()}

		</SafeAreaView>
	);

};

export default StationPlayer;
