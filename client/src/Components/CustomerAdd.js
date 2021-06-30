import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    hidden: { display: 'none' },
});

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        //file : 실제 보내지는 byte형태의 이미지
        //fileName: 보내고자 하는 이미지의 파일명
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false,
        };
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.addCustomer().then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        });
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false,
        });
    };

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0], //event.target : 이벤트가 발생한 input값 자체. 거기 안에 file(이미지)를 가져옴.
            fileName: event.target.value,
        });
    };

    handleValueChange = (event) => {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    };

    addCustomer = () => {
        const url = '/api/customers'; //이 주소로 데이터를 보낼 수 있도록 만든다.
        const formData = new FormData();
        formData.append('image', this.state.file); //state 내 file을 image라는 이름으로 전송
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        //이제 해당 url에 config 에 적힌 환경설정에 맞게 form-data를 실어 전송
        return post(url, formData, config);
    };

    //()=>형태의 바인딩 처리.
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClickClose = () => {
        //팝업 창이 화면에 보이지 않는 형태
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            //div 내 Dialog 안에다가 Table로 넣고 colspan써서 제출 가운데에 하나 빡 박기
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        {/* 기본적으로 입력값 안보이게.
                         기본적으로 이미지파일만 업로드 가능하게. */}
                        <input
                            className={classes.hidden}
                            accept="image/*"
                            id="raised-button-file"
                            type="file"
                            file={this.state.file}
                            value={this.state.fileName}
                            onChange={this.handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === '' ? '프로필 이미지 선택' : this.state.fileName}
                            </Button>
                        </label>
                        <br />
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                        <br />
                        <TextField
                            label="생년월일(ex: 970603)"
                            type="text"
                            name="birthday"
                            value={this.state.birthday}
                            onChange={this.handleValueChange}
                        />
                        <br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                        <br />
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> <br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
                            추가하기
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 :
                <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> <br />
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br />
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br />
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /> <br />
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> <br />
                <button type="submit">추가하기</button>
            </form>
            */
        );
    }
}
export default withStyles(styles)(CustomerAdd);
