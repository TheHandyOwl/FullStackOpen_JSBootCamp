import Content from './Content';
import Header from './Header';

const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course;