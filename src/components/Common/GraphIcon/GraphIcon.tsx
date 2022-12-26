import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import CloudIcon from '@mui/icons-material/Cloud';
import React from 'react';
import { GraphType } from '../../../types/graph.types';

export const GraphIcon: Record<GraphType, React.ComponentType<any>> = {
    pie: PieChartIcon,
    column: LeaderboardIcon,
    line: ShowChartIcon,
    table: TableChartIcon,
    wordcloud: CloudIcon,
};