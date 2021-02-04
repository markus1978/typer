import React, { Ref, memo } from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

export const commonPosition = (text: string, value: string) => {
  let commonUntilIndex = 0
  for (let i = 1; i <= text.length; i++) {
    if (value[i - 1] === text[i - 1]) {
      commonUntilIndex = i
    } else {
      break
    }
  }
  return commonUntilIndex
}

const styles = ({palette, spacing}: Theme) => createStyles({
  root: {
    whiteSpace: 'pre-wrap',
    paddingLeft: 1,
    marginBottom: spacing(1)
  },
  done: {
    color: palette.text.primary
  },
  typed: {
    color: palette.error.main,
    textDecoration: 'underline'
  },
  left: {
    borderLeft: '1px solid black',
    marginLeft: -1,
    color: palette.grey[600]
  },
  next: {
    color: palette.grey[600]
  }
});

const useStyles = makeStyles(styles);

interface Props {
  /** The main text that users ought to type. */
  text: string
  /** The text that the user already typed. */
  typed?: string
  /** The reference for the element that displays the cursor on its left side. */
  cursorRef?: Ref<HTMLSpanElement>
};

const TypeParagraph: React.FC<Props> = ({ text, typed, cursorRef }) => {
  const classes = useStyles();

  if (typed || typed === '') {
    const position = commonPosition(text, typed);
    return <Typography className={classes.root}>
      <span className={classes.done}>
        {text.slice(0, position)}
      </span>
      <span className={classes.typed}>
        {typed.slice(position).replaceAll(' ', '·')}
      </span>
      <span className={classes.left} ref={cursorRef}>
        {text.slice(position).replaceAll(' ', '·\u200B')}
      </span>
    </Typography>
  } else {
    return <Typography className={classes.root}>
      <span className={classes.next}>
        {text.replaceAll(' ', '·\u200B')}
      </span>
    </Typography>
  }
};

export default memo(TypeParagraph);
