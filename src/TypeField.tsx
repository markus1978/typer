import React, { SyntheticEvent, KeyboardEvent, useState, useRef, useLayoutEffect, useEffect } from 'react';
import { createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core';

const styles = ({spacing}: Theme) => createStyles({
  root: {
    maxWidth: 512
  },
  input: {
    width: '100%'
  },
  text: {
    whiteSpace: 'pre-wrap',
    overflowY: 'scroll',
    padding: 1,
    height: 250,
    marginBottom: spacing(2)
  },
  done: {
    color: 'green'
  },
  typed: {
    color: 'red',
  },
  left: {
    borderLeft: '1px solid black',
    marginLeft: -1
  }
});

const useStyles = makeStyles(styles);

export interface Type {
  typed: string
  typedCharacter: string
  expectedCharacter: string
  correct: boolean
}

interface Props {
  text: string
  typed?: string
  onType?: (type: Type) => void
};

const TypeField: React.FC<Props> = ({ text, typed, onType }) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>(typed || '')
  const inputEl = useRef<HTMLInputElement>(null)
  const textEl = useRef<HTMLDivElement>(null)
  const leftEl = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setValue(typed || '');
  }, [typed, setValue])

  const handleSelect = (event: SyntheticEvent<HTMLInputElement>) => {
    if (inputEl?.current) {
      inputEl.current.focus();
      inputEl.current.setSelectionRange(value.length, value.length);
      inputEl.current.scrollLeft = 9999999;
    }
  }

  const handleChange = (event: React.ChangeEvent<{value: string}>) => {
    const value = event.target.value;
    setValue(value)
  }

  let commonUntilIndex = 0
  for (let i = 1; i <= text.length; i++) {
    if (value[i - 1] === text[i - 1]) {
      commonUntilIndex = i
    } else {
      break
    }
  }

  const position = commonUntilIndex

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (onType) {
      const typed = String.fromCharCode(event.charCode)
      const expected = text.slice(position, position + 1)

      onType({
        typed: value,
        typedCharacter: typed,
        expectedCharacter: expected,
        correct: typed === expected
      })
    }
  }

  useLayoutEffect(() => {
    if (textEl?.current && leftEl?.current) {
      textEl.current.scrollTop =
        + leftEl.current.offsetTop
        - textEl.current.offsetTop
        - (textEl.current.clientHeight * 0.3)
    }
  }, [value, text, textEl, leftEl])

  useEffect(() => {
    if (inputEl?.current) {
      inputEl.current.focus()
    }
  }, [typed])

  return (
    <div className={classes.root}>
      <div className={classes.text} ref={textEl}>
        <Typography>
          <span className={classes.done}>
            {text.slice(0, position)}
          </span>
          <span className={classes.typed}>
            {value.slice(position)}
          </span>
          <span className={classes.left} ref={leftEl}>
            {text.slice(position)}
          </span>
        </Typography>
      </div>
      <TextField
        label={value ? null : 'start typing when ready ...'}
        className={classes.input}
        variant="outlined"
        autoFocus
        inputRef={inputEl}
        value={value}
        onChange={handleChange} onSelect={handleSelect} onKeyPress={handleKeyPress}
      />
    </div>
  )
};

export default TypeField;
