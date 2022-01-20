import React, {useEffect, useState, Component} from 'react';
import {
  Dimensions,
  Modal,
  Switch,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  Alert,
  StatusBar,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import {setId, setFname, setLname, setAge, setPhoto} from '../Redux/actions';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export const Detail = ({navigation}) => {
  const {id, fname, lname, age, photo} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();

  const [fNameState, setFnameState] = useState('');
  const [lNameState, setLnameState] = useState('');
  const [ageState, setAgeState] = useState(0);

  const agestring = '' + age;
  

  const SaveData = () => {
    let inilink = 'https://simple-contact-crud.herokuapp.com/contact/' + id;

    axios({
      url: inilink,
      method: 'PUT',
    //   params: {
    //     id: id,
    //   },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'id': id,
      },
      data: JSON.stringify({
        "firstName": fname,
        "lastName": lname,
        "age": age,
        "photo": photo
      }),
    })
      .then(response => {
        // Alert('Success Saving Data')
        navigation.navigate('Contact');
        
      })
      .catch(error => {
        alert(error);
      });
  }

  const DeleteData = () => {
    let inilink = 'https://simple-contact-crud.herokuapp.com/contact/' + id;

    axios({
      url: inilink,
      method: 'DELETE',
    //   params: {
    //     id: id,
    //   },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'id': id,
      },
      data: JSON.stringify({
      }),
    })
      .then(response => {
        // Alert('Success Saving Data')
        navigation.navigate('Contact');
        
      })
      .catch(error => {
        alert(error);
      });
  }

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <Button onPress={() => SaveData()} title="SAVE" color="#4BB543" />
//       ),
//     });
//   }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.detailContainer}>
        <Image style={styles.imageContact} source={{uri: photo}}></Image>

        <Text style={styles.contactName}>
          {fname} {lname}
        </Text>
        <Text style={{color: 'grey'}}>{id}</Text>
        <View style={styles.detailEdit}>
          <Text>First Name: </Text>
          <TextInput
            style={styles.input}
            value={fname}
            // onChangeText={value => dispatch(setFname(value))}
            onChangeText={value => dispatch(setFname(value))}></TextInput>
        </View>
   
        <View style={styles.detailEdit}>
          <Text>Last Name: </Text>
          <TextInput
            style={styles.input}
            value={lname}
            onChangeText={value => dispatch(setLname(value))}></TextInput>
        </View>
        <View style={styles.detailEdit}>
          <Text>Age: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={agestring}
            onChangeText={value => dispatch(setAge(Number(value)))}></TextInput>
        </View>
        
        
      </View>
      <View style={{paddingLeft:10, paddingRight:10,}}>
        <Button  onPress={() => SaveData()} title="SAVE" color="#4BB543" />
       
     </View>
     <View style={{paddingLeft:10, paddingRight:10, marginTop:10, marginBottom:50}}>
     <Button style={{marginTop:10,}}  onPress={() => DeleteData()} title="DELETE" color="#cf142b" />
     </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 30,
    flex:1
  },
  imageContact: {
    height: 150,
    width: 150,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  contactName: {
    marginTop: 15,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 27,
  },
  input: {
    height: 40,
    width: ScreenWidth * 0.6,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'flex-end',
  },
  detailEdit: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth * 0.9,
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
