import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import quotes from './quotes.json';
import Typer, { ParagraphCompleted } from './Typer';
import Statistics from './Statistics';
import StatisticsTable from './StatisticsTable';

interface Quote {
  author: string
  quote: string
}

const styles = ({spacing}: Theme) => createStyles({
  root: {
    maxWidth: 512,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: spacing(6)
  },
  title: {
    marginBottom: spacing(6)
  },
  typer: {
    marginBottom: spacing(4)
  }
});

const useStyles = makeStyles(styles);

const getQuote: () => Quote = () => quotes[Math.floor(Math.random() * quotes.length)];

const App: React.FC = () => {
  const classes = useStyles();
  const [stats, setStats] = useState<Array<Statistics>>([]);

  const handleParagraphCompleted = (event: ParagraphCompleted) => {
    setStats([event.stats, ...stats]);
  }

  return <div className={classes.root}>
    <div className={classes.typer}>
      <Typography className={classes.title} variant="h2">
        <b>Typer</b> typing trainer
      </Typography>
      <Typer
        getParagraph={() => getQuote().quote}
        onParagraphCompleted={handleParagraphCompleted}
      />
    </div>
    {stats.length > 0 && <StatisticsTable stats={stats} />}
  </div>
}

export default App;
