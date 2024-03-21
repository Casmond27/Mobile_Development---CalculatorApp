import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [answerValue, setAnswerValue] = useState('0');
  const [firstOperator, setfirstOperator] = useState('');
  const [operator, setOperator] = useState('');
  const [secondOperator, setSecondOperator] = useState(false);
  const [acButton, setAcButton] = useState();
  const [plusColor, setPlusColor] = useState("#5603ad");
  const [minusColor, setMinusColor] = useState("#5603ad");
  const [divideColor, setDivideColor] = useState("#5603ad");
  const [multiplyColor, setMultiplyColor] = useState("#5603ad");
  const [equation, setEquation] = useState('');


  useEffect(() => {
    //Change C button to AC button
    if (answerValue == 0) {
      setAcButton("AC");
    } else {
      setAcButton("C");
    }
    //change color of button when pressed
    switch (operator) {
      case '+':
        setPlusColor("#8367c7");
        setMinusColor("#5603ad");
        setDivideColor("#5603ad");
        setMultiplyColor("#5603ad");
        break;
      case '-':
        setPlusColor("#5603ad");
        setMinusColor("#8367c7");
        setDivideColor("#5603ad");
        setMultiplyColor("#5603ad");
        break;
      case '*':
        setPlusColor("#5603ad");
        setMinusColor("#5603ad");
        setDivideColor("#5603ad");
        setMultiplyColor("#8367c7");
        break;
      case '/':
        setPlusColor("#5603ad");
        setMinusColor("#5603ad");
        setDivideColor("#8367c7");
        setMultiplyColor("#5603ad");
        break;
      default:
        return;
    }
  });
  const buttonPressed = (value) => {
    if (secondOperator) {
      setAnswerValue(value);
       setSecondOperator(false);
    }
    else {
      setAnswerValue((prevDefaultValue) =>
        prevDefaultValue === '0' ? value : prevDefaultValue + value);
    }

  };

// when the first operator is pressed
  const handleOperatorPressed = (selectedOperator) => {

    if (answerValue !== '') {
      setSecondOperator(true);
      setOperator(selectedOperator);
      setEquation((prevEquation) => prevEquation + answerValue + selectedOperator);
      setfirstOperator(answerValue);
      setAnswerValue('');
    }
  };

// when equal button is pressed
  const handleEqualsPressed = () => {
    const secondOperator = answerValue;
    const num1 = parseFloat(firstOperator);
    const num2 = parseFloat(secondOperator);

    let result = 0;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        return;
    }

   
    setAnswerValue(result);
    setfirstOperator('');
    setOperator('');
    setSecondOperator(false);
    setEquation('');
  };

{/*change the number to positive or negative*/}
  const changeSign = () => {
     setAnswerValue(String(-parseFloat(answerValue)));
  }



  {/*percentage function*/}
  const percentage = () => {
   setAnswerValue(String(parseFloat(answerValue)/100));
};

  {/*add decimal point*/}
  const decimal = () => {
      if (!answerValue.includes('.'))
         setAnswerValue((prevDefaultValue) => prevDefaultValue + '.');
   }



  {/*clear the value on the screen*/}
  const clear = () => {
    setAnswerValue('0');
    setfirstOperator('');
    setOperator('');
    setSecondOperator(false);
    setEquation('');
  };



  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.displayContainer}>
    <Text style={styles.result}>{equation}</Text>
      <Text style={styles.result}>{answerValue}</Text>
    </View>
      <StatusBar style="light content" />

      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonLightBlue]}>
          <Text style={styles.buttonText2} onPress={clear}> {acButton} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonLightBlue]}>
          <Text style={styles.buttonText2} onPress={changeSign}> +/- </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonLightBlue]}>
          <Text style={styles.buttonText2} onPress={percentage}> % </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonPurple,  {backgroundColor: divideColor}]}>
          <Text style={styles.buttonText1} onPress={() => handleOperatorPressed('/')} > / </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonStyle} >
          <Text style={styles.buttonText1} onPress={() => buttonPressed('7')}> 7 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('8')}> 8 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('9')}> 9 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonPurple,  {backgroundColor: multiplyColor}]}>
          <Text style={styles.buttonText1} onPress={() => handleOperatorPressed('*')}> x </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('4')}> 4 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('5')}> 5 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('6')}> 6 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonPurple, {backgroundColor: minusColor}]}>
          <Text style={styles.buttonText1} onPress={() => handleOperatorPressed('-')}> - </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('1')}> 1 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('2')}> 2 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('3')}> 3 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonPurple ,  {backgroundColor: plusColor}]}>
          <Text style={styles.buttonText1} onPress={() => handleOperatorPressed('+')}> + </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonBig}>
          <Text style={styles.buttonText1} onPress={() => buttonPressed('0')}> 0 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText1} onPress={decimal}> . </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonPurple]}>
          <Text style={styles.buttonText1} onPress={handleEqualsPressed}> = </Text>
        </TouchableOpacity>
      </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 16,
    marginRight: 16
  },
  result: {
    color: 'white',
    fontSize: 64,
  },
  row: {
    flexDirection: "row"
  },
  buttonStyle: {
    backgroundColor: "#333333",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 100,
    height: 90,
  },
  buttonText1: {
    color: 'white',
    fontSize: 30,
  },
  buttonText2: {
    color: 'black',
    fontSize: 30,
  },
  buttonLightBlue: {
    backgroundColor: '#72bcd4',
  },
  buttonPurple: {
    backgroundColor: '#5603ad',
  },

  buttonBig: {
    backgroundColor: "#333333",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 100,
    height: 90,
  },

});
