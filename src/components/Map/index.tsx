import { useGame } from 'context/gameContext'
import React, { useState } from 'react'

const Map = () => {
  const { widthMap, lengthMap, mountains } = useGame()

  return (
    <div>
      <div>La map est composé de :</div>
      <div>{`${widthMap} cases en largeur`}</div>
      <div>{`${lengthMap} cases en longueur`}</div>
      <div>{`${mountains} montagnes`}</div>
    </div>
  )
}

export default Map
