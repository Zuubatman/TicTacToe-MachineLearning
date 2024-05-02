import './App.css';
import React from 'react'
import { useEffect, useState } from 'react';

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
  
    // console.log('distancias', distancias)
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
      // console.log("minDist", minDist)
      let indexDadoMaisProx = distancias.findIndex(dist => dist === minDist)
      distancias[indexDadoMaisProx] = 9999999999999
      dadosMaisProxIndex.push(indexDadoMaisProx)
    }
    return dadosMaisProxIndex
}

function classifica(dadosMaisProximosIndex, dados){
  let xVenceu = 0;
  let oVenceu = 0;
  let velha = 0;
  let temJogo = 0;

  for(let  i = 0; i < dadosMaisProximosIndex.length; i++){
    let index = dadosMaisProximosIndex[i]
    let dado = dados[index]
    let classificacaoDado = dado[9]

    console.log('dado próximo ',  dado)

    if(classificacaoDado === 'xganha'){
      xVenceu++

    } else if ( classificacaoDado === 'oganha'){
      oVenceu++

    } else if (classificacaoDado === 'velha'){
      velha++

    } else {
      temJogo++
    }
  }

  let arrayQuants = [xVenceu, oVenceu, velha, temJogo]

  console.log(arrayQuants)

  let quant = 0;
  let indexWinner;

  for(let k = 0; k < arrayQuants.length; k ++){
    if(arrayQuants[k] > quant){
      quant = arrayQuants[k]
      indexWinner = k;
    }
  }

  console.log('indexWinner', indexWinner)

  if( indexWinner === 0){
    return 'X Venceu'
  } else if( indexWinner === 1){
    return 'O Venceu'
  } else if( indexWinner === 2 ){
    return 'Empate'
  } else {
    return 'Tem Jogo'
  }
}

//[dist]
//dado
function knn(entrada){
  // console.log(entrada)
  const k = 4
  const data = [
    ['x','x','o','o','x','x','x','o','o','velha'],
['x','x','o','o','o','x','x','x','o','velha'],
['x','x','o','o','o','x','x','o','x','velha'],
['x','o','x','x','x','o','o','x','o','velha'],
['x','o','x','x','o','x','o','x','o','velha'],
['x','o','x','x','o','o','o','x','x','velha'],
['x','o','x','o','x','x','o','x','o','velha'],
['x','o','x','o','o','x','x','x','o','velha'],
['x','o','o','o','x','x','x','x','o','velha'],
['o','x','x','x','x','o','o','o','x','velha'],
['o','x','x','x','o','o','x','o','x','velha'],
['o','x','x','x','o','o','o','x','x','velha'],
['o','x','o','x','x','o','x','o','x','velha'],
['o','x','o','x','o','x','x','o','x','velha'],
['o','x','o','o','x','x','x','o','x','velha'],
['o','o','x','x','x','o','o','x','x','velha'],
['o','o','x','x','o','o','o','x','x','velha'],
['o','o','x','x','x','o','o','o','x','velha'],
['o','o','x','x','x','o','o','x','o','velha'],
['o','x','o','o','o','x','x','o','x','velha'],
['o','x','o','o','x','o','x','o','x','velha'],
['o','x','o','o','x','x','x','o','o','velha'],
['o','x','o','x','o','o','x','o','x','velha'],
['o','x','o','x','x','o','o','o','x','velha'],
['o','x','x','x','o','o','o','o','x','velha'],
['x','o','o','o','o','x','x','x','o','velha'],
['x','o','o','o','x','x','o','x','o','velha'],
['x','o','o','o','x','x','x','o','o','velha'],
['x','o','x','o','o','x','o','x','o','velha'],
['x','o','x','o','x','o','o','x','o','velha'],
['x','o','x','x','o','o','o','x','o','velha'],
['x','x','o','o','o','x','x','o','o','velha'],
['x','x','x','x','o','o','x','o','o','xganha'],
['x','x','x','x','o','o','o','x','o','xganha'],
['x','x','x','x','o','o','o','o','x','xganha'],
['x','x','x','x','o','o','o','b','b','xganha'],
['x','x','x','x','o','o','b','o','b','xganha'],
['x','x','x','x','o','o','b','b','o','xganha'],
['x','x','x','x','o','b','o','o','b','xganha'],
['x','x','x','x','o','b','o','b','o','xganha'],
['x','x','x','x','o','b','b','o','o','xganha'],
['x','x','x','x','b','o','o','o','b','xganha'],
['x','x','x','x','b','o','o','b','o','xganha'],
['x','x','x','x','b','o','b','o','o','xganha'],
['x','x','x','o','x','o','x','o','o','xganha'],
['x','x','x','o','x','o','o','x','o','xganha'],
['x','x','x','o','x','o','o','o','x','xganha'],
['x','x','x','o','x','o','o','b','b','xganha'],
['x','x','x','o','x','o','b','o','b','xganha'],
['x','x','x','o','x','o','b','b','o','xganha'],
['x','x','x','o','x','b','o','o','b','xganha'],
['x','x','x','o','x','b','o','b','o','xganha'],
['x','x','x','o','x','b','b','o','o','xganha'],
['x','x','x','o','o','x','x','o','o','xganha'],
['x','x','x','o','o','x','o','x','o','xganha'],
['x','x','x','o','o','x','o','o','x','xganha'],
['x','x','x','o','o','x','o','b','b','xganha'],
['x','x','x','o','o','x','b','o','b','xganha'],
['x','x','x','o','o','x','b','b','o','xganha'],
['x','x','x','o','o','b','x','o','b','xganha'],
['x','x','x','o','o','b','x','b','o','xganha'],
['x','x','x','o','o','b','o','x','b','xganha'],
['x','x','x','o','o','b','o','b','x','xganha'],
['x','x','x','o','o','b','b','x','o','xganha'],
['x','x','x','o','o','b','b','o','x','xganha'],
['x','x','x','o','o','b','b','b','b','xganha'],
['x','x','x','o','b','x','o','o','b','xganha'],
['x','x','x','o','b','x','o','b','o','xganha'],
['x','x','x','o','b','x','b','o','o','xganha'],
['x','x','x','o','b','o','x','o','b','xganha'],
['x','x','x','o','b','o','x','b','o','xganha'],
['x','x','x','o','b','o','o','x','b','xganha'],
['x','x','x','o','b','o','o','b','x','xganha'],
['x','x','x','o','b','o','b','x','o','xganha'],
['x','x','x','o','b','o','b','o','x','xganha'],
['x','x','x','o','b','o','b','b','b','xganha'],
['x','x','x','o','b','b','x','o','o','xganha'],
['x','x','x','o','b','b','o','x','o','xganha'],
['x','x','x','o','b','b','o','o','x','xganha'],
['x','x','x','o','b','b','o','b','b','xganha'],
['x','x','x','o','b','b','b','o','b','xganha'],
['x','x','x','o','b','b','b','b','o','xganha'],
['x','x','x','b','x','o','o','o','b','xganha'],
['x','x','x','b','x','o','o','b','o','xganha'],
['x','x','x','b','x','o','b','o','o','xganha'],
['x','x','x','b','o','x','o','o','b','xganha'],
['x','x','x','b','o','x','o','b','o','xganha'],
['x','x','x','b','o','x','b','o','o','xganha'],
['x','x','x','b','o','o','x','o','b','xganha'],
['x','x','x','b','o','o','x','b','o','xganha'],
['x','x','x','b','o','o','o','x','b','xganha'],
['x','x','x','b','o','o','o','b','x','xganha'],
['x','x','x','b','o','o','b','x','o','xganha'],
['x','x','x','b','o','o','b','o','x','xganha'],
['x','x','x','b','o','o','b','b','b','xganha'],
['x','x','x','b','o','b','x','o','o','xganha'],
['x','x','x','b','o','b','o','x','o','xganha'],
['x','x','x','b','o','b','o','o','x','xganha'],
['x','x','x','b','o','b','o','b','b','xganha'],
['x','x','x','b','o','b','b','o','b','xganha'],
['x','x','x','b','o','b','b','b','o','xganha'],
['x','x','x','b','b','o','x','o','o','xganha'],
['x','x','x','b','b','o','o','x','o','xganha'],
['x','x','x','b','b','o','o','o','x','xganha'],
['x','x','x','b','b','o','o','b','b','xganha'],
['x','x','x','b','b','o','b','o','b','xganha'],
['x','x','x','b','b','o','b','b','o','xganha'],
['x','x','x','b','b','b','o','o','b','xganha'],
['x','x','x','b','b','b','o','b','o','xganha'],
['x','x','x','b','b','b','b','o','o','xganha'],
['x','x','o','x','x','o','o','o','x','xganha'],
['x','x','o','x','o','x','x','o','o','xganha'],
['x','x','o','x','o','o','x','o','x','xganha'],
['x','x','o','x','o','o','x','b','b','xganha'],
['x','x','o','x','o','b','x','o','b','xganha'],
['x','x','o','x','o','b','x','b','o','xganha'],
['x','x','o','x','b','o','x','o','b','xganha'],
['x','x','o','x','b','o','x','b','o','xganha'],
['x','x','o','x','b','b','x','o','o','xganha'],
['x','x','o','o','x','x','o','x','o','xganha'],
['x','x','o','o','x','x','o','o','x','xganha'],
['o','o','o','o','x','x','o','x','x','oganha'],
['o','o','o','o','x','x','x','o','x','oganha'],
['o','o','o','o','x','x','x','x','o','oganha'],
['o','o','o','o','x','x','x','b','b','oganha'],
['o','o','o','o','x','x','b','x','b','oganha'],
['o','o','o','o','x','x','b','b','x','oganha'],
['o','o','o','o','x','b','x','x','b','oganha'],
['o','o','o','o','x','b','x','b','x','oganha'],
['o','o','o','o','x','b','b','x','x','oganha'],
['o','o','o','o','b','x','x','x','b','oganha'],
['o','o','o','o','b','x','x','b','x','oganha'],
['o','o','o','o','b','x','b','x','x','oganha'],
['o','o','o','x','o','x','o','x','x','oganha'],
['o','o','o','x','o','x','x','o','x','oganha'],
['o','o','o','x','o','x','x','x','o','oganha'],
['o','o','o','x','o','x','x','b','b','oganha'],
['o','o','o','x','o','x','b','x','b','oganha'],
['o','o','o','x','o','x','b','b','x','oganha'],
['o','o','o','x','o','b','x','x','b','oganha'],
['o','o','o','x','o','b','x','b','x','oganha'],
['o','o','o','x','o','b','b','x','x','oganha'],
['o','o','o','x','x','o','o','x','x','oganha'],
['o','o','o','x','x','o','x','o','x','oganha'],
['o','o','o','x','x','o','x','x','o','oganha'],
['o','o','o','x','x','o','x','b','b','oganha'],
['o','o','o','x','x','o','b','x','b','oganha'],
['o','o','o','x','x','o','b','b','x','oganha'],
['o','o','o','x','x','b','o','x','b','oganha'],
['o','o','o','x','x','b','o','b','x','oganha'],
['o','o','o','x','x','b','x','o','b','oganha'],
['o','o','o','x','x','b','x','b','o','oganha'],
['o','o','o','x','x','b','b','o','x','oganha'],
['o','o','o','x','x','b','b','x','o','oganha'],
['o','o','o','x','x','b','b','b','b','oganha'],
['o','o','o','x','b','o','x','x','b','oganha'],
['o','o','o','x','b','o','x','b','x','oganha'],
['o','o','o','x','b','o','b','x','x','oganha'],
['o','o','o','x','b','x','o','x','b','oganha'],
['o','o','o','x','b','x','o','b','x','oganha'],
['o','o','o','x','b','x','x','o','b','oganha'],
['o','o','o','x','b','x','x','b','o','oganha'],
['o','o','o','x','b','x','b','o','x','oganha'],
['o','o','o','x','b','x','b','x','o','oganha'],
['o','o','o','x','b','x','b','b','b','oganha'],
['o','o','o','x','b','b','o','x','x','oganha'],
['o','o','o','x','b','b','x','o','x','oganha'],
['o','o','o','x','b','b','x','x','o','oganha'],
['o','o','o','x','b','b','x','b','b','oganha'],
['o','o','o','x','b','b','b','x','b','oganha'],
['o','o','o','x','b','b','b','b','x','oganha'],
['o','o','o','b','o','x','x','x','b','oganha'],
['o','o','o','b','o','x','x','b','x','oganha'],
['o','o','o','b','o','x','b','x','x','oganha'],
['o','o','o','b','x','o','x','x','b','oganha'],
['o','o','o','b','x','o','x','b','x','oganha'],
['o','o','o','b','x','o','b','x','x','oganha'],
['o','o','o','b','x','x','o','x','b','oganha'],
['o','o','o','b','x','x','o','b','x','oganha'],
['o','o','o','b','x','x','x','o','b','oganha'],
['o','o','o','b','x','x','x','b','o','oganha'],
['o','o','o','b','x','x','b','o','x','oganha'],
['o','o','o','b','x','x','b','x','o','oganha'],
['o','o','o','b','x','x','b','b','b','oganha'],
['o','o','o','b','x','b','o','x','x','oganha'],
['o','o','o','b','x','b','x','o','x','oganha'],
['o','o','o','b','x','b','x','x','o','oganha'],
['o','o','o','b','x','b','x','b','b','oganha'],
['o','o','o','b','x','b','b','x','b','oganha'],
['o','o','o','b','x','b','b','b','x','oganha'],
['o','o','o','b','b','x','o','x','x','oganha'],
['o','o','o','b','b','x','x','o','x','oganha'],
['o','o','o','b','b','x','x','x','o','oganha'],
['o','o','o','b','b','x','x','b','b','oganha'],
['o','o','o','b','b','x','b','x','b','oganha'],
['o','o','o','b','b','x','b','b','x','oganha'],
['o','o','o','b','b','b','x','x','b','oganha'],
['o','o','o','b','b','b','x','b','x','oganha'],
['o','o','o','b','b','b','b','x','x','oganha'],
['o','o','x','o','o','x','x','x','o','oganha'],
['o','o','x','o','x','o','o','x','x','oganha'],
['o','o','x','o','x','x','o','x','o','oganha'],
['o','o','x','o','x','x','o','b','b','oganha'],
['o','o','x','o','x','b','o','x','b','oganha'],
['o','o','x','o','x','b','o','b','x','oganha'],
['o','o','x','o','b','x','o','x','b','oganha'],
['o','o','x','o','b','x','o','b','x','oganha'],
['o','o','x','o','b','b','o','x','x','oganha'],
['o','o','x','x','o','o','x','o','x','oganha'],
['o','o','x','x','o','o','x','x','o','oganha'],
['x','b','o','b','x','b','b','b','b','temjogo'],
['x','o','x','o','o','b','x','b','b','temjogo'],
['b','b','b','b','b','b','b','b','b','temjogo'],
['b','b','x','b','b','b','o','b','b','temjogo'],
['b','x','b','b','o','b','b','b','x','temjogo'],
['x','b','b','b','b','b','b','b','o','temjogo'],
['x','o','b','b','b','b','b','o','b','temjogo'],
['b','b','b','b','x','b','b','b','b','temjogo'],
['b','b','x','b','b','b','o','b','b','temjogo'],
['b','x','b','b','b','b','b','b','b','temjogo'],
['o','x','b','b','o','b','b','b','x','temjogo'],
['o','b','x','b','o','b','b','b','b','temjogo'],
['o','x','o','x','x','b','o','b','b','temjogo'],
['b','o','b','b','x','b','b','b','o','temjogo'],
['o','b','b','b','b','b','b','b','x','temjogo'],
['o','x','b','b','b','b','b','x','b','temjogo'],
['b','b','b','b','o','b','b','b','b','temjogo'],
['b','b','o','b','b','b','x','b','b','temjogo'],
['b','o','b','b','b','b','b','b','b','temjogo'],
['x','o','b','b','x','b','b','b','o','temjogo'],
['x','o','o','b','x','b','b','b','o','temjogo'],
['x','o','b','b','x','o','x','b','x','temjogo'],
['x','o','b','b','x','b','b','b','b','temjogo'],
['x','x','b','b','o','b','b','b','o','temjogo'],
['x','o','b','b','x','b','o','b','o','temjogo'],
['x','o','x','b','x','b','b','b','o','temjogo'],
['x','o','b','b','b','b','b','b','b','temjogo'],
['x','o','b','x','x','b','o','b','o','temjogo'],
]

  let distancias = calculaDistancia(data, entrada)
  
  let dadosMaisProxIndex = findKVizinhos(distancias, k) 

  let classificaoFninal = classifica(dadosMaisProxIndex, data)

  return classificaoFninal
}

// function somatorio(peso1, peso2, peso3, pesoBias, valorX, valorO, valorB, valorBias){
//   let valorPropagacao = (peso1 * valorX) + (peso2 * valorO) + (peso3 * valorB) + (pesoBias * valorBias)
//   return valorPropagacao
// }

// function neuronio1(valorX , valorO, valorB, bias){
//   let pesoBias = 0.25
//   let peso1 = 0.5
//   let peso2 = 1;
//   let peso3 = -0.5
//   let valorPropagacao = somatorio(peso1, peso2, peso3, pesoBias, valorX, valorO, valorB, bias)
//   let valorAtivacao = Number(Math.tan(valorPropagacao))
//   return valorAtivacao
// }

// function neuronio2(valorX, valorO, valorB, bias){
//   let pesoBias = 0.25
//   let peso1 = 0.5
//   let peso2 = 1;
//   let peso3 = -0.5
//   let valorPropagacao = somatorio(peso1, peso2, peso3, pesoBias, valorX, valorO, valorB, bias)
//   let valorAtivacao = Math.tan(valorPropagacao)
//   return valorAtivacao
// }

// function neuronio3(valorX, valorO, valorB, bias){
//   let pesoBias = 0.25
//   let peso1 = 0.5
//   let peso2 = 1;
//   let peso3 = -0.5
//   let valorPropagacao = somatorio(peso1, peso2, peso3, pesoBias, valorX, valorO, valorB, bias)
//   let valorAtivacao = Math.tan(valorPropagacao)
//   return valorAtivacao
  
// }

// function neuronio4(valorX, valorO, valorB, bias){
//   let pesoBias = 0.25
//   let peso1 = 0.5
//   let peso2 = 1;
//   let peso3 = -0.5
//   let valorPropagacao = somatorio(peso1, peso2, peso3, pesoBias, valorX, valorO, valorB, bias)
//   let valorAtivacao = Math.tan(valorPropagacao)
//   return valorAtivacao
// }

// function neuronioSaida1(propagacao1, propagacao2, propagacao3, propagacao4){
//   let pesoBias = 0.25
//   let peso1 = 0.5
//   let peso2 = 1;
//   let peso3 = -0.5
//   let valorPropagacao = somatorio(peso1, peso2, peso3, pesoBias, propagacao1, propagacao2, propagacao3, propagacao4)
//   let valorSaida = Math.tan(valorPropagacao)
//   return valorSaida
// }

// function neuronioSaida2(propagacao1, propagacao2, propagacao3, propagacao4){
//   let pesoBias = 0.25
//   let peso1 = 0.5
//   let peso2 = 1;
//   let peso3 = -0.5
//   let valorPropagacao = somatorio(peso1, peso2, peso3, pesoBias, propagacao1, propagacao2, propagacao3, propagacao4)
//   let valorSaida = Math.tan(valorPropagacao)
//   return valorSaida
// }

// function MLP(entrada){
//   let quantX = 0.0;
//   let quantO = 0.0;
//   let quantB = 0.0;
  
//   for(let i = 0; i < entrada.length; i++){
//       let item = entrada[i]
      
//       if(item === 'x'){
//         quantX++
//       } 
//       else if (item === 'o'){
//         quantO++;
//       }
//       else{
//         quantB++
//       }
//   }

//   console.log('quantX', quantX)
//   console.log('quantO', quantO)
//   console.log('quantB', quantB)

//   let bias = 1.0
//   let valorX = quantX/9
//   let valorO = quantO/9
//   let valorB = quantB/9

//   console.log('valorX', valorX)
//   console.log('valorO', valorO)
//   console.log('valorB', valorB)

//   let valorAtivacao1 = neuronio1(valorX, valorO, valorB, bias)
//   let valorAtivacao2 = neuronio2(valorX, valorO, valorB, bias)
//   let valorAtivacao3 = neuronio3(valorX, valorO, valorB, bias)
//   let valorAtivacao4 = neuronio4(valorX, valorO, valorB, bias)

//   let valorSaida1 = neuronioSaida1(valorAtivacao1, valorAtivacao2, valorAtivacao3, valorAtivacao4)
//   let valorSaida2 = neuronioSaida2(valorAtivacao1, valorAtivacao2, valorAtivacao3, valorAtivacao4)

//   console.log('valorSaida1', valorSaida1)
//   console.log('valorSaida2',valorSaida2)

// }

function verificaIgual(dado){
// console.log(dado)
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
      return 'X Venceu';
    }
    else if(dado[0]=== 'o') return 'O Venceu'
  }  
  igual = verificaIgual(dado.slice(3,6))
  if(igual===true){
    if(dado[3]==='x'){
      return 'X Venceu';
    }
    else if(dado[3]=== 'o') return 'O Venceu'
  }
  igual = verificaIgual(dado.slice(6,9))
  if(igual===true){
    if(dado[6]==='x'){
      return 'X Venceu';
    }
    else if(dado[6]=== 'o') return 'O Venceu'
  }
  let coluna1 = [];
  for(let i=0; i<dado.length; i+=3){
    coluna1.push(dado[i])
  }
  igual = verificaIgual(coluna1)
  if(igual===true){
    if(dado[0]==='x'){
      return 'X Venceu';
    }
    else if(dado[0]=== 'o') return 'O Venceu'
  }
  let coluna2 = [];
  for(let i=1; i<dado.length; i+=3){
    coluna2.push(dado[i])
  }
  igual = verificaIgual(coluna2)
    if(igual===true){
      if(dado[1]==='x'){
        return 'X Venceu';
      }
      else if(dado[1]=== 'o') return 'O Venceu'
  }
  let coluna3 = [];
  for(let i=2; i<dado.length; i+=3){
    coluna3.push(dado[i])
  }
  igual = verificaIgual(coluna3)
    if(igual===true){
      if(dado[2]==='x'){
        return 'X Venceu'
      }
      else if(dado[2]=== 'o') return 'O Venceu'
  }
  let diag1 = [];
  for(let i=0; i<dado.length; i+=4){
    diag1.push(dado[i])
  }
  igual = verificaIgual(diag1)
    if(igual===true){
      if(dado[0]==='x'){
        return 'X Venceu';
      }
      else if(dado[0]=== 'o') return 'O Venceu'
  }
  let diag2 = [];
  for(let i=2; i<7; i+=2){
    diag2.push(dado[i])
  }
  igual = verificaIgual(diag2)
    if(igual===true){
      if(dado[2]==='x'){
        return 'X Venceu';
      }
      else if(dado[2]=== 'o') return 'O Venceu'
  }
  if(dado.includes('b')) return 'Tem jogo'
  else return 'Empate'
}

export default function App(){ 

  const [board, setBoard] = useState(['b','b','b','b','b','b','b','b','b'])
  const [playerPlayed, setPlayerPlayed] = useState(false)
  const [computerIsPlaying, setComputerIsPlaying] = useState(false)

  useEffect(() => {
    // console.log(board)
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
        // console.log(boardCopy)
        setBoard(boardCopy)
        setPlayerPlayed(false)
        setComputerIsPlaying(false)
      }, 2000);
    }

    // console.log(playerPlayed)

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
        {/* <Typography display={'flex'} variant={'h6'} justifyContent={'center'}>
          <strong>Classificação Algoritimo MLP: {MLP(board)}</strong>
        </Typography> */}
      </Grid>
    </Grid>
  );
}
