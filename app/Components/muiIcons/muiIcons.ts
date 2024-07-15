"use client";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import ForumIcon from "@mui/icons-material/Forum";
import LanguageIcon from "@mui/icons-material/Language";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StorageIcon from "@mui/icons-material/Storage";
import TryIcon from "@mui/icons-material/Try";
import UpdateIcon from "@mui/icons-material/Update";
import BusinessIcon from "@mui/icons-material/Business";
import TerminalIcon from "@mui/icons-material/Terminal";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InsightsIcon from "@mui/icons-material/Insights";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ScoreIcon from "@mui/icons-material/Score";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LinkIcon from "@mui/icons-material/Link";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NodeRedIcon from "../Icons/NodeRedIcon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Backdrop,
  CardMedia,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Autocomplete from "@mui/material/Autocomplete";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, FormControlLabel } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import Switch from "@mui/material/Switch";
import { makeStyles } from "@mui/styles";
import { borderRadius, margin, padding, styled, textAlign } from "@mui/system";
import Tab from "@mui/material/Tab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DoneIcon from "@mui/icons-material/Done";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";
import SendIcon from "@mui/icons-material/Send";
import ToggleButton from "@mui/material/ToggleButton";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";

import CircularProgress from "@mui/material/CircularProgress";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import SaveIcon from "@mui/icons-material/Save";
import Add from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
// import { AccordionSlots } from "@mui/material/Accordion";
import Fade from "@mui/material/Fade";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { Checkbox } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ReplyAllRoundedIcon from "@mui/icons-material/ReplyAllRounded";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";

export {
  ClearRoundedIcon,
  BookmarkBorderRoundedIcon,
  ChatBubbleOutlineRoundedIcon,
  RepeatRoundedIcon,
  FavoriteBorderRoundedIcon,
  ThumbUpAltRoundedIcon,
  ReplyAllRoundedIcon,
  ModeCommentRoundedIcon,
  Person2RoundedIcon,
  // AccordionSlots,
  Checkbox,
  PortraitRoundedIcon,
  Fade,
  FavoriteRoundedIcon,
  InsertCommentRoundedIcon,
  ReplyRoundedIcon,
  SendRoundedIcon,
  tableCellClasses,
  FormatColorFillIcon,
  ToggleButton,
  Collapse,
  Divider,
  Drawer,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Grid,
  TextField,
  Autocomplete,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  FormControlLabel,
  LoadingButton,
  Switch,
  makeStyles,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TabContext,
  TabList,
  TabPanel,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Tab,
  CardMedia,
  CircularProgress,
  SpeedDial,
  SpeedDialAction,
  TableCell,
  TablePagination,
  Backdrop,

  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  WifiCalling3Icon,
  DeleteOutlineIcon,
  Add,
  DescriptionOutlinedIcon,
  SpellcheckIcon,
  SaveIcon,
  DoneIcon,
  FeedOutlinedIcon,
  InsertDriveFileOutlinedIcon,
  KeyboardArrowDownOutlinedIcon,
  RestorePageOutlinedIcon,
  SendIcon,
  SpeedDialIcon,
  PlayCircleIcon,
  ExpandMoreIcon,
  Box,
  padding,
  textAlign,
  DeleteIcon,
  CloseIcon,
  DeleteOutlinedIcon,
  DownloadOutlinedIcon,
  EditOutlinedIcon,
  VisibilityOutlinedIcon,
  ExpandLess,
  ExpandMore,
  AllInboxIcon,
  AnalyticsIcon,
  Brightness4Icon,
  Brightness7Icon,
  DashboardIcon,
  EditIcon,
  ForumIcon,
  LanguageIcon,
  MailIcon,
  MenuIcon,
  InboxIcon,
  StorageIcon,
  TryIcon,
  UpdateIcon,
  BusinessIcon,
  TerminalIcon,
  AutoGraphIcon,
  AccountTreeIcon,
  PersonSearchIcon,
  ScoreboardIcon,
  OpenInNewIcon,
  InsightsIcon,
  PeopleAltIcon,
  LightbulbIcon,
  LeaderboardIcon,
  ScoreIcon,
  ChatBubbleIcon,
  LinkIcon,
  PersonIcon,
  SettingsIcon,
  GroupAddIcon,
  NodeRedIcon,
  ContentCopyOutlinedIcon,
};
