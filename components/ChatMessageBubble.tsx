import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import { API, Auth, Storage, graphqlOperation } from 'aws-amplify';
import { getUser } from '../src/graphql/queries'

import { Message } from '../types';
import moment from 'moment';
import { S3Image } from 'aws-amplify-react-native';
import ImageModal from '../components/ImageModal'

export type MessageProps = {
    message: Message,
    shouldDisplayContacts: boolean,
    isIncomming: boolean,
    contactNameColor: String
}

const ChatMessageBubble = (props: MessageProps) => {

    const { message, shouldDisplayContacts, isIncomming, contactNameColor } = props;

    const [sender, setSender] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [imageModalVisible, setImageModalVisible] = useState(false);

    const fetchUserInfo = async () => {
        const userData = await API.graphql(graphqlOperation(getUser, { id: message.userID }))
        setSender(userData.data.getUser);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        return () => {
            // console.log("cleaned up");
        };
    }, []);

    if (!sender) {
        return null;
    }

    const getUri = async () => {
        const signedURL = await Storage.get(message.imageUri, {
        });
        if (signedURL) {
            setImageUri(signedURL);
        }
    }

    if (message.imageUri) {
        getUri();
    }

    const openImage = () => {
        setImageModalVisible(!imageModalVisible);
    }

    return (
        <View style={[styles.container, isIncomming ? { justifyContent: 'flex-end', alignSelf: 'flex-end' } : {}]}>
            <View style={[styles.messageBubble, isIncomming ? { backgroundColor: '#d8f7c7' } : { backgroundColor: 'white' }]}>
                {shouldDisplayContacts && <Text style={{ fontWeight: '700', color: contactNameColor }}>{sender.username}</Text>}
                {imageUri &&


                    <TouchableOpacity onPress={openImage}>
                        <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
                    </TouchableOpacity>

                }
                <Text>{message.message}</Text>
                <Text style={[styles.time, isIncomming ? { textAlign: 'right' } : { textAlign: 'left' }]}>{moment(message.createdAt).format('LT')}</Text>
            </View>
            {
                imageModalVisible &&
                <ImageModal
                    imageUri={imageUri}
                    modalVisible={imageModalVisible}
                    onChangeTerm={(newState) => { setImageModalVisible(newState); }}
                />
            }
        </View>
    )
}

export default ChatMessageBubble

const styles = StyleSheet.create({

    containerIncomming: {
        width: '85%',
        flexDirection: 'row',

    },
    messageBubble: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    container: {
        width: '85%',
        flexDirection: 'row',
    },
    time: {
        fontSize: 11,
        marginTop: 2,
        color: 'gray'
    },
})
