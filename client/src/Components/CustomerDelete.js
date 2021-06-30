import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    //()=>형태의 바인딩 처리.
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClickClose = () => {
        //팝업 창이 화면에 보이지 않는 형태
        this.setState({
            open: false,
        });
    };

    deleteCustomer(id) {
        //ex) /api/customers/4 = id값이 4인 고객 삭제
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE',
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    삭제
                </Button>
                <Dialog open={this.state.open}>
                    <DialogTitle>삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                this.deleteCustomer(this.props.id);
                            }}
                        >
                            삭제
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomerDelete;
