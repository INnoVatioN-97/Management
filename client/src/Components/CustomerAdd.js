import React from 'react';
import { post } from 'axios';

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

    render() {
        return (
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
        );
    }
}
export default CustomerAdd;
