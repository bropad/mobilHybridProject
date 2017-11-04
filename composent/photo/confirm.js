import React from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, TextInput } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import FirebaseApp from '../../firebase/firebase';

export default class ValidPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            Substance: "",
            Quantité: "",
            Location: "",
            Poids: "",
        }
        this.tasksRef = FirebaseApp.database().ref();
    }


    uploadImage(uri, mime = 'image/jpeg', name) {
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        let imgUri = uri; let uploadBlob = null;
        const imageRef = FirebaseApp.storage().ref(name)

        fs.readFile(imgUri, 'base64')
            .then(data => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then(blob => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime, name: name });
            })
            .then(() => {
                uploadBlob.close()
                //console.warn(imageRef.getDownloadURL())
                const newPostKey = this.tasksRef.child('drogue').push().key;

                // Write the new post's data simultaneously in the posts list and the user's post list.
                let updates = {};
                updates['/drogue/' + newPostKey] = this.state;

                this.tasksRef.update(updates);
                return imageRef.getDownloadURL();
            })
            .then(url => {
                this.props.navigation.navigate('Photo');
                //resolve(url);
            })
            .catch(error => {
                reject(error)
            })
    }

    confirm(image) {
        if (this.state.nom == "" || this.state.Substance == "" ||
            this.state.Quantité == "" || this.state.Location == "" ||
            this.state.Poids == ""
        )
            return;
        this.uploadImage(image, 'image/jpeg', this.state.nom)
    }

    render() {
        const { state } = this.props.navigation;
        const path = state.params.image.path.toString();
        return (
            <View>
                <Image
                    style={styles.stretch}
                    source={{ uri: state.params.image.path }}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Nom"
                    onChangeText={(text) => this.setState({ nom: text })}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Substance"
                    onChangeText={(text) => this.setState({ Substance: text })}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Quantité"
                    onChangeText={(text) => this.setState({ Quantité: text })}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Location"
                    onChangeText={(text) => this.setState({ Location: text })}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Poids/Dimension"
                    onChangeText={(text) => this.setState({ Poids: text })}
                />
                <Button
                    onPress={() => this.confirm(state.params.image.path)}
                    title="Confirmation"
                />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    stretch: {
        width: Dimensions.get('window').width,
        height: 200
    }
});