import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Button, Alert } from 'react-native';
//import { Restart } from 'fiction-expo-restart'
type Turn={//0: init , 1: X , 2: O
  player:number,
}
type BrickState={
  index:number,
  turn:Turn,
  callback:(index:number) => void,
  disable:boolean
}
var winner=0;
const backColors=["white","white","white"];
var board=[0,0,0,0,0,0,0,0,0];

const Brick: FC<{brickState:BrickState}>=({brickState})=>{
  const [player,setPlayer]=useState<number>(1)
  const clickHandler=()=>{
    console.log("FC click handler")
    if (brickState.disable){
      
      brickState.callback(brickState.index); 
      brickState.disable=false
      setPlayer(player+1)
    }
   
  }

  
  const checkUser=()=>{
    
    if(brickState.turn.player==1){
      return require('./assets/X.png')
    }
    else if(brickState.turn.player==2){
      return require('./assets/O.png')
    }
    else{
      return require('./assets/blank.png')
    }
  }
  return(
    <View style={[styles.brick]}>
      <TouchableOpacity onPress={clickHandler} style={[styles.brick, {backgroundColor:backColors[player]}]}>
      <Image style={{flex: 1,resizeMode: "stretch",width: "100%",}} source={checkUser()}>
      </Image>
      </TouchableOpacity>
     
    </View>
  )

}



const App: FC = () => {
  const [turn, setTurn] = useState<{ player: number }>({ player: 0 })
  const [num, setNum] = useState<number>(0) 
  const clickHandler = (ind: number) => {
    console.log("click on brick " + ind +" turn "+turn.player+ " ")
    if(turn.player==0){
      turn.player=1
    }
    if (turn.player == 1) {
      board[ind]=1;
      turn.player = 2;
    } else {
      board[ind]=2;
      turn.player = 1;
    }

    checkWinner()
  }

  const [bricks, setValue] = useState<Array<BrickState>>([])
  for (let i = 0; i < 9; i++) {
    bricks.push({ index: i, turn: turn, callback: clickHandler ,disable:true})
  }

  const checkWinner=()=>{
    console.log("FC chek winner");
    
    
    if(board[0]==board[1] && board[1]==board[2] && board[0]!=0){
          winner=bricks[0].turn.player;
    }
    else if((board[3]==board[4] && board[4]==board[5] && board[3]!=0)){
      winner=bricks[0].turn.player;
      }
    else if((board[6]==board[7] && board[7]==board[8] && board[6]!=0 )){
      winner=bricks[0].turn.player;
    }
    else if((board[0]==board[4] && board[4]==board[8] && board[0]!=0)){
     winner=bricks[0].turn.player;
    }
    else if((board[2]==board[4] && board[4]==board[6] && board[2]!=0)){
     winner=bricks[0].turn.player;
    }
    else if((board[0]==board[3] && board[3]==board[6] && board[0]!=0)){
     winner=bricks[0].turn.player;
    }
    else if((board[1]==board[4] && board[4]==board[7] && board[1]!=0)){
     winner=bricks[0].turn.player;
    }
    else if((board[2]==board[5] && board[5]==board[8] && board[2]!=0)){
     winner=bricks[0].turn.player
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
    console.log("0="+board[0]+" 1="+board[1]+ " 2="+board[2]);
  }

  const refreshPage = ()=>{
    console.log("REFRESHHHHH "+turn.player);
    board=[0,0,0,0,0,0,0,0,0]
    winner=0
    bricks.forEach(ele=>{
      ele.disable=true;
      ele.turn.player=0;
      setNum(num+1)
    })
  };
 
    return (
    <View style={styles.container} >
      <Text style={styles.title}>X Mix Drix</Text>
      <View style={styles.rowContainer}>
        <Brick brickState={bricks[0]}  ></Brick>
        <Brick brickState={bricks[1]} ></Brick>
        <Brick brickState={bricks[2]} ></Brick>
      </View>
      <View style={styles.rowContainer}>
        <Brick brickState={bricks[3]} ></Brick>
        <Brick brickState={bricks[4]} ></Brick>
        <Brick brickState={bricks[5]} ></Brick>
      </View>
      <View style={styles.rowContainer}>
        <Brick brickState={bricks[6]} ></Brick>
        <Brick brickState={bricks[7]} ></Brick>
        <Brick brickState={bricks[8]} ></Brick>
      </View>
        <TouchableOpacity onPress={refreshPage} style={styles.button}>
        <Text style={styles.button} >
          RELOAD
        </Text>
        </TouchableOpacity>
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