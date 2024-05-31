import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../../context";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IMenuLateral {
  children: React.ReactNode;
}
interface IListItemLinkProps{
  to:string,
  icon:string,
  label:string,
  onClick: (()=>void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({to, icon , label, onClick}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({path:resolvedPath.pathname, end:false});

  const hadleClick= ()=>{
    navigate(to);
    onClick?.();
  }

  return (
    <ListItemButton 
      onClick = {hadleClick}
      selected = {!!match}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
        {/* <Home/> */}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm")); // Media query que retorna true em telas menores que 'sm'
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://receitinhas.com.br/wp-content/uploads/2016/12/batata-frita-perfeita-scaled.jpg"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
                {drawerOptions.map(drawerOption=>(
                  <ListItemLink
                  key = {drawerOption.path}
                  icon={drawerOption.icon}
                  to = {drawerOption.path}
                  label = {drawerOption.label}
                  onClick={smDown? toggleDrawerOpen : undefined}
                />
                ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};