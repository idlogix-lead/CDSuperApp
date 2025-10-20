import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Image,
} from 'react-native';
import React, { useState } from 'react';

const Showimage = ({ uri }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const isSupport = true;
    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                    source={{
                        uri: uri
                    }}
                    style={isSupport ? styles.superimage : styles.nonsuperimage} // Add a specific size for the image
                />
            </TouchableOpacity >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TouchableOpacity
                    style={styles.centeredView}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)} // This will close the modal when you press outside of the modal content
                >
                    <View style={styles.modalView}>
                        <Image
                            source={{ uri: uri }}
                            style={{ width: '100%', height: 300 }}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View >
    );
};

export default Showimage;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor:'black',
        // opacity:0.5
        // alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        margin: 20,
        // backgroundColor: '#e0e0e0',
        // borderRadius: 20,
        // padding: 35,
        // alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        // elevation: 2,
        marginTop: 0,
        backgroundColor: '#004393',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    superimage: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    nonsuperimage: {
        marginLeft: 'auto',
        width: 100,
        height: 100,
    },
});
