import Customer from './Components/Customer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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
});

class App extends React.Component {
    //state: 변경될 수 없는 변수를 처리할 때 사용
    state = {
        customers: '',
    };

    componentDidMount() {
        this.callApi()
            .then((res) => this.setState({ customers: res }))
            .catch((err) => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/customers'); //테스트 목적으로 localhost 내 고객 정보를 가져와서
        const body = await response.json(); //json형태로 변환
        return body; //결과적으로 고객정보 json이 담긴 body를 반환
    };

    render() {
        const { classes } = this.props; //props : 변경될 수 있는 변수 처리시 사용
        return (
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.customers
                            ? this.state.customers.map((c) => {
                                  return (
                                      <Customer
                                          key={c.id}
                                          id={c.id}
                                          image={c.image}
                                          name={c.name}
                                          birthDay={c.birthDay}
                                          gender={c.gender}
                                          job={c.job}
                                      />
                                  );
                              })
                            : '불러오는 중...'}
                    </TableBody>
                </Table>
                {/* 아래의 불필요한 반복을 위의 map기능으로 구현.
            <Customer
                id={customers[0].id}
                image={customers[0].image}
                name={customers[0].name}
                birth={customers[0].birth}
                gender={customers[0].gender}
                job={customers[0].job}
            />
            <Customer
                id={customers[1].id}
                image={customers[1].image}
                name={customers[1].name}
                div
                birth={customers[1].birth}
                gender={customers[1].gender}
                job={customers[1].job}
            />
            <Customer
                id={customers[2].id}
                image={customers[2].image}
                name={customers[2].name}
                birth={customers[2].birth}
                gender={customers[2].gender}
                job={customers[2].job}
            /> */}
            </Paper>
        );
    }
}

export default withStyles(styles)(App);
