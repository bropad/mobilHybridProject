import React from 'react';
import { View, Text, Button, ListView } from 'react-native';

import Row from './Row'
import FirebaseApp from '../firebase/firebase'

export default class HomeList extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            user: null,
            loading: true,
            newTask: "",
            dataSource: ds.cloneWithRows([]),
        };

        this.tasksRef = FirebaseApp.database().ref();

    }
    static navigationOptions = {
        title: 'Home List',
    };


    listenForTasks(tasksRef) {
        tasksRef.child('drogue').on('value', (dataSnapshot) => {
            let tasks = [];
            let url = "";
            
            dataSnapshot.forEach((child) => {
                //console.warn(child.val());
               tasks.push(child.val());
            });

            //this.storageRef.child('jobs').getDownloadURL().then(url => console.warn(url)) 
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({
                dataSource: ds.cloneWithRows(tasks)
            });
        });
    }
/*
    test() {
        // Get a key for a new Post.
        const newPostKey = this.tasksRef.child('drogue').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates['/drogue/' + newPostKey] = { prénom: "toto", nom: "roberto" };

        this.tasksRef.update(updates);
    }*/

    gettest() {
        this.listenForTasks(this.tasksRef);

    }

    componentDidMount() {
        console.ignoredYellowBox = ['Setting a timer'];
        this.listenForTasks(this.tasksRef);
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <Row {...data} />}
                    enableEmptySections={true}
                />
            </View>
        )

    }
}
