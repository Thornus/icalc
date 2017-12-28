import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ButtonsRow extends React.Component {

  render() {
    if(this.props.buttonText3) {
      return (
          <View style={styles.rowView}>
            <TouchableOpacity onPress={() => this.props.onPressButton0(this.props.buttonText0)} style={styles.touOpa}>
              <Text style={styles.touOpaText}>{this.props.buttonText0}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onPressButton1(this.props.buttonText1)} style={styles.touOpa}>
              <Text style={styles.touOpaText}>{this.props.buttonText1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onPressButton2(this.props.buttonText2)} style={styles.touOpa}>
              <Text style={styles.touOpaText}>{this.props.buttonText2}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onPressButton3(this.props.buttonText3)} style={[styles.touOpa, styles.orangeBGcolor]}>
              <Text style={[styles.touOpaText, , styles.whiteColor]}>{this.props.buttonText3}</Text>
            </TouchableOpacity>
          </View>
      );
    }

    return (
      <View style={styles.rowView}>
        <TouchableOpacity onPress={() => this.props.onPressButton0(this.props.buttonText0)} style={[styles.touOpa, styles.touOpaDouble]}>
          <Text style={styles.touOpaText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onPressButton0(this.props.buttonText1)} style={styles.touOpa}>
          <Text style={styles.touOpaText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.executeOperation()} style={[styles.touOpa, styles.orangeBGcolor]}>
          <Text style={[styles.touOpaText, styles.whiteColor]}>=</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  rowView: {
    flex: 1,
    flexDirection: 'row',
  },
  touOpa:{
    flex: 1,
    backgroundColor: '#D5D6D8',
    borderWidth: 0.25,
    justifyContent: 'center'
  },
  touOpaDouble: {
    flex: 2
  },
  touOpaText: {
    textAlign: 'center',
    color: '#000002',
    fontSize: 32,
    fontFamily: 'sf'
  },
  orangeBGcolor: {
    backgroundColor: '#F98D11'
  },
  whiteColor: {
    color: '#fff'
  }
});
