const  Message = (props) => {
    console.log(`props: ${props.message}`)
    return (
        <h1 style={{ color: props.color }}>{ props.message }</h1>
    )
}

export default Message;