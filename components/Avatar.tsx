import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export type AvatarProps = {
    uri: String,
    size: number
}

const Avatar = (props: AvatarProps) => {

    const { uri, size } = props;

    const imageSize = size > 10 ? size : 40;

    return (
        <Image source={{ uri: uri }} style={{ width: imageSize, height: imageSize, borderRadius: 50, }} />
    )
}

export default Avatar

const styles = StyleSheet.create({
    image: {}
});
