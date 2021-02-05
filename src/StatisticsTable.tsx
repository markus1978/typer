import React from 'react';
import { createStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';
import Statistics from "./Statistics";

const styles = ({palette}: Theme) => createStyles({
  up: {
    color: palette.success.main
  },
  down: {
    color: palette.error.main
  }
});

const useStyles = makeStyles(styles);

interface ValueProps {
  getValue: (stats: Statistics) => number
  formatValue: (value: number) => string
  current: Statistics
  last?: Statistics
}

const Value: React.FC<ValueProps> = ({getValue, formatValue, current, last}) => {
  const classes = useStyles()
  const value = getValue(current)
  let className: string | undefined = undefined
  if (last)
    if (getValue(last) - value <= 0) {
      className = classes.up
    } else {
      className = classes.down
    }
  return <span className={className}>
    {formatValue(value)}
  </span>
};

interface Props {
  stats: Array<Statistics>
}

const StatisticsTable: React.FC<Props> = ({stats}) => {
  return <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>characters</TableCell>
          <TableCell align="right">accuracy</TableCell>
          <TableCell align="right">hits/minute</TableCell>
          <TableCell align="right">words/minute</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.slice(0, 10).map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.hits.toFixed(0)}</TableCell>
            <TableCell align="right">
              <Value
                getValue={(stats) => stats.accuracy}
                formatValue={(value) => (value * 100).toFixed(1) + '%'}
                current={row} last={stats[index + 1]}
              />
            </TableCell>
            <TableCell align="right">
              <Value
                getValue={(stats) => stats.hitsPerMinute}
                formatValue={(value) => value.toFixed(1)}
                current={row} last={stats[index + 1]}
              />
            </TableCell>
            <TableCell align="right">
              <Value
                getValue={(stats) => stats.wordsPerMinute}
                formatValue={(value) => value.toFixed(1)}
                current={row} last={stats[index + 1]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
};

export default StatisticsTable;