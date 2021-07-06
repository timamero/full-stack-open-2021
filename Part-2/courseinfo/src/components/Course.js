const Header = ({ name }) => {
    return <h2>{name}</h2>
}

const Part = ({ name, exercises}) => {
    return <li>{name} {exercises}</li>
}

const Content = ({ parts }) => {
    return (
        <div>
        <ul>
            {parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </ul>
        </div>
    )
}

const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce((sum, current) => sum + current, 0)

    return <p><strong>Number of exercises {sum}</strong></p>
}

const Course = ({ course }) => {
    return (
        <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

export default Course