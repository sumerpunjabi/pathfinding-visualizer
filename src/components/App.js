import React from "react";
import Grid from "./Grid";
import NavBar from "./NavBar";
import Visited from "./Visited";
import ShortestPath from "./ShortestPath";
import AlgoInfo from "./AlgoInfo";
import "../assets/css/App.css";
import {
  createTheme,
  ThemeProvider,
  useTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { useTrail, animated } from "react-spring";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#0d1117", // very dark grey
      paper: "#161b22", // slightly lighter grey
    },
    divider: "#30363d", // dark grey
    action: {
      hover: "#58a6ff", // bright blue
      selected: "#1f6feb", // darker blue
      active: "#388bfd", // medium blue
    },
  },
  typography: {
    fontFamily: "'Lato', sans-serif",
  },
  overrides: {
    MuiListItem: {
      root: {
        fontSize: "1rem",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const App = () => {
  const gridRef = React.useRef();
  const classes = useStyles();
  const theme = useTheme();
  const xs = window.matchMedia("(max-width: 576px)").matches;
  const sm = window.matchMedia("(min-width: 576px)").matches;
  const md = window.matchMedia("(min-width: 768px)").matches;
  const lg = window.matchMedia("(min-width: 960px)").matches;
  const xl = window.matchMedia("(min-width: 1200px)").matches;

  const getRow = () => {
    if (xl) return 41;
    if (lg) return 37;
    if (md) return 39;
    if (sm) return 43;
    if (xs) return 43;
    return 60;
  };

  const getColumn = () => {
    if (xl) return 61;
    if (lg) return 45;
    if (md) return 51;
    if (sm) return 41;
    if (xs) return 31;
    return 100;
  };

  const trail = useTrail(4, {
    opacity: 1,
    width: "100%",
    marginRight: theme.spacing(2),
    transform: "translateY(0px) ",
    from: { opacity: 0, transform: "translateY(100px) " },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.toolbar} />
      <div className="app">
        <NavBar
          visualize={() => {
            gridRef.current.visualize();
          }}
          clearGrid={() => {
            gridRef.current.clearGrid();
          }}
          visualizeMaze={(animateMaze) => {
            gridRef.current.visualizeMaze();
          }}
        />
        <div className="content">
          <animated.div style={trail[0]}>
            <Grid ref={gridRef} rows={getRow()} columns={getColumn()} />
          </animated.div>
          <div className="data">
            <div className="dataContent">
              <animated.div style={trail[1]}>
                <Visited rows={getRow()} columns={getColumn()} />
              </animated.div>
              <animated.div style={trail[2]}>
                <ShortestPath rows={getRow()} columns={getColumn()} />
              </animated.div>
            </div>
            <animated.div style={trail[3]}>
              <AlgoInfo />
            </animated.div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
