import React from 'react';
import { TouchableHighlight, Modal, View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import FirebaseApp from '../firebase/firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  stretch: {
    width: Dimensions.get('window').width,
    height: 200
  }
});


export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: { uri: "https://pre00.deviantart.net/af43/th/pre/f/2015/184/e/0/taylor_swift_png_by_maggiethecatwithablo-d8zsa4t.png" },
      modalVisible: false,
    }
    this.storageRef = FirebaseApp.storage().ref();
  }

  getImage() {
    this.storageRef.child(this.props.nom).getDownloadURL()
      .then(url => {
        this.setState({ img: { uri: url } });
        //console.warn(url);
      })
      .catch(error => { })
  }
  componentDidMount() {
    this.getImage();
  }

  setModalVisible(visible) {
    this.getImage();
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Image
                style={styles.stretch}
                source={this.state.img} />
              <Text style={styles.text}>
                Nom : {this.props.nom}
              </Text>
              <Text style={styles.text}>
                Substance : {this.props.Substance}
              </Text>
              <Text style={styles.text}>
                Location : {this.props.Location}
              </Text>
              <Text style={styles.text}>
                Poids : {this.props.Poids}
              </Text>
              <Text style={styles.text}>
                Quantité : {this.props.Quantité}
              </Text>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text>Quitter</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>
        <TouchableHighlight onPress={() => { this.setModalVisible(true) }}>
          <View style={styles.container}>
            <Image
              style={{ width: 50, height: 50 }}
              source={this.state.img} />
            <Text style={styles.text}>
              {`${this.props.nom} ${this.props.Substance}`}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

//export default Row;