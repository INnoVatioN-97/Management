import Customer from './Components/Customer';
import './App.css';

const customers = [
    {
        id: 1,
        image: 'https://placeimg.com/64/64/1',
        name: '고영일',
        birth: '970603',
        gender: '남자',
        job: '대학생',
    },
    {
        id: 2,
        image: 'https://placeimg.com/64/64/2',
        name: '고영이',
        birth: '970604',
        gender: '남자',
        job: '대학생',
    },
    {
        id: 3,
        image: 'https://placeimg.com/64/64/3',
        name: '고영삼',
        birth: '970605',
        gender: '남자',
        job: '대학생',
    },
];

function App() {
    return (
        <div>
            {customers.map((c) => {
                return <Customer key={c.id} id={c.id} image={c.image} name={c.name} birth={c.birth} gender={c.gender} job={c.job} />;
            })}
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
        </div>
    );
}

export default App;
