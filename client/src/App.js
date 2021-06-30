import Customer from './Components/Customer';
import CustomerAdd from './Components/CustomerAdd';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
    root: {
        width: '100%',
        minWidth: 1080,
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        marginLeft: 18,
        marginRight: 18,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    grow: {
        flexGrow: 1,
    },
    tableHead: {
        fontSize: '1.0rem',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: '',
            completed: 0,
            searchKeyword: '',
        };
    }

    stateRefresh = () => {
        this.setState({
            customers: '',
            completed: 0,
            searchKeyword: '',
        });
        this.callApi()
            .then((res) => this.setState({ customers: res }))
            .catch((err) => console.log(err));
    };
    // //state: 변경될 수 없는 변수를 처리할 때 사용
    // state = {
    //     customers: '',
    //     completed: 0, //progressBar는 0~100까지 게이지를 지님.
    // };

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then((res) => this.setState({ customers: res }))
            .catch((err) => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/customers'); //테스트 목적으로 localhost 내 고객 정보를 가져와서
        const body = await response.json(); //json형태로 변환
        return body; //결과적으로 고객정보 json이 담긴 body를 반환
    };

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };

    render() {
        const filteredComponents = (data) => {
            data = data.filter((c) => {
                //사용자가 검색한 내용이 있다면 그 내용만 남겨둘 수 있도록.
                return c.name.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((c) => {
                return (
                    <Customer
                        stateRefresh={this.stateRefresh}
                        key={c.id}
                        id={c.id}
                        image={c.image}
                        name={c.name}
                        birthday={c.birthday}
                        gender={c.gender}
                        job={c.job}
                    />
                );
            });
        };
        const { classes } = this.props; //props : 변경될 수 있는 변수 처리시 사용
        const cellList = ['번호', '프로필 이미지', '이름', '생년월일', '성별', '직업', '설정'];
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            고객 관리 시스템
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="검색하기"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                name="searchKeyword"
                                value={this.state.searchKeyword}
                                onChange={this.handleValueChange}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.menu}>
                    <CustomerAdd stateRefresh={this.stateRefresh} />
                </div>
                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {/* cellList 각 요소로 TableCell을 만드는 map */}
                                {cellList.map((c) => {
                                    return <TableCell className={classes.tableHead}>{c}</TableCell>;
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.customers ? (
                                filteredComponents(this.state.customers)
                            ) : (
                                <TableRow>
                                    {/* 여섯개 열을 다 차지하고, 가운데에 위치한 프로그레스 바 */}
                                    <TableCell colSpan="6" align="center">
                                        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(App);
