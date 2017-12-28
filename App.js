import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Font, AppLoading } from 'expo';
import math from 'mathjs';
import numeral from 'numeral';
import ButtonsRow from './components/buttonsRow';
import ResultsView from './components/resultsView';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      pastResult: '',
      resultText: '0',
      resultTextFontSize: 72,
      pastResultText: '',
      expression: '',
      minus: '-'
    }

    this.loadFonts = this.loadFonts.bind(this);
    this.clear = this.clear.bind(this);
    this.backspace = this.backspace.bind(this);
    this.plusMinusChange = this.plusMinusChange.bind(this);
    this.writeResult = this.writeResult.bind(this);
    this.createExpression = this.createExpression.bind(this);
    this.executeOperation = this.executeOperation.bind(this);
    this.resizeResultText = this.resizeResultText.bind(this);

    numeral.defaultFormat('0,0');
  }

  async loadFonts() {
    await Font.loadAsync({
      'sf': require('./assets/fonts/SanFranciscoText-Light.otf')
    });
  }

  clear() {
    this.setState({
      result: 0,
      resultText: '0',
      resultTextFontSize: 72,
      pastResult: '',
      pastResultText: '',
      expression: '',
      minus: '-'
    });
  }

  backspace() {
    let resultText = this.state.resultText;

    this.setState({ resultText:  resultText.length > 1 ? resultText.slice(0, -1) : '0' });
  }

  plusMinusChange() {
    let minus = this.state.minus;
    let resultText = this.state.resultText;

    if(minus) {
      this.setState({
        resultText: minus + resultText,
        minus: ''
      });
      return;
    }

    this.setState({
      resultText: resultText.slice(1),
      minus: '-'
    });
  }

  writeResult(textToAppend) { // called every time a number button or dot is pressed.
    let resultText = this.state.resultText.toString();
    let dotCount = resultText.split('.').length - 1;
    
    let isTextNotZero = resultText != '0' && resultText != '-0' && textToAppend !='.';
    let isTextOneDot = textToAppend == '.' && dotCount == 0;

    if(isTextNotZero || isTextOneDot) {
      this.setState({ resultText: textToAppend == '.' || resultText.includes('.') ? (resultText + textToAppend) : numeral(resultText + textToAppend).format() });
    } else if(textToAppend != '.') {
      this.setState({
        resultText: textToAppend,
        minus: '-'
      });
    }

    this.resizeResultText(this.state.resultText);
  }

  createExpression(operator) { // called every time an operation button is pressed.
    let pastResultText = this.state.pastResultText;
    let hasPastResultTextEqual = pastResultText.includes('=');
    pastResultText = hasPastResultTextEqual ? (this.state.resultText + '' + operator) : (this.state.pastResultText + this.state.resultText + '' + operator)

    let result = numeral(this.state.resultText).value();

    this.setState({
      expression: hasPastResultTextEqual ? (result + mathOperatorsMap[operator]) : (this.state.expression += result + mathOperatorsMap[operator]),
      pastResult: result + '' + mathOperatorsMap[operator],
      pastResultText: pastResultText,
      resultText: '0'
    });
  }

  executeOperation() {
    let pastResultText = this.state.pastResultText;

    if(!pastResultText.includes('=')) { // if an expression has just been evaluated, can't evaluate again
      pastResultText += this.state.resultText + '=';

      this.createExpression('');

      let result = math.eval(this.state.expression);
      let resultParts = result.toString().split('.');
      let resultText = numeral(resultParts[0]).format() + resultParts[1];
    
      this.resizeResultText(result);

      this.setState({
        pastResultText: pastResultText,
        resultText: result
      })
    }
  }

  resizeResultText(resultText) {
    resultText = resultText.toString();

    if(resultText.length > 13) {
      this.setState({ resultTextFontSize: 32 });
    } else if(resultText.length > 8) {
      this.setState({ resultTextFontSize: 48 });
    }
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>

        <ResultsView resultText={this.state.resultText} resultTextFontSize={this.state.resultTextFontSize} pastResultText={this.state.pastResultText} backspace={this.backspace}/>

        <ButtonsRow buttonText0='C' buttonText1='±' buttonText2='%' buttonText3='÷'
                    onPressButton0={this.clear} onPressButton1={this.plusMinusChange} onPressButton2={this.createExpression} onPressButton3={this.createExpression}/>
        <ButtonsRow buttonText0='7' buttonText1='8' buttonText2='9' buttonText3='×'
                    onPressButton0={this.writeResult} onPressButton1={this.writeResult} onPressButton2={this.writeResult} onPressButton3={this.createExpression}/>
        <ButtonsRow buttonText0='4' buttonText1='5' buttonText2='6' buttonText3='-'
                    onPressButton0={this.writeResult} onPressButton1={this.writeResult} onPressButton2={this.writeResult} onPressButton3={this.createExpression}/>
        <ButtonsRow buttonText0='1' buttonText1='2' buttonText2='3' buttonText3='+'
                    onPressButton0={this.writeResult} onPressButton1={this.writeResult} onPressButton2={this.writeResult} onPressButton3={this.createExpression}/>

        <ButtonsRow buttonText0='0' buttonText1='.' buttonText2='='
                    onPressButton0={this.writeResult} onPressButton1={this.writeResult} executeOperation={this.executeOperation}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111'
  }
});

const mathOperatorsMap = {
  '': '',
  '÷': '/',
  '×': '*',
  '+': '+',
  '-': '-',
  '%': '%'
};
