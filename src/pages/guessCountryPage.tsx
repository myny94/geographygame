import { useEffect, useState } from 'react'
import GeoSVG from '../components/GeoSVG'
import { askForHint, sendAnswerToServer, startGame } from '../utils/eventHandler'
import { ServerEvent } from '../types'
import { set } from 'zod'

function GuessCountryPage() {
  const [questionId, setQuestionId] = useState<string>('')
  const [geoUrl, setGeoUrl] = useState<string>('')
  const [countryInput, setCountryInput] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleServerEvent = (serverEvent: ServerEvent) => {
    switch (serverEvent.type) {
      case 'end_game':
        // return to start page
        setMessage('Game over!')
        break
      case 'question':
        setQuestionId(serverEvent.questionId)
        setGeoUrl(serverEvent.geoImageUrl)
        setMessage('')
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
      answer: countryInput,
      questionId: questionId,
    })
    handleServerEvent(response)
    setCountryInput('')
  }
  
  const askHint = async () => {
    const response = await askForHint({
      questionId: questionId
    })
    handleServerEvent(response)
  }
  return (
    <>
      <div className="align-center">
        <div className="text-center m-2">Guess the country</div>
        {questionId && <GeoSVG geoURL={geoUrl} />}
        <div className="mx-4 flex space-x-4">
          <input
            type="text"
            id="country_input"
            value={countryInput}
            className="text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
            placeholder="Type the country name"
            onChange={e => setCountryInput(e.target.value)}
            onKeyUp={e => {
              if (e.key === 'Enter') submitAnswer()
            }}
            required
          ></input>
          <button
            type="button"
            className="text-white focus:ring-2 rounded-lg text-sm p-3 py-2 dark:bg-gray-800 dark:hover:bg-gray-600"
            onClick={submitAnswer}
          >
            Guess
          </button>
          <button
            type="button"
            className="text-white focus:ring-2 rounded-lg text-sm p-3 py-2 dark:bg-gray-800 dark:hover:bg-gray-600"
            onClick={askHint}
          >
            ask for hint
          </button>
        </div>
        <div className="flex justify-center items-center">{message}</div>
      </div>
    </>
  )
}

export default GuessCountryPage
