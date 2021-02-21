import Course from './Course';

const Courses = ({ courses }) => courses.map( course => <Course key={course.id} course={course} />)

export default Courses;