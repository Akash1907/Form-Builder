"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useContext, useMemo, useState, lazy, useCallback } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Contexts/themeContext";

import {
  Collapse,
  Divider,
  Drawer,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
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
  Tooltip,
  Avatar,



  
} from "../muiIcons/muiIcons";

import Image from "next/image";
import { Logout } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';

const DrawerJSON = [
  {
    text: "Dashboard",
    icon: "DashboardIcon",
    path: "/dashboard",
  },
  {
    text: "Analytics",
    icon: "AnalyticsIcon",
    path: "/analytics",
  },
  {
    text: "Quiz",
    icon: "AnalyticsIcon",
    path: "/quiz",
  },
  {
    text: "Barista",
    icon: "AnalyticsIcon",
    path: "/barista",
  },
  {
    text: "UI Schema Creator",
    icon: "AnalyticsIcon",
    path: "/uischemaCreator",
  },
  {
    text: "Service Page",
    icon: "AnalyticsIcon",
    path: "/servicepage",
  },
  
  {
    text: "Voice360",
    icon: "AutoGraphIcon",
    children: [
      {
        text: "Insights",
        icon: "LightbulbIcon",
        path: "/quality-analysis/insights",
      },
      {
        text: "Interaction",
        icon: "PeopleAltIcon",
        path: "/quality-analysis/interaction",
      },
      {
        text: "Leader-Board",
        icon: "LeaderboardIcon",
        path: "/quality-analysis/leader-board",
      },
      {
        text: "Analyze",
        icon: "ScoreIcon",
        path: "/quality-analysis/analyze",
      },
      {
        text: "Moments",
        icon: "ChatBubbleIcon",
        path: "/quality-analysis/moments",
      },
      {
        text: "Coaching",
        icon: "LinkIcon",
        path: "/quality-analysis/coaching",
      },
      {
        text: "Agent Cues",
        icon: "PersonIcon",
        path: "/quality-analysis/agent-cues",
      },
      {
        text: "Setting",
        icon: "SettingsIcon",
        path: "/quality-analysis/setting",
      },
    ],
  },
  {
    "text": "Social 360",
    "icon": "PublicRoundedIcon",
    "children": [
     
      {
        "text": "Social Network",
        "icon": "MessageRoundedIcon",
        "path": "/social360/connectWithUs"
      },
      {
        "text": "Interaction",
        "icon": "PeopleAltIcon",
        "path": "/social360/interaction"
      },
      {
        "text": "Leader-Board",
        "icon": "LeaderboardIcon",
        "path": "/social360/leader-board"
      },
      {
        "text": "Analyze",
        "icon": "ScoreIcon",
        "path": "/social360/analyze"
      },
      {
        "text": "Moments",
        "icon": "ChatBubbleIcon",
        "path": "/social360/moments"
      },
      {
        "text": "Coaching",
        "icon": "LinkIcon",
        "path": "/social360/coaching"
      },
      {
        "text": "Agent Cues",
        "icon": "PersonIcon",
        "path": "/social360/agent-cues"
      },
      {
        "text": "Setting",
        "icon": "SettingsIcon",
        "path": "/social360/setting"
      }
    ]
  },
  {
    text: "Conversation AI",
    icon: "ForumIcon",
    children: [
      {
        text: "DM",
        icon: "TryIcon",
        path: "https://dialogue-manager.vercel.app/dialogue-manager",
      },
      {
        text: "Intent",
        icon: "AccountTreeIcon",
        path: "/conversation-ai/intent",
      },
      {
        text: "NER",
        icon: "PersonSearchIcon",
        path: "/conversation-ai/ner",
      },
      {
        text: "Scorer",
        icon: "ScoreboardIcon",
        path: "/conversation-ai/scorer",
      },
    ],
  },
  {
    text: "User Management",
    icon: "GroupAddIcon",
    children: [
      {
        text: "Manage Roles",
        icon: "AccountTreeIcon",
        path: "/user-management/manage-role",
      },
      {
        text: "Data Source",
        icon: "AccountTreeIcon",
        path: "/user-management/datasource",
      },
      {
        text: "Manage Permissions",
        icon: "AccountTreeIcon",
        path: "/user-management/manage-permission",
      },
      {
        text: "Manage Menus",
        icon: "AccountTreeIcon",
        path: "/user-management/manage-menu",
      },
    ],
  },
  {
    text: "Dialog Manager",
    icon: "AutoGraphIcon",
    children: [
      {
        text: "Dialogue Manager v2",
        icon: "ForumIcon",
        path: "/dialog-manager/dialoguemanager2",
      },
      {
        text: "Workflow",
        icon: "AccountTreeIcon",
        path: "/dialog-manager/workflow",
      },
      {
        text: "Update and Encode",
        icon: "UpdateIcon",
        path: "/dialog-manager/updateAndEncode",
      },
      {
        text: "Store Conversation",
        icon: "AllInboxIcon",
        path: "/dialog-manager/StoreConversation",
      },
      {
        text: "Node Red",
        icon: "NodeRedIcon",
        path: "/dialog-manager/NodeRed",
      },
      {
        text: "Execute flow",
        icon: "AllInboxIcon",
        path: "/dialog-manager/executeflow",
      },
    ],
  },
];

type IconMapType = {
  [key: string]: React.ComponentType | undefined;
};

const iconMap: IconMapType = {
  InboxIcon: InboxIcon,
  MailIcon: MailIcon,
  MenuIcon: MenuIcon,
  TryIcon: TryIcon,
  UpdateIcon: UpdateIcon,
  AllInboxIcon: AllInboxIcon,
  ForumIcon: ForumIcon,
  DashboardIcon: DashboardIcon,
  AnalyticsIcon: AnalyticsIcon,
  EditIcon: EditIcon,
  StorageIcon: StorageIcon,
  TerminalIcon: TerminalIcon,
  AutoGraphIcon: AutoGraphIcon,
  AccountTreeIcon: AccountTreeIcon,
  PersonSearchIcon: PersonSearchIcon,
  ScoreboardIcon: ScoreboardIcon,
  InsightsIcon: InsightsIcon,
  LightbulbIcon: LightbulbIcon,
  LeaderboardIcon: LeaderboardIcon,
  ScoreIcon: ScoreIcon,
  ChatBubbleIcon: ChatBubbleIcon,
  LinkIcon: LinkIcon,
  PeopleAltIcon: PeopleAltIcon,
  PersonIcon: PersonIcon,
  SettingsIcon: SettingsIcon,
  GroupAddIcon: GroupAddIcon,
  NodeRedIcon: NodeRedIcon,
  PublicRoundedIcon:PublicRoundedIcon,
  MessageRoundedIcon:MessageRoundedIcon
};

export default function DrawerComponent() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(false);
  const colorMode = useContext(ThemeContext);
  const isDarkMode = theme.palette.mode === "dark";
  const [openCompanySwitch, setOpenCompanySwitch] = useState(false);
  const [companyAnchor, setCompanyAnchor] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(0);
  const companyOptions = [
    "ICCS",
    "HDFC",
    "Eastman",
    "Tata Steel",
    "TCS",
    "Wipro",
  ];

  // State for the language switch
  const [openLanguageSwitch, setOpenLanguageSwitch] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const languageOptions = [
    { title: "Assamese অসমীয়া", const: "as" },
    { title: "Bengali বাংলা", const: "bn" },
    { title: "English", const: "en" },
    { title: "Gujarati ગુજરાતી", const: "gu" },
    { title: "Hindi हिंदी", const: "hi" },
    { title: "Kannada ಕನ್ನಡ", const: "kn" },
    { title: "Maithili मैथिली", const: "mai" },
    { title: "Malayalam മലയാളം", const: "ml" },
    { title: "Marathi मराठी", const: "mr" },
    { title: "Meitei মৈতৈলোন্", const: "mni" },
    { title: "Odia ଓଡ଼ିଆ", const: "or" },
    { title: "Punjabi ਪੰਜਾਬੀ", const: "pa" },
    { title: "Sanskrit संस्कृतम्", const: "sa" },
    { title: "Tamil தமிழ்", const: "ta" },
    { title: "Telugu తెలుగు", const: "te" },
    { title: "Urdu اُردُو", const: "ur" },
  ];

  const handleCompanySwitch = (event: { currentTarget: any }) => {
    setOpenCompanySwitch(true);
    setCompanyAnchor(event.currentTarget);
  };

  const handleCompanySwitchClose = () => {
    setOpenCompanySwitch(false);
  };

  const handleCompanyMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: React.SetStateAction<number>
  ) => {
    setSelectedCompany(index);
    setOpenCompanySwitch(false);
  };

  const handleLanguageSwitch = (event: { currentTarget: any }) => {
    setOpenLanguageSwitch(true);
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageSwitchClose = () => {
    setOpenLanguageSwitch(false);
  };

  const handleLanguageMenuItemClick = (langConst: any) => {
    setSelectedLanguage(langConst);

    setOpenLanguageSwitch(false);
  };

  const handleToggle = useCallback((text: string) => {
    setExpandedItem((prevExpandedItem) =>
      prevExpandedItem === text ? null : text
    );
  }, []);

  const currentPage = useMemo(() => {
    const path = pathname.split("#")[0].split("?")[0];
    const findItem = (items: any[], path: string): any => {
      for (const item of items) {
        if (item.path === path) {
          return item;
        }
        if (item.children) {
          const found = findItem(item.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    const currentItem = findItem(DrawerJSON, path);
    return {
      title: currentItem ? currentItem.text : "Dashboard",
      icon: currentItem
        ? React.createElement(iconMap[currentItem.icon] as any, {
            fontSize: "large",
            style: { marginInlineEnd: "1rem" },
          })
        : null,
    };
  }, [pathname]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

 
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut=()=>{
    window.location.href = "/login";
    setAnchorEl(null);
  }

  const companySwitch = (type?: string) => (
    <>
      {type === "mobile" ? (
        <ListItem disablePadding>
          <ListItemButton
            sx={{ borderRadius: "12px" }}
            onClick={handleCompanySwitch}
          >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Switch Company" />
          </ListItemButton>
        </ListItem>
      ) : (
        <Button
          id="company-button"
          aria-controls={openCompanySwitch ? "company-menu" : undefined}
          aria-haspopup="true"
          variant="contained"
          aria-expanded={openCompanySwitch ? "true" : undefined}
          onClick={handleCompanySwitch}
        >
          Company Switch
        </Button>
      )}
      <Menu
        id="company-menu"
        anchorEl={companyAnchor}
        open={openCompanySwitch}
        onClose={handleCompanySwitchClose}
      >
        {companyOptions.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedCompany}
            onClick={(event) => handleCompanyMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  /* Language Switch Button and Menu */

  const languageSwitch = (type?: string) => (
    <div>
      {type === "mobile" ? (
        <ListItem disablePadding>
          <ListItemButton
            sx={{ borderRadius: "12px" }}
            onClick={handleLanguageSwitch}
          >
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Change Language" />
          </ListItemButton>
        </ListItem>
      ) : (
        <Button
          id="language-button"
          aria-controls={openLanguageSwitch ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openLanguageSwitch ? "true" : undefined}
          onClick={handleLanguageSwitch}
        >
          <LanguageIcon />
        </Button>
      )}
      <Menu
        id="language-menu"
        anchorEl={languageAnchor}
        open={openLanguageSwitch}
        onClose={handleLanguageSwitchClose}
      >
        {languageOptions.map((option, index) => (
          <MenuItem
            key={option.const}
            selected={index === selectedLanguage}
            onClick={() => handleLanguageMenuItemClick(option.const)}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );

  const renderListItem = (item: any) => (
    <div key={item.text}>
      {item.children ? (
        <>
          <ListItemButton
            onClick={() => handleToggle(item.text)}
            sx={{ borderRadius: "12px" }}
          >
            <ListItemIcon>
              {iconMap[item.icon] && React.createElement(iconMap[item.icon]!)}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            {expandedItem === item.text ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={expandedItem === item.text}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {item.children.map((child: any) => renderListItem(child))}
            </List>
          </Collapse>
        </>
      ) : (
        <Link
          href={item.path ?? "#"}
          onClick={toggleDrawer(false)}
          target={item.path?.startsWith("http") ? "_blank" : "_self"}
          rel={
            item.path?.startsWith("http") ? "noopener noreferrer" : undefined
          }
        >
          <ListItemButton sx={{ borderRadius: "12px" }}>
            <ListItemIcon>
              {iconMap[item.icon] && React.createElement(iconMap[item.icon]!)}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            {item.path?.startsWith("http") && <OpenInNewIcon />}
          </ListItemButton>
        </Link>
      )}
    </div>
  );

  return (
    <NavBar className="flex w-full border-b border-gray-500 border-opacity-30 justify-center items-center">
      <Left className="flex items-center flex-1">
        <StyledButton
          style={{ borderRadius: "50vw" }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </StyledButton>
        <Image src="/assisto.jpg" alt="Assisto Logo" width={200} height={0} />
      </Left>
      {isMobile ? null : (
        <>
          <Center className=" flex-grow-0">
            <Typography
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              textAlign={"center"}
              variant="h4"
            >
              {currentPage.icon}
              {currentPage.title}
            </Typography>
          </Center>

          <Right className="flex items-center flex-1 justify-end">
            <Button
              style={{ aspectRatio: "1", borderRadius: "50vw", padding: "0" }}
              color="inherit"
              onClick={colorMode.toggleColorMode}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </Button>
            {companySwitch()}
            {languageSwitch()}
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={logOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </Right>
        </>
      )}

      <Drawer
        sx={{
          "& .MuiModal-backdrop": {
            backdropFilter: "blur(10px)",
          },
          "& .MuiDrawer-paper": {
            borderRadius: "1rem",
            backgroundColor: `${
              isDarkMode ? "rgba(17, 21, 30, 0.6)" : "rgba(255, 255, 255, 0.8)"
            }`,
            margin: "1rem",
            padding: "1rem",
            maxHeight: "calc(100% - 2rem)",
          },
        }}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <MenuItems className="justify-between">
          <List>{DrawerJSON.map((item: any) => renderListItem(item))}</List>
          <div>
            <Divider />
            {companySwitch("mobile")}
            {languageSwitch("mobile")}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ borderRadius: "12px" }}
                onClick={colorMode.toggleColorMode}
              >
                <ListItemIcon>
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </ListItemIcon>
                <ListItemText primary="Toggle Theme" />
              </ListItemButton>
            </ListItem>
          </div>
        </MenuItems>
      </Drawer>
    </NavBar>
  );
}

const NavBar = styled.nav`
  padding: 0.5rem 1rem;
`;

const StyledButton = styled(Button)`
  aspect-ratio: 1;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
  justify-content: flex-end;
`;

const Center = styled.div`
  flex: 0 0 auto;
  padding: 0 20px;
`;
