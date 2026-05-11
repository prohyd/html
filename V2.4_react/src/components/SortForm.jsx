import SelectSortForm from "./SelectSortForm";
import { forwardRef, useState } from "react";

const SortForm = forwardRef(({selectedOption, setSelectedOption, handleResetForms, dataTable, setDataTable, selectedCheckbox, setSelectedCheckbox}, ref) => {
  // const [selectedOption, setSelectedOption] = useState({'1' : "Нет", '2' : "Нет", '3' : "Нет"})

  const handleSelectChange = (field, value) => {
    if (value == 'Нет') {
      setSelectedOption(prev => {
        const newObj = Object.entries({...prev}).map(([index, val]) => (index >= field) && [index, "Нет"])
        console.log(Object.fromEntries(newObj))
        return Object.fromEntries(newObj)
      })
    }
    else {
      setSelectedOption(prev => {
      const newObj = {...prev}
      newObj[field] = value
      console.log(newObj)
      return newObj
    })
    }
  }

  const handleCheckboxChange = (itemId) => {
    setSelectedCheckbox(prev => {
      const newObj = {...prev}
      newObj[itemId] = (newObj[itemId] == 'asc') ? 'desc' : 'asc'
      console.log(newObj)
      return newObj
    })
  }

  // const handleResetSortForm = () => {
  //   setSelectedOption(prev => {
  //     const newObj = Object.entries({...prev}).map(([index, val]) => [index, "Нет"])
  //     console.log(Object.fromEntries(newObj))
  //     return Object.fromEntries(newObj)
  //   })
  // }

  const handleSubmit = (event) => {
    event.preventDefault()
  
    const numericFields = [
      'Высота',
      'Масса тела',
      'Продолжительность жизни'
    ]
  
    setDataTable([...dataTable].sort((a, b) => {
      let i = 1
  
      for (let rule of Object.entries(selectedOption)) {
        const field = rule[1]
        const direction = selectedCheckbox[String(i)]
  
        i += 1
  
        let comparison = 0
  
        if (field === 'Нет') {
          continue
        }
  
        if (numericFields.includes(field)) {
          const num1 = parseFloat(a[field])
          const num2 = parseFloat(b[field])
  
          if (num1 > num2) {
            comparison = direction === 'asc' ? 1 : -1
          }
          else if (num1 < num2) {
            comparison = direction === 'asc' ? -1 : 1
          }
        }
        else {
          comparison = a[field].localeCompare(b[field], 'ru')
  
          if (direction === 'desc') {
            comparison *= -1
          }
        }
  
        if (comparison !== 0) {
          return comparison
        }
      }
  
      return 0
    }))
  }

  return (
    <>
      <form id="sort" onReset={ handleResetForms } onSubmit={ handleSubmit } ref={ref} >
        <p> Сортировать по</p>
        <p>
          <SelectSortForm field="1" selectedOption={ selectedOption } onSelectChange={ handleSelectChange } />
          по убыванию? <input type="checkbox" id="fieldsFirstDesc" onChange={() => handleCheckboxChange('1')} />
        </p>
        <p>
          <SelectSortForm field='2' selectedOption={ selectedOption } onSelectChange={ handleSelectChange } />
          по убыванию? <input type="checkbox" id="fieldsSecondDesc" onChange={() => handleCheckboxChange('2')} />
        </p>
        <p>
          <SelectSortForm field='3' selectedOption={ selectedOption } onSelectChange={ handleSelectChange } />
          по убыванию? <input type="checkbox" id="fieldsThirdDesc" onChange={() => handleCheckboxChange('3')} />
        </p>
          <input type="submit" id="applySortButton" value="Сортировать"/>
          <input type="reset" value="Сбросить сортировку"/>
      </form>
    </>
  )
})

export default SortForm;