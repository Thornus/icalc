import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

export default class ResultsView extends React.Component {

  render() {
    return (
      <View style={styles.resultsView}>
        <View style={styles.pastResultsView}>
          <Text style={styles.pastResultText}>{this.props.pastResultText}</Text>
        </View>

        <TouchableWithoutFeedback onPress={() => this.props.backspace()}>
          <View>
              <Text style={[styles.resultText, {fontSize: this.props.resultTextFontSize} ]}>{this.props.resultText}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      );
  }

}

const styles = StyleSheet.create({
  resultsView: {
    flex: 3,
    justifyContent: 'flex-end'
  },
  pastResultsView: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20
  },
  resultText: {
    color: '#fff',
    textAlign: 'right',
    fontFamily: 'sf'
  },
  pastResultText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 32,
    fontFamily: 'sf'
  }
});