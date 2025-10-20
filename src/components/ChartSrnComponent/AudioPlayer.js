import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SoundPlayer from 'react-native-sound-player';

const AudioPlayer = ({ uri, VoiceModelClose }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    let _onFinishedPlayingSubscription = null;

    const formatTime = seconds => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        const timerId = setInterval(async () => {
            if (isPlaying) {
                try {
                    const info = await SoundPlayer.getInfo();
                    setCurrentTime(info.currentTime);
                } catch (error) {
                    console.log('Error fetching playback info:', error);
                }
            }
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [isPlaying]);

    const togglePlayPause = async () => {
        setIsLoading(true);
        await SoundPlayer.loadUrl(uri);
        const info = await SoundPlayer.getInfo();
        setDuration(info.duration);

        try {
            if (isPlaying) {
                await SoundPlayer.pause();
                setIsPlaying(false);
                setIsPaused(true);
            } else {
                if (isPaused) {
                    await SoundPlayer.resume();
                } else {
                    if (duration > 0) {
                        await SoundPlayer.play();
                    } else {
                        await SoundPlayer.playUrl(uri);
                    }
                }
                setIsPlaying(true);
                setIsPaused(false);
            }
        } catch (error) {
            console.log('Error toggling play/pause:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
            'FinishedPlaying',
            ({ success }) => {
                // console.log('finished playing', success);
                setIsPlaying(false);
                setCurrentTime(0);
                // VoiceModelClose(false);
            },
        );

        return () => {
            _onFinishedPlayingSubscription.remove();
        };
    }, []);

    return (
        <View>
            <View style={styles.VoiceContainer}>
                <TouchableOpacity onPress={togglePlayPause}>
                    <Text style={styles.playPauseButton}>
                        {isPlaying ? (
                            <MaterialIcons name="pause" size={30} color={'#fff'} />
                        ) : (
                            <MaterialIcons name="play-arrow" size={30} color={'#fff'} />
                        )}
                    </Text>
                </TouchableOpacity>
                <View>
                    <Progress.Bar
                        progress={currentTime && duration ? currentTime / duration : 0}
                        width={300}
                    />
                    <View style={styles.ProgressTxtView}>
                        <Text style={styles.TxtDuration}>
                            {currentTime ? formatTime(currentTime) : '0.00'}
                        </Text>
                        <Text style={styles.TxtDuration}>
                            {duration ? formatTime(duration) : '0.00'}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AudioPlayer;

const styles = StyleSheet.create({
    VoiceContainer: {
        backgroundColor: '#004b93',
        // backgroundColor: 'orange',
        height: 50,
        width: '100%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playPauseButton: {
        marginTop: -10,
    },
    ProgressTxtView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    TxtDuration: {
        color: '#fff',
        fontSize: 12,
    },
});
