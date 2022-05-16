import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { FC, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Button, window, Alert } from 'react-native';
import RNRestart from 'react-native-restart';


var winner=0;
const backColors=["white","red","green"];
const board=[0,0,0,0,0,0,0,0,0];

const Brick: FC<{callback:(ind:number,disable:boolean)=>void, index:number,turn:{player:number}}>=({callback, index, turn})=>{
 //its state: [name of prop ,setFunc]=useState<typeOfProp>(default value)
  const [player,setPlayer]=useState<number>(0)
  const [disable,setDisable]=useState<boolean>(true)
  
  const clickHandler=()=>{
    //every touch the player will change- by the turn.player
    if (disable==true){
      checkWinner();
      setPlayer(turn.player)
      setDisable(false)
      //the function that send at callback will call with index pram
      callback(index,disable); //goes to click handler in app 
    }
   
  }

  const checkWinner=()=>{
    if(board[0]==board[1] && board[1]==board[2] && board[0]!=0){
          winner=turn.player;
    }
    else if((board[3]==board[4] && board[4]==board[5] && board[3]!=0)){
     winner=turn.player;
    }
    else if((board[6]==board[7] && board[7]==board[8] && board[6]!=0 )){
     winner=turn.player;
    }
    else if((board[0]==board[4] && board[4]==board[8] && board[0]!=0)){
     winner=turn.player;
    }
    else if((board[2]==board[4] && board[4]==board[6] && board[2]!=0)){
     winner=turn.player;
    }
    else if((board[0]==board[3] && board[3]==board[6] && board[0]!=0)){
     winner=turn.player;
    }
    else if((board[1]==board[4] && board[4]==board[7] && board[1]!=0)){
     winner=turn.player;
    }
    else if((board[2]==board[5] && board[5]==board[8] && board[2]!=0)){
     winner=turn.player;
    }
    if(winner!=0){
     console.log("the winner is:"+ winner);
     if(winner==1){
      Alert.alert("the winner is X")
     }
     if(winner==2){
      Alert.alert("the winner is O")
     }
    }
  }
  const checkUser=()=>{
    if(turn.player==1){
      return './assets/X.png'
    }
    else{
      return './assets/O.png'
    }
  }
  return(
    <View style={[styles.brick]}>
      <TouchableOpacity onPress={clickHandler} style={[styles.brick, {backgroundColor:backColors[player]}]}>
      <Image source={require(checkUser())}>
      </Image>
      </TouchableOpacity>
     
    </View>
  )

}



const App: FC = () => {
  //turn is object with prop player
  const turn = { player: 1 } //1: X , 2: O
  const clickHandler = (ind: number,disable:boolean) => {
    //when click on brick there is print with serial num
    console.log("click on brick " + ind )
    if (turn.player == 1) {
      board[ind]=1;
      turn.player = 2;
     
    } else {
      board[ind]=2;
      turn.player = 1;
  
    }

   
  }

  const refreshPage = ()=>{
    RNRestart.Restart();
 };
  
 

    return (
    <View style={styles.container} >
      <Text style={styles.title}>X Mix Drix</Text>
      <View style={styles.rowContainer}>
        <Brick callback={clickHandler} index={0} turn={turn} ></Brick>
        <Brick callback={clickHandler} index={1} turn={turn} ></Brick>
        <Brick callback={clickHandler} index={2} turn={turn} ></Brick>
      </View>
      <View style={styles.rowContainer}>
        <Brick callback={clickHandler} index={3} turn={turn} ></Brick>
        <Brick callback={clickHandler} index={4} turn={turn} ></Brick>
        <Brick callback={clickHandler} index={5} turn={turn} ></Brick>
      </View>
      <View style={styles.rowContainer}>
        <Brick callback={clickHandler} index={6} turn={turn} ></Brick>
        <Brick callback={clickHandler} index={7} turn={turn} ></Brick>
        <Brick callback={clickHandler} index={8} turn={turn} ></Brick>
      </View>
        <TouchableOpacity onPress={refreshPage} style={styles.button}>
        <Text style={styles.button} >
          RELOAD
        </Text></TouchableOpacity>
    </View>
  );
}













const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'blue',
    
  },
  rowContainer: {
    flexDirection: 'row',

  },
  label: {
    flex: 1
  },
  child: {
    margin: 5,
    flex: 1,
    aspectRatio: 1,
  },
  brick: {
    backgroundColor: "white",
    margin: 5,
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    fontSize: 30,
    textAlign: "center"
  },
  button: {
    margin: 5,
    fontSize: 50,
    textAlign: "center",
    backgroundColor: "grey",
    borderRadius: 10
  }
});

export default App