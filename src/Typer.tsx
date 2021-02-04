import React, { KeyboardEvent, useState, useRef, useLayoutEffect } from 'react';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import TypeParapraph, { commonPosition } from './TypeParapraph';
import TypeField from './TypeField';
import Statistics from './Statistics';

const styles = ({spacing}: Theme) => createStyles({
  root: {
    width: '100%',
    height: 300,
    display: 'flex',
    flexDirection: 'column'
  },
  stats: {
    marginBottom: spacing(2),
  },
  text: {
    flexGrow: 1,
    overflowY: 'scroll',
    marginBottom: spacing(2)
  },
  input: {
    width: '100%'
  }
});

const useStyles = makeStyles(styles);

interface ParagraphCompleted {
  stats: Statistics
  text: string
}

interface Props {
   getParagraph: () => string;
   onParagraphCompleted?: (event: ParagraphCompleted) => void;
}

const nextParagraphs = (paragraphs: Array<string>, getParagraph: () => string) => [
  ...paragraphs.slice(1),
  getParagraph()
]

const Typer: React.FC<Props> = ({ getParagraph, onParagraphCompleted }) => {
  const classes = useStyles();
  const [paragraphs, setParagraphs] = useState<Array<string>>(Array.from({length: 10}, getParagraph));
  const [value, setValue] = useState<string>('');
  const textEl = useRef<HTMLDivElement>(null);
  const leftEl = useRef<HTMLSpanElement>(null);

  const stats = useRef<Statistics>(new Statistics());

  const currentText = paragraphs[0]
  const position = commonPosition(currentText, value)

  const handleChange = (event: React.ChangeEvent<{value: string}>) => {
    const value = event.target.value;
    if (value.trim() === currentText.trim()) {
      setParagraphs(nextParagraphs(paragraphs, getParagraph))
      setValue('')
      if (onParagraphCompleted) {
        onParagraphCompleted({
          stats: stats.current,
          text: currentText
        })
      }
      stats.current = new Statistics(stats.current.end)
    } else {
      setValue(value)
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const typed = String.fromCharCode(event.charCode)
    const expected = currentText.slice(position, position + 1)
    stats.current.addStroke(typed, typed === expected);
  }

  // Auto scroll the text (in case it is not fully displayed anyways)
  useLayoutEffect(() => {
    if (textEl?.current && leftEl?.current) {
      textEl.current.scrollTop =
        + leftEl.current.offsetTop
        - textEl.current.offsetTop
        - (textEl.current.clientHeight * 0.3)
    }
  }, [textEl, leftEl])

  return (
    <div className={classes.root}>
      <div className={classes.stats}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography>{(stats.current.accuracy * 100).toFixed(1)} accuracy</Typography>
          <Typography>{stats.current.wordsPerMinute.toFixed(1)} words/minute</Typography>
          <Typography>{stats.current.hitsPerMinute.toFixed(1)} hits/minute</Typography>
        </Box>
      </div>
      <div className={classes.text} ref={textEl}>
        <TypeParapraph text={currentText} typed={value} cursorRef={leftEl} />
        {paragraphs.slice(1).map((paragraph, index) => <TypeParapraph key={index} text={paragraph} />)}
      </div>
      <div className={classes.input}>
        <TypeField
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          fullWidth
        />
      </div>
    </div>
  )
};

export default Typer;
