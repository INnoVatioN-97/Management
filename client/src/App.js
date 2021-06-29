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

const styles = (theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overfloxX: 'auto', //x축 오버플로우 발생 가능
    },
    table: {
        minWidth: 1080,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: '',
            completed: 0,
        };
    }

    stateRefresh = () => {
        this.setState({
            customers: '',
            completed: 0,
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

    render() {
        const { classes } = this.props; //props : 변경될 수 있는 변수 처리시 사용
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>이미지</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>생년월일</TableCell>
                                <TableCell>성별</TableCell>
                                <TableCell>직업</TableCell>
                                <TableCell>설정</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.customers ? (
                                this.state.customers.map((c) => {
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
                                })
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
                <CustomerAdd stateRefresh={this.stateRefresh} />
            </div>
        );
    }
}

export default withStyles(styles)(App);
