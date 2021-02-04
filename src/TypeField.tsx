import React, { useRef, useEffect, MutableRefObject } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  value: string,
  inputRef?: MutableRefObject<HTMLInputElement | undefined>,
  [x:string]: any;
};

const TypeField: React.FC<Props> = ({ value, inputRef, ...rest }) => {
  const _inputRef = useRef<HTMLInputElement>()
  inputRef = inputRef || _inputRef

  const handleSelect = () => {
    if (inputRef?.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(value.length, value.length);
      inputRef.current.scrollLeft = 9999999;
    }
  }

  // Automatically focus the input element.
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }, [value, inputRef])

  return (
    <TextField
      label={value ? null : 'start typing when ready ...'}
      variant="outlined"
      autoFocus
      inputRef={inputRef}
      value={value}
      onSelect={handleSelect}
      {...rest}
    />
  )
};

export default TypeField;
