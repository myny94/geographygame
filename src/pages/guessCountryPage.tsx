import { useEffect, useState } from 'react'
import GeoSVG from '../components/GeoSVG'
import {
  askForHint,
  sendAnswerToServer,
  startGame,
} from '../utils/eventHandler'
import { ServerEvent } from '../types'
import { TipsAndUpdates } from '@mui/icons-material'
import CountryAutocomplete from '../components/CountryAutocomplete'

function GuessCountryPage() {
  const [questionId, setQuestionId] = useState<string>('')
  const [geoUrl, setGeoUrl] = useState<string>('')
  const [countryGuess, setCountryGuess] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [remaningLives, setRemaningLives] = useState<number>(0)

  const handleServerEvent = (serverEvent: ServerEvent) => {
    switch (serverEvent.type) {
      case 'end_game':
        // return to start page
        setMessage('Game over!')
        break
      case 'wrong_answer':
        setRemaningLives(serverEvent.remainingLives)
        break
      case 'question':
        setQuestionId(serverEvent.questionId)
        setGeoUrl(serverEvent.geoImageUrl)
        setMessage('')
        setRemaningLives(serverEvent.remainingLives)
        break
      case 'give_hint':
        setMessage(serverEvent.hint)
        break
    }
  }

  useEffect(() => {
    setMessage('')
    const initializeGame = async () => {
      const response = await startGame()
      handleServerEvent(response)
    }
    initializeGame()
  }, [])

  const submitAnswer = async () => {
    const response = await sendAnswerToServer({
      answer: countryGuess,
      questionId: questionId,
    })
    handleServerEvent(response)
    setCountryGuess('')
  }

  const askHint = async () => {
    const response = await askForHint({
      questionId: questionId,
    })
    handleServerEvent(response)
  }

  const showNextQuestion = async () => {
    const response = await startGame()
    handleServerEvent(response)
  }

  return (
    <>
      <div className="align-center">
        <div className="text-center m-2">Guess the country</div>
        {questionId && <GeoSVG geoURL={geoUrl} />}
        <div className="flex space-x-2 w-full mx-auto max-w-screen-sm justify-center">
          <div className="flex-auto mr-3">
            <CountryAutocomplete
              OnResultReceived={country => setCountryGuess(country)}
            />
          </div>
          <button
            type="button"
            className="text-white focus:ring-2 rounded-lg text-sm p-2 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={submitAnswer}
          >
            Guess
          </button>
          <button
            type="button"
            className="text-white rounded-lg text-sm p-2 dark:bg-gray-800 dark:hover:bg-gray-600"
            onClick={askHint}
          >
            <TipsAndUpdates></TipsAndUpdates>
          </button>
          <button
            type="button"
            className="w-16 text-white focus:ring-2 rounded-lg text-sm p-3 py-2 dark:bg-gray-800 dark:hover:bg-gray-600"
            onClick={showNextQuestion}
          >
            next
          </button>
        </div>
        <div className="flex justify-center items-center">{message}</div>
        <div className="flex justify-center items-center">
          remaining lives: {remaningLives}
        </div>
      </div>
    </>
  )
}

export default GuessCountryPage
