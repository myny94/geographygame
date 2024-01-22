import Select from 'react-select'
import { useEffect, useState } from 'react'
import { countryNames } from '../data/country-name'

type CountryAutocompleteProps = {
  OnResultReceived: (selectedCountry: string) => void
}

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debouncedValue
}

type CountryOption = {
  label: string
  value: string
}

function CountryAutocomplete({ OnResultReceived }: CountryAutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedVal = useDebounce(searchTerm, 500)

  useEffect(() => {}, [debouncedVal])

  const handleSelectionChange = (option: CountryOption | null) => {
    if (option) {
      setSearchTerm(option.label)
      OnResultReceived(option.value)
    }
  }

  return (
    <div>
      <Select
        styles={{
          control: provided => ({
            ...provided,
            cursor: 'pointer',
          }),
          menu: provided => ({
            ...provided,
            cursor: 'pointer',
            color: 'white',
            backgroundColor: '#1f2937',
          }),
          option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            maxHeight: '100px',
            backgroundColor: state.isSelected
              ? '#4a5568'
              : state.isFocused
              ? '#2d3748'
              : '#1a202c',
          }),
        }}
        onChange={e => handleSelectionChange(e)}
        options={countryNames.map(country => ({
          value: country,
          label: country,
        }))}
      />
    </div>
  )
}

export default CountryAutocomplete
