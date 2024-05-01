import './App.css';
import React from 'react'
import { useEffect, useState } from 'react';
// import { readFile } from 'fs';
import { Typography, 
          Grid, 
          TextField,
          Button
        } from '@mui/material';

function distanciaHamming(arrayDado , arrayEntrada){
  let dist = 0; 
  for(let i = 0; i < arrayEntrada.length; i++){
    let elementoEntrada = arrayEntrada[i]
    let elementoDado = arrayDado[i]

    if(elementoEntrada !== elementoDado){
        dist++; 
    }
  }
  return dist; 
}

function calculaDistancia(dados, entrada){
   let distancias = []
   
   for(let i = 0; i < dados.length; i++){
      let dado = dados[i];
      let dist = distanciaHamming(dado, entrada)
      distancias[i] = dist;
    }
  
    console.log('distancias', distancias)
    return distancias
}

function findKVizinhos(distancias, k){
  let dadosMaisProxIndex = []
    for(let i = 0; i< k; i++){
      let minDist = 99999999; 
      for(let j = 0; j < distancias.length; j++){
          if(distancias[j] < minDist){
            minDist = distancias[j]
          }
      }
      console.log("minDist", minDist)
      let indexDadoMaisProx = distancias.findIndex(dist => dist === minDist)
      distancias[indexDadoMaisProx] = 9999999999999
      dadosMaisProxIndex.push(indexDadoMaisProx)
    }
    return dadosMaisProxIndex
}

function classifica(dadosMaisProximosIndex, dados){
  let xVenceu = 0;
  let xPerdeu = 0;

  console.log('dadosMaisProximosIndex', dadosMaisProximosIndex)

  for(let  i = 0; i < dadosMaisProximosIndex.length; i++){
    let index = dadosMaisProximosIndex[i]
    let dado = dados[index]
    // console.log('DADO' , dado)
    let classificacaoDado = dado[9]

    if(classificacaoDado === 'positive'){
      xVenceu++

    } else {
      xPerdeu++
    }
  }

  if(xVenceu > xPerdeu){
    console.log('venceu', xVenceu)
    console.log('perdeu', xPerdeu)
    return 'X Venceu'
  } else {
    console.log('venceu', xVenceu)
    console.log('perdeu', xPerdeu)
    return 'X Perdeu'
  }

}

//[dist]
//dado
function knn(entrada){
  console.log(entrada)
  const k = 3
  const data = [
    ['x','x','x','o','o','b','b','b','b', 'negative'],
    ['x','b','o','o','b','o','x','x','x', 'negative'],
    ['x','b','b','x','x','o','x','o','o', 'positive'],    
    ['x','b','b','x','x','o','o','o','x', 'positive']
  ]

  let distancias = calculaDistancia(data, entrada)
  
  let dadosMaisProxIndex = findKVizinhos(distancias, k) 

  let classificaoFninal = classifica(dadosMaisProxIndex, data)

  return classificaoFninal
}

function verificaIgual(dado){
console.log(dado)
  for(let i=1; i<dado.length; i++){
    if(dado[i]!==dado[0]){
      return false;
    }
  }
  return true;
}

function arvoreDecisao(dado){
  let igual = verificaIgual(dado.slice(0,3))
  if(igual===true){
    if(dado[0]==='x'){
      return 'x ganhou';
    }
    else if(dado[0]=== 'o') return 'o ganhou'
  }  
  igual = verificaIgual(dado.slice(3,6))
  if(igual===true){
    if(dado[3]==='x'){
      return 'x ganhou';
    }
    else if(dado[3]=== 'o') return 'o ganhou'
  }
  igual = verificaIgual(dado.slice(6,9))
  if(igual===true){
    if(dado[6]==='x'){
      return 'x ganhou';
    }
    else if(dado[6]=== 'o') return 'o ganhou'
  }
  let coluna1 = [];
  for(let i=0; i<dado.length; i+=3){
    coluna1.push(dado[i])
  }
  igual = verificaIgual(coluna1)
  if(igual===true){
    if(dado[0]==='x'){
      return 'x ganhou';
    }
    else if(dado[0]=== 'o') return 'o ganhou'
  }
  let coluna2 = [];
  for(let i=1; i<dado.length; i+=3){
    coluna2.push(dado[i])
  }
  igual = verificaIgual(coluna2)
    if(igual===true){
      if(dado[1]==='x'){
        return 'x ganhou';
      }
      else if(dado[1]=== 'o') return 'o ganhou'
  }
  let coluna3 = [];
  for(let i=2; i<dado.length; i+=3){
    coluna3.push(dado[i])
  }
  igual = verificaIgual(coluna3)
    if(igual===true){
      if(dado[2]==='x'){
        return 'x ganhou'
      }
      else if(dado[2]=== 'o') return 'o ganhou'
  }
  let diag1 = [];
  for(let i=0; i<dado.length; i+=4){
    diag1.push(dado[i])
  }
  igual = verificaIgual(diag1)
    if(igual===true){
      if(dado[0]==='x'){
        return 'x ganhou';
      }
      else if(dado[0]=== 'o') return 'o ganhou'
  }
  let diag2 = [];
  for(let i=2; i<7; i+=2){
    diag2.push(dado[i])
  }
  igual = verificaIgual(diag2)
    if(igual===true){
      if(dado[2]==='x'){
        return 'x ganhou';
      }
      else if(dado[2]=== 'o') return 'o ganhou'
  }
  if(dado.includes('b')) return 'tem jogo'
  else return 'empate'
}

export default function App(){ 

  const [board, setBoard] = useState(['b','b','b','b','b','b','b','b','b'])
  const [error, setError] = useState(false)
  const [playerPlayed, setPlayerPlayed] = useState(false)
  const [computerIsPlaying, setComputerIsPlaying] = useState(false)

  useEffect(() => {
    console.log(board)
  }, [board]) 

  function playerPlay(item,index){
    setPlayerPlayed(false)
    let boardCopy = JSON.parse(JSON.stringify(board))
    boardCopy[index] = item
    setBoard(boardCopy)
    setPlayerPlayed(true)
  }

  function verifyFullBoard(){
    let contFreeSquares = 0;
    for(let i = 0 ; i < board.length; i++){
      let item = board[i]
      if(item === 'b'){
        contFreeSquares++
      }
    }
    if(contFreeSquares > 0){
      return false
    }
    return true
  }

  useEffect(() => {
    function computerPlay(){
      setComputerIsPlaying(true)
      let valid = false
      let boardCopy = JSON.parse(JSON.stringify(board))
      setTimeout(() => {
        while(!valid){
          let squareToPlay =  Math.floor(Math.random() * 9);
          if(boardCopy[squareToPlay] === 'b'){
            boardCopy[squareToPlay] = 'o'
            valid = true
          }
        }
        console.log(boardCopy)
        setBoard(boardCopy)
        setPlayerPlayed(false)
        setComputerIsPlaying(false)
      }, 2000);
    }

    console.log(playerPlayed)

    if(playerPlayed && !verifyFullBoard()){
      computerPlay()
    }

  },[playerPlayed])

  function handleRestart(){
    setBoard(['b','b','b','b','b','b','b','b','b'])
    setPlayerPlayed(false)
    setComputerIsPlaying(false)
  }

  return (
    <Grid sx={12} container direction={'column'} alignItems={'center'} gap={1}>
      <Typography style={{marginTop: '30px'}} display={'flex'} variant={'h4'} justifyContent={'center'}>
        <strong>TicTacToe - Machine Learning</strong>
      </Typography>
      <Grid item display={'flex'} sx={12} container width={372} direction={'row'} style={{marginTop: '60px'}}>
        {
          board.map((square, index) => (
            <Grid key={square.id} width={124}> 
              <TextField 
                disabled={computerIsPlaying}
                value={board[index] === 'b' ? '' : board[index]}
                onChange={(event) => {
                  let item = event.target.value
                  if( item === 'x' ){
                    playerPlay(item, index)
                  }
                  else {
                    setError(true)
                  }
                }}
                style={{width: '100%'}}/>
            </Grid>
          ))
        }
      </Grid>
      <Grid style={{marginTop: '10px'}}>
        <Button size={'small'} variant='contained' onClick={() => handleRestart()}>
          Reiniciar
        </Button>
      </Grid>
      <Grid style={{marginTop: '10px'}}>{computerIsPlaying ? `O computador está pensando...` : '‎'}</Grid>
      <Grid item style={{marginTop: '20px'}} container direction={'column'} justifyContent={'center'} gap={2} >
        <Typography display={'flex'} variant={'h6'} justifyContent={'center'}>
          <strong>Classificação Algoritimo K-NN: {knn(board)}</strong>
        </Typography>
        <Typography display={'flex'} variant={'h6'} justifyContent={'center'}>
          <strong>Classificação Algoritimo Árvore de Decisão: {arvoreDecisao(board)}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
}
