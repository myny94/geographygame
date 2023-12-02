import { ClientEvent, ServerEvent, ServerEventSchema } from '../types'

export const generateRandomCountry = () => {
  const countryId = fetch('http://localhost:8080/country')
    .then(response => response.json())
    .then(data => data.countryId as string)
  return countryId
}
export const getCountryName = (countryId: string) => {
  const countryName = fetch(`http://localhost:8080/names/${countryId}`)
    .then(response => response.json())
    .then(data => data.countryName)
  return countryName
}

export const validateClientEvent = (x: ClientEvent) => x

export const sendAnswerToServer = ({
  answer,
  questionId,
}: {
  answer: string
  questionId: string
}) => {
  const serverResponse = fetch('http://localhost:8080/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      validateClientEvent({
        type: 'answer',
        answer: answer,
        questionId: questionId,
      })
    ),
  })
    .then(response => response.json())
    .then(data => ServerEventSchema.parse(data))
  return serverResponse
}

export const startGame = () => {
  const serverResponse = fetch('http://localhost:8080/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      validateClientEvent({
        type: 'start',
        nickname: 'test-user',
      })
    ),
  })
    .then(response => response.json())
    .then(data => ServerEventSchema.parse(data))
  return serverResponse
}
