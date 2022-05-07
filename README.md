# Simple React Multiple Select

Multiple select React component with "type to search" feature.
It can handle thousands of data (up to 5000 records) synchronously with minimum latency.

There are cool & amazing packages out there,
but I found it laggy when handling thousands of data synchronously.
So I made this for my needs.

Hope it can be useful too for your needs.

## Install

Install using:
`yarn add rr-multi-select`
or `npm install rr-multi-select`


## Usage

##### 1. Simple array

```javascript
import React, {useState} from 'react'
import RRMultiSelect from 'rr-multi-select'

const options = [
  "Data 1",
  "Data 2",
  "Data 3"
]

const FormBlock = () => {

  const [value,setValue] = useState([])

  return (
    <RRMultiSelect
      options={options}
      value={value}
      onChange={setValue}
    />
  )
}
export default FormBlock
```

##### 2. Array of objects

```javascript
import React, {useState} from 'react'
import RRMultiSelect from 'rr-multi-select'

const options = [
  {value:"data1",label:"Data 1"},
  {value:"data2",label:"Data 2"},
  {value:"data3",label:"Data 3"}
]

const FormBlock = () => {

  const [value,setValue] = useState([])

  return (
    <RRMultiSelect
      options={options}
      isObject={["value","label"]}
      value={value}
      onChange={setValue}
    />
  )
}
export default FormBlock
```

### Props

| Name                  | Description      
| -----------           | -----------      
| options                  | Array
| isObject              | Array ie. ["value","label"]             
| value                 | Array
| placeholderText       | String ie. "Select..."                        
| inputPlaceholder      | String ie. "Type to search..."        
| onChange              | Function         
