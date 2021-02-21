import Courses from './Courses'

const App = ({courses}) => {
    return(
        <>
            <h1>Web Development curriculum</h1>
            <Courses courses={courses} />
        </>
    )
}

export default App;