export const NotificationSuccessful = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="successful">
            {message}
        </div>
    )
}
