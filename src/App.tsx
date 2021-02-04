import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import quotes from './quotes.json';
import Typer from './Typer';

interface Quote {
  author: string
  quote: string
}

const styles = createStyles({
  root: {
    maxWidth: 512,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const useStyles = makeStyles(styles);

const getQuote: () => Quote = () => quotes[Math.floor(Math.random() * quotes.length)];

const App: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.root}>
    <Typer getParagraph={() => getQuote().quote} />
  </div>
}

export default App;
