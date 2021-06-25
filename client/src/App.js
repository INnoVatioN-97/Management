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

const customers = [
    {
        id: 1,
        image: 'https://placeimg.com/64/64/1',
        name: '고영일',
        birthDay: '970603',
        gender: '남자',
        job: '대학생',
    },
    {
        id: 2,
        image: 'https://placeimg.com/64/64/2',
        name: '고영이',
        birthDay: '970604',
        gender: '남자',
        job: '프로그래머',
    },
    {
        id: 3,
        image: 'https://placeimg.com/64/64/3',
        name: '고영삼',
        birthDay: '970605',
        gender: '남자',
        job: '프로글래머',
    },
];

class App extends React.Component {
    render() {
        const { classes } = this.props;
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
                        {customers.map((c) => {
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
                        })}
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
