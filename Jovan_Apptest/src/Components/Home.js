import React, {useEffect, useState, Component} from 'react';
import {
  Dimensions,
  Modal,
  Switch,
  View,
  Text,
  KeyboardAvoidingView,
  Pressable,
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

export const Home = ({navigation}) => {
  const {id, fname, lname, age, photo} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();

  const [listContact, setContact] = useState([]);
  const [modal, setModal] = useState(false);

  const [namawal, setFnama] = useState('First');
  const [namaakhir, setLnama] = useState('Last');
  const [umur, setUmur] = useState(1);
  const [foto, setFoto] = useState('http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550');

  useEffect(() => {
    let inilink = 'https://simple-contact-crud.herokuapp.com/contact';
    axios({
      url: inilink,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({}),
    })
      .then(response => {
        let res = response.data.data;
        setContact(res);
      })
      .catch(error => {
        alert(error);
      });
  });

  const GotoDetail = i => {
    dispatch(setId(listContact[i].id));
    dispatch(setFname(listContact[i].firstName));
    dispatch(setLname(listContact[i].lastName));
    dispatch(setAge(listContact[i].age));
    dispatch(setPhoto(listContact[i].photo));
    navigation.navigate('Contact Detail');
    console.log(i);
  };

  const SaveDataBaru = () => {
      console.log(namawal, namaakhir, umur, foto)
    let inilink = 'https://simple-contact-crud.herokuapp.com/contact';
    
    let namaawalbaru=namawal
    let namaakhirbaru=namaakhir
    let umurbaru=umur
    let fotobaru=foto

    axios({
      url: inilink,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        "firstName": namaawalbaru,
        "lastName": namaakhirbaru,
        "age": umurbaru,
        "photo": fotobaru
      }),
    })
      .then(response => {
        // Alert('Success Saving Data')
        setModal(false)
        navigation.navigate('Contact');
        
      })
      .catch(error => {
        alert(error);
        console.log(error.response)
      });
  }

  return (
    <View style={{}}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModal(!modal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <View style={styles.detailEdit}>
                  <Text>First Name: </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={value=>setFnama(value)}
                    // onChangeText={value =>
                    //   dispatch(setLname(value))
                    // }
                  ></TextInput>
                </View>
                <View style={styles.detailEdit}>
                  <Text>Last Name: </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={value=>setLnama(value)}
                    // onChangeText={value =>
                    //   dispatch(setLname(value))
                    // }
                  ></TextInput>
                </View>
                <View style={styles.detailEdit}>
                  <Text>Age: </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Age"
                    onChangeText={value=>setUmur(Number(value))}
                    // onChangeText={value =>
                    //   dispatch(setAge(Number(value)))
                    // }
                    ></TextInput>
                </View>
                <View style={styles.detailEdit}>
                  <Text>Photo url: </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="exp: https://www.google.co.id/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
                    onChangeText={value=>setFoto(value)}
                    
                    // onChangeText={value =>
                    //   dispatch(setLname(value))
                    // }
                  ></TextInput>
                </View>
              </View>
              {/* <Button  onPress={() => SaveDataBaru()} title="SAVE" color="#4BB543" /> */}
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={() => SaveDataBaru()}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModal(!modal)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.contactContainer}>
          {listContact ? (
            <View>
              {listContact.map((val, i) => {
                return (
                  <TouchableOpacity onPress={() => GotoDetail(i)}>
                    <View style={styles.contactBox} title="ke detail">
                      <Image
                        style={styles.imageContact}
                        source={{uri: val.photo}}></Image>
                      <View>
                        {/* <Text>{val.id}</Text> */}
                        <Text style={styles.contactName}>
                          {val.firstName} {val.lastName}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View>
              <Text>No Contact</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          bottom: 30,
          right: 10,
          backgroundColor: '#da020e',
          position: 'absolute',
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        }}
        onPress={() => setModal(true)}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    display: 'flex',
    alignItems: 'center',

    // height: ScreenHeight,
    paddingTop: 20,
    paddingBottom: 20,
  },
  imageContact: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: 'grey',
  },
  contactBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: 'white',
    width: ScreenWidth * 0.9,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 20,
    borderRadius: 7,
    paddingRight: 20,
    overflow: 'hidden',
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonSave: {
      width:ScreenWidth*0.6,
    backgroundColor: '#4BB543',
    marginBottom:10,
    marginTop:15
  },
  buttonClose: {
    width:ScreenWidth*0.6,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: ScreenWidth * 0.5,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'flex-end',
  },
  detailEdit: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth * 0.8,
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
