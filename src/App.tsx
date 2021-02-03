import React, { useEffect, useState } from 'react';
import TypeField, { Type } from './TypeField';
import { Box, Button, createStyles, makeStyles, Typography } from '@material-ui/core';

interface Stats {
  start: number | null,
  typedCharacters: number,
  words: number,
  correctlyTypedCharacters: number
}

const styles = createStyles({
  root: {
    maxWidth: 512,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const useStyles = makeStyles(styles);

const App: React.FC = () => {
  const classes = useStyles();
  const text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'.trim()

  const [stats, setStats] = useState<Stats>({
    start: null,
    typedCharacters: 0,
    correctlyTypedCharacters: 0,
    words: 0
  });
  const [typed, setTyped] = useState('');
  const [time, setTime] = useState(0);

  const handleType = (type: Type) => {
    setTyped(type.typed);
    setStats({
      start: stats.start || time,
      typedCharacters: stats.typedCharacters + 1,
      correctlyTypedCharacters: stats.correctlyTypedCharacters + (type.correct ? 1 : 0),
      words: stats.words + (type.typedCharacter === ' ' && type.correct ? 1 : 0)
    })
  }

  const handleReset = () => {
    console.log('reset')
    setTyped('')
    setStats({
      start: null,
      typedCharacters: 0,
      correctlyTypedCharacters: 0,
      words: 0
    })
  }

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date().getTime()), 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [setTime])

  const durationSeconds = stats.start ? (time - stats.start) / 1000.0 : 0;
  const durationMinutes = durationSeconds / 60.0;

  const perMinute = (value: number) => durationMinutes > 0
    ? (value / durationMinutes).toFixed(1)
    : '0'

  return <div className={classes.root}>
    <Box
      component="div" display="flex" flexDirection="row"
      marginBottom={3} alignItems="center" justifyContent="space-between"
    >
      <Typography>{stats.typedCharacters > 0
        ? (stats.correctlyTypedCharacters * 100 / stats.typedCharacters).toFixed(0)
        : 100
      }%</Typography>
      <Typography>{perMinute(stats.correctlyTypedCharacters)} hits/minute</Typography>
      <Typography>{perMinute(stats.words)} words/minute</Typography>
      <Typography>{durationSeconds.toFixed(0)}s</Typography>
      <Button size="small" variant="contained" onClick={handleReset}>reset</Button>
    </Box>
    <TypeField
      text={text} typed={typed}
      onType={handleType}
    />
  </div>
}

export default App;
